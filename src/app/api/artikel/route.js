import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { Artikel, initDB } from "@/lib/db";

// GET semua artikel
export async function GET() {
  try {
    // await initDB();
    const artikels = await Artikel.findAll({
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json(artikels, { status: 200 });
  } catch (err) {
    console.error("GET artikel error:", err);
    return NextResponse.json({ error: "Gagal ambil artikel" }, { status: 500 });
  }
}

// POST artikel baru
export async function POST(req) {
  try {
    // await initDB();
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const file = formData.get("image");

    let imageUrl = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const originalName = file.name || "file.jpg";
      // const ext = path.extname(originalName); // contoh: ".png"
      // const baseName = path.basename(originalName, ext);
      const sanitizedName = originalName
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9.\-_]/g, "");
      const filename = Date.now() + "-" + sanitizedName;
      // console.log("Sanitized filename:", filename);
      const filePath = path.join(process.cwd(), "uploads", filename);

      // console.log("Original filename:", file.name || file.originalFilename);

      await writeFile(filePath, buffer);
      imageUrl = "/uploads/" + filename;
    }

    const artikel = await Artikel.create({
      title,
      content,
      imageUrl,
    });

    return NextResponse.json(artikel, { status: 201 });
  } catch (err) {
    console.error("POST artikel error:", err);
    return NextResponse.json(
      { error: "Gagal simpan artikel" },
      { status: 500 }
    );
  }
}
