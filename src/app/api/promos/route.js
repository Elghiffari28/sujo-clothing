import { NextResponse } from "next/server";
import { Promo, initDB } from "@/lib/db";

// GET /api/promos
export async function GET() {
  try {
    // await initDB();
    const promos = await Promo.findAll({
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json(promos);
  } catch (err) {
    console.error("Error ambil promos:", err);
    return NextResponse.json({ error: "Gagal ambil promos" }, { status: 500 });
  }
}

// POST /api/promos
export async function POST(req) {
  try {
    // await initDB();
    const { title, description, imageUrl } = await req.json();
    console.log(imageUrl);
    const promo = await Promo.create({
      title,
      description,
      imageUrl,
      isActive: true,
    });

    return NextResponse.json(promo, { status: 201 });
  } catch (err) {
    console.error("Error buat promo:", err);
    return NextResponse.json({ error: "Gagal buat promo" }, { status: 500 });
  }
}
