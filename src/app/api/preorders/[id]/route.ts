import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, products, preorderWhen, startsAt, endsAt, status } = body;

    const preorder = await prisma.preorder.update({
      where: { id },
      data: {
        name,
        products,
        preorderWhen,
        startsAt: new Date(startsAt),
        endsAt: endsAt ? new Date(endsAt) : null,
        status,
      },
    });

    return NextResponse.json({ preorder });
  } catch (error) {
    console.error("PUT /api/preorders error:", error);
    return NextResponse.json(
      { error: "Failed to update preorder" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.preorder.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/preorders error:", error);
    return NextResponse.json(
      { error: "Failed to delete preorder" },
      { status: 500 },
    );
  }
}
