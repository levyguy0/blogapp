import { NextRequest, NextResponse } from "next/server";
import { CategoryName, PrismaClient } from "@prisma/client";
import getSession from "@/utils/getSession";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let category = searchParams.get("category") as CategoryName;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const user = await getSession();

  if (user) {
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

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

    const postsPerPage = 30;

    const totalPosts = await prisma.blogPost.count({
      where: { category: category },
    });
    if (totalPosts == 0) {
      return NextResponse.json({
        message: "No posts under this category yet.",
        numberOfPages: 1,
      });
    }

    const numberOfPages = Math.ceil(totalPosts / postsPerPage);

    if (page > numberOfPages) {
      return NextResponse.json(
        { error: "The page does not exist" },
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
      skip: (page - 1) * postsPerPage,
      take: postsPerPage,
    });

    return NextResponse.json({ posts, numberOfPages }, { status: 200 });
  }
  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}
