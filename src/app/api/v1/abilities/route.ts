import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageNumber = Number(searchParams.get("page")) || 1;

  const abilities = await prisma.ability.findMany({
    skip: (pageNumber - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  return NextResponse.json(abilities);
}
