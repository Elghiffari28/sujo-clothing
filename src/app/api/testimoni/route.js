import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const testimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(testimoni);
}

export async function POST(req) {
  const { keterangan, imageUrl } = await req.json();
  const testimoni = await prisma.testimoni.create({
    data: {
      keterangan,
      imageUrl,
    },
  });
  return NextResponse.json(testimoni);
}
