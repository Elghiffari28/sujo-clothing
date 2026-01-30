import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // convert file ke buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // bikin nama unik
    const originalName = file.name || "file.jpg";
    // const ext = path.extname(originalName); // contoh: ".png"
    // const baseName = path.basename(originalName, ext);
    const sanitizedFileName = originalName
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.\-_]/g, "");
    const fileName = `${Date.now()}-${sanitizedFileName}`;
    const filePath = path.join(process.cwd(), "uploads", fileName);

    // simpan ke folder /public/uploads
    await writeFile(filePath, buffer);

    // URL akses publik
    const url = `/uploads/${fileName}`;

    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${filePath}`);
    } else {
      console.log(`File not found: ${filePath}`);
    }
  } catch (err) {
    console.error("Error deleting file:", err);
  }
};
