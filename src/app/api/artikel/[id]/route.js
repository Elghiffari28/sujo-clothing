import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

// GET /api/articles/[id]
export async function GET(req, context) {
  try {
    // params sekarang Promise → harus await
    const { id } = await context.params;

    const article = await prisma.artikel.findUnique({
      where: { id: Number(id) },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (err) {
    console.error("Error get artikel:", err);
    return NextResponse.json({ error: "Gagal ambil artikel" }, { status: 500 });
  }
}

// PUT /api/articles/[id]
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, imageUrl, content } = body;

    const artikel = await prisma.artikel.update({
      where: { id: Number(id) },
      data: { title, imageUrl, content },
    });

    return NextResponse.json(artikel);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/articles/[id]
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.artikel.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Article deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
