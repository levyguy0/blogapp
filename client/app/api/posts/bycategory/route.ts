import { NextRequest, NextResponse } from "next/server";
import { CategoryName, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let category = searchParams.get("category") as CategoryName;

  if (!category) {
    return NextResponse.json(
      { error: "Category is required." },
      { status: 400 }
    );
  }

  const validCategories = Object.values(CategoryName);

  if (!validCategories.includes(category)) {
    return NextResponse.json(
      { error: "Not a valid category" },
      { status: 400 }
    );
  }

  const posts = await prisma.blogPost.findMany({
    where: {
      category: category,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
    },
  });

  return NextResponse.json({ posts: posts }, { status: 200 });
}
