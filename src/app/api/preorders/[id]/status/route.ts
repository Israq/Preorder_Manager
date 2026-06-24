import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const preorder = await prisma.preorder.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ preorder });
  } catch (error) {
    console.error("PATCH /api/preorders/status error:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 },
    );
  }
}
