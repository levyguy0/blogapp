import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = parseInt(searchParams.get("page") || "1", 10);

  if (!id) {
    return NextResponse.json(
      { error: "Post ID is required." },
      { status: 400 }
    );
  }

  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
  }

  const commentsPerPage = 20;
  const totalComments = await prisma.comment.count({
    where: { blogPostId: id },
  });
  if (totalComments == 0) {
    return NextResponse.json({
      message: "No comments yet... comment something to get the chat started!",
      numberOfPages: 1,
    });
  }

  const numberOfPages = Math.ceil(totalComments / commentsPerPage);
  if (page > numberOfPages) {
    return NextResponse.json(
      { error: "The page does not exist" },
      { status: 400 }
    );
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: id },
  });

  const comments = await prisma.comment.findMany({
    where: { blogPostId: id },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * commentsPerPage,
    take: commentsPerPage,
  });

  return NextResponse.json(
    { post: post, comments: comments, numberOfPages: numberOfPages },
    { status: 200 }
  );
}
