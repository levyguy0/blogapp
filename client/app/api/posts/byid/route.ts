import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Post ID is required." },
      { status: 400 }
    );
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: id },
  });

  const comments = await prisma.comment.findMany({
    where: { blogPostId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ post: post, comments: comments }, { status: 200 });
}
