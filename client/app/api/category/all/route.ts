import getSession from "@/utils/getSession";
import { CategoryName } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getSession();
  const categories = Object.values(CategoryName);

  if (user) {
    return NextResponse.json({ categories: categories });
  }
  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}
