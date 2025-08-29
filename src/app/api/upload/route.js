import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // bikin buffer dari file upload
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // simpan di folder public/uploads
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, filename);

  fs.writeFileSync(filePath, buffer);

  // url public (akses via /uploads/filename)
  const url = `/uploads/${filename}`;

  return NextResponse.json({ url });
}
