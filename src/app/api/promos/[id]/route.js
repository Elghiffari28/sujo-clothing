import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;
  const promo = await prisma.promo.findUnique({ where: { id: Number(id) } });
  if (!promo) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(promo);
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const updated = await prisma.promo.update({
      where: { id: Number(id) },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.imageUrl && { imageUrl: body.imageUrl }),
        ...(typeof body.isActive === "boolean" && { isActive: body.isActive }),
      },
    });

    return Response.json(updated);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await prisma.promo.delete({ where: { id: Number(id) } });
  return Response.json({ success: true });
}
