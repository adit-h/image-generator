import { NextRequest, NextResponse } from "next/server";
import { getGenerations } from "@/server/repository/generation";

const LIMIT_DATA = 12;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const cursor = searchParams.get("cursor") ?? "";
    const limit = Number(searchParams.get("limit") ?? LIMIT_DATA);

    const { items, nextCursor } = await getGenerations({ cursor, limit });

    return NextResponse.json({ items, nextCursor });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch generations" },
      { status: 500 },
    );
  }
}
