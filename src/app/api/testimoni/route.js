import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToSupabase } from "@/lib/upload";

export async function GET() {
  const testimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(testimoni);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const keterangan = formData.get("keterangan");
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // upload ke Supabase
    const imageUrl = await uploadToSupabase(file, "testimoni");

    // simpan URL ke database
    const testimoni = await prisma.testimoni.create({
      data: { keterangan, imageUrl },
    });

    return NextResponse.json(testimoni);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
