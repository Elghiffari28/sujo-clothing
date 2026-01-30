import { NextResponse } from "next/server";
import { Testimoni, initDB } from "@/lib/db";

// GET /api/testimoni
export async function GET() {
  try {
    // await initDB();
    const testimoni = await Testimoni.findAll({
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json(testimoni);
  } catch (err) {
    console.error("Error GET testimoni:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/testimoni
export async function POST(req) {
  try {
    // await initDB();
    const body = await req.json();

    if (!body.keterangan || !body.imageUrl) {
      return NextResponse.json(
        { error: "keterangan dan imageUrl wajib diisi" },
        { status: 400 }
      );
    }

    const testimoni = await Testimoni.create({
      keterangan: body.keterangan,
      imageUrl: body.imageUrl,
    });

    return NextResponse.json(testimoni);
  } catch (err) {
    console.error("Error POST testimoni:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
