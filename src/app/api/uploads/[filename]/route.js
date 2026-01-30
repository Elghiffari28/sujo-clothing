import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // console.log(params);
  const { filename } = await context.params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  const ext = path.extname(filename).toLowerCase();
  const mime =
    ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".png"
      ? "image/png"
      : "application/octet-stream";

  return new NextResponse(file, {
    headers: { "Content-Type": mime },
  });
}
