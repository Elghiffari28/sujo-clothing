import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { Testimoni, initDB } from "@/lib/db";

// GET /api/testimoni/[id]
export async function GET(req, context) {
  try {
    // await initDB();
    const { id } = await context.params;
    const testimoni = await Testimoni.findByPk(Number(id));

    if (!testimoni) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(testimoni);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/testimoni/[id]
export async function PUT(req, context) {
  try {
    // await initDB();
    const { params } = await context;
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    let keterangan = "";
    let file = null;

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      keterangan = formData.get("keterangan");
      file = formData.get("file");
    } else {
      const body = await req.json();
      keterangan = body.keterangan;
    }

    const existing = await Testimoni.findByPk(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    let imageUrl = existing.imageUrl;

    if (file) {
      // hapus file lama
      if (existing.imageUrl) {
        const oldFile = existing.imageUrl.split("/").pop();
        const oldPath = path.join(process.cwd(), "public", "uploads", oldFile);
        try {
          await unlink(oldPath);
        } catch {
          console.warn("File lama tidak ditemukan:", oldPath);
        }
      }

      // simpan file baru
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);

      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    await existing.update({
      ...(keterangan && { keterangan }),
      imageUrl,
    });

    return NextResponse.json(existing);
  } catch (err) {
    console.error("PUT testimoni error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/testimoni/[id]
export async function DELETE(req, context) {
  try {
    // await initDB();
    const { params } = await context;
    const id = parseInt(params.id, 10);
    const existing = await Testimoni.findByPk(id);

    if (!existing) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    if (existing.imageUrl) {
      const fileName = existing.imageUrl.split("/").pop();
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);
      try {
        await unlink(filePath);
      } catch {
        console.warn("File tidak ditemukan:", filePath);
      }
    }

    await existing.destroy();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
