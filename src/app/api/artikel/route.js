import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const artikels = await prisma.artikel.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(artikels, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Gagal ambil artikel" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const file = formData.get("image");

    let imageUrl = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = Date.now() + "-" + file.name;
      const filePath = path.join(process.cwd(), "public", "uploads", filename);

      await writeFile(filePath, buffer);
      imageUrl = "/uploads/" + filename; // biar bisa diakses via /uploads
    }

    const artikel = await prisma.artikel.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(artikel, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Gagal simpan artikel" },
      { status: 500 }
    );
  }
}
