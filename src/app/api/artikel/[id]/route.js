import { NextResponse } from "next/server";
import { Artikel, initDB } from "@/lib/db";
import path from "path";
import { unlink } from "fs/promises";

// GET /api/artikel/[id]
export async function GET(req, context) {
  try {
    // await initDB();
    const { id } = await context.params;

    const artikel = await Artikel.findByPk(id); // by primary key
    if (!artikel) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(artikel, { status: 200 });
  } catch (err) {
    console.error("Error get artikel:", err);
    return NextResponse.json({ error: "Gagal ambil artikel" }, { status: 500 });
  }
}

// PUT /api/artikel/[id]
export async function PUT(req, context) {
  try {
    // await initDB();
    const { id } = await context.params;
    const body = await req.json();
    const { title, imageUrl, content } = body;

    const artikel = await Artikel.findByPk(id);
    if (!artikel) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    await artikel.update({ title, imageUrl, content });

    return NextResponse.json(artikel);
  } catch (error) {
    console.error("Update artikel error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/artikel/[id]
export async function DELETE(req, context) {
  try {
    // await initDB();
    // const { params } = await context;
    const { id } = await context.params;

    const artikel = await Artikel.findByPk(id);
    if (!artikel) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    if (artikel.imageUrl) {
      const fileName = artikel.imageUrl.split("/").pop();
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);
      try {
        await unlink(filePath);
      } catch {
        console.warn("File tidak ditemukan:", filePath);
      }
    }

    await artikel.destroy();
    return NextResponse.json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error("Delete artikel error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
