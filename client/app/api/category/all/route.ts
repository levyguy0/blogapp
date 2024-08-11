import { CategoryName } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = Object.values(CategoryName);

  return NextResponse.json({ categories: categories });
}
