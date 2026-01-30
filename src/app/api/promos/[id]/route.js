import { NextResponse } from "next/server";
import { Promo, initDB } from "@/lib/db";
import path from "path";
import { unlink } from "fs/promises";

// GET /api/promos/[id]
export async function GET(req, context) {
  try {
    // await initDB();
    const { id } = await context.params;
    const promo = await Promo.findByPk(id);

    if (!promo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(promo);
  } catch (err) {
    console.error("Error GET promo:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/promos/[id]
export async function PUT(req, context) {
  try {
    // await initDB();
    const { params } = await context;
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const promo = await Promo.findByPk(id);

    if (!promo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await promo.update({
      ...(body.title && { title: body.title }),
      ...(body.description && { description: body.description }),
      ...(body.imageUrl && { imageUrl: body.imageUrl }),
      ...(typeof body.isActive === "boolean" && { isActive: body.isActive }),
    });

    return NextResponse.json(promo);
  } catch (err) {
    console.error("Error PUT promo:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/promos/[id]
export async function DELETE(req, context) {
  try {
    // await initDB();
    const { params } = await context;
    const { id } = params;
    const promo = await Promo.findByPk(id);
    console.log(id);

    if (!promo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (promo.imageUrl) {
      const fileName = promo.imageUrl.split("/").pop();
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);
      try {
        await unlink(filePath);
      } catch {
        console.warn("File tidak ditemukan:", filePath);
      }
    }

    await promo.destroy();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error DELETE promo:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
