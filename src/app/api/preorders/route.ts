import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // --- Filter ---
    const filter = searchParams.get("filter") || "all"; // all | active | inactive
    const where: Prisma.PreorderWhereInput = {};
    if (filter === "active") where.status = true;
    if (filter === "inactive") where.status = false;

    // --- Sort ---
    const sortBy = searchParams.get("sortBy") || "createdAt"; // name | createdAt | startsAt | endsAt
    const sortOrder = searchParams.get("sortOrder") || "desc"; // asc | desc
    const orderBy: Prisma.PreorderOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // --- Pagination ---
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const skip = (page - 1) * pageSize;

    // --- Query ---
    const [preorders, total] = await Promise.all([
      prisma.preorder.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.preorder.count({ where }),
    ]);

    return NextResponse.json({
      preorders,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        showingFrom: total > 0 ? skip + 1 : 0,
        showingTo: Math.min(skip + pageSize, total),
      },
    });
  } catch (error) {
    console.error("GET /api/preorders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch preorders" },
      { status: 500 },
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, products, preorderWhen, startsAt, endsAt, status } = body;

    // Validate required fields
    if (!name || !startsAt) {
      return NextResponse.json(
        { error: "Name and Starts At are required" },
        { status: 400 },
      );
    }

    const preorder = await prisma.preorder.create({
      data: {
        name,
        products: products || 1,
        preorderWhen: preorderWhen || "regardless-of-stock",
        startsAt: new Date(startsAt),
        endsAt: endsAt ? new Date(endsAt) : null,
        status: status !== undefined ? status : true,
      },
    });

    return NextResponse.json({ preorder }, { status: 201 });
  } catch (error) {
    console.error("POST /api/preorders error:", error);
    return NextResponse.json(
      { error: "Failed to create preorder" },
      { status: 500 },
    );
  }
}
