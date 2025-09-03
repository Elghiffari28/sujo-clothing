import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;
  const testimoni = await prisma.testimoni.findUnique({
    where: { id: Number(id) },
  });
  if (!testimoni) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(testimoni);
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    if (isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();

    if (!body.keterangan && !body.imageUrl) {
      return NextResponse.json(
        { error: "Tidak ada data untuk update" },
        { status: 400 }
      );
    }

    const updated = await prisma.testimoni.update({
      where: { id: Number(id) },
      data: {
        ...(body.keterangan && { keterangan: body.keterangan }),
        ...(body.imageUrl && { imageUrl: body.imageUrl }),
      },
    });

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await prisma.testimoni.delete({ where: { id: Number(id) } });
  return Response.json({ success: true });
}
