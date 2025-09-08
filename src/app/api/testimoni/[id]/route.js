import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;
  const testimoni = await prisma.testimoni.findUnique({
    where: { id: Number(id) },
  });
  if (!testimoni) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(testimoni);
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    let keterangan = "";
    let file = null;

    // cek content-type request
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      keterangan = formData.get("keterangan");
      file = formData.get("file");
    } else {
      const body = await req.json();
      keterangan = body.keterangan;
    }

    // ambil testimoni lama
    const existing = await prisma.testimoni.findUnique({
      where: { id: Number(id) },
    });

    let imageUrl = existing.imageUrl;

    // kalau ada file baru → hapus lama + upload baru
    if (file) {
      if (existing.imageUrl) {
        const oldFile = existing.imageUrl.split("/").pop();
        await supabase.storage.from("testimoni").remove([oldFile]);
      }

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { data, error } = await supabase.storage
        .from("testimoni")
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from("testimoni")
        .getPublicUrl(fileName);

      imageUrl = publicUrl.publicUrl;
    }

    // update DB
    const updated = await prisma.testimoni.update({
      where: { id: Number(id) },
      data: {
        ...(keterangan && { keterangan }),
        imageUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // ⬅️ harus pakai await sekarang

    // ambil testimoni lama dulu biar bisa hapus file
    const existing = await prisma.testimoni.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    // kalau ada gambar → hapus dari Supabase Storage
    if (existing.imageUrl) {
      const oldFile = existing.imageUrl.split("/").pop();
      await supabase.storage.from("testimoni").remove([oldFile]);
    }

    // hapus dari DB
    await prisma.testimoni.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
