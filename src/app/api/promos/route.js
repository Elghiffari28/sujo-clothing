import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const promos = await prisma.promo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(promos);
}

export async function POST(req) {
  const { title, description, imageUrl } = await req.json();
  const promo = await prisma.promo.create({
    data: {
      title,
      description,
      imageUrl,
      isActive: true, // default aktif
    },
  });
  return NextResponse.json(promo);
}
