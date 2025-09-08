import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToSupabase } from "@/lib/upload";

export async function GET() {
  const testimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(testimoni);
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.keterangan || !body.imageUrl) {
      return NextResponse.json(
        { error: "keterangan dan imageUrl wajib diisi" },
        { status: 400 }
      );
    }

    const testimoni = await prisma.testimoni.create({
      data: {
        keterangan: body.keterangan,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(testimoni);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
