import { NextRequest, NextResponse } from "next/server";
import { CategoryName, PrismaClient } from "@prisma/client";
import { ValidPost } from "@/models/BlogPost";
import getSession from "@/utils/getSession";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({ posts: posts });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const valid = await ValidPost.safeParseAsync(body);

  if (valid["success"] == false) {
    return NextResponse.json(valid["error"], { status: 400 });
  }

  const user = await getSession();
  if (user) {
    const validCategories = Object.values(CategoryName);

    if (!validCategories.includes(body.category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    let post = {
      authorId: user.id,
      authorName: user.username,
      title: body.title,
      description: body.description,
      content: body.content,
      category: body.category,
    };

    try {
      post = await prisma.blogPost.create({ data: post });
      return NextResponse.json({ post: post });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json("Not logged in", { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getSession();
  const body = await req.json();

  if (user) {
    const post = await prisma.blogPost.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: `No post with id ${body.id}` },
        { status: 400 }
      );
    }

    if (post.authorId != user.id) {
      return NextResponse.json(
        { error: "Cannot delete a post you did not upload." },
        { status: 401 }
      );
    }

    await prisma.blogPost.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({ post: post });
  } else {
    return NextResponse.json("Not logged in", { status: 401 });
  }
}
