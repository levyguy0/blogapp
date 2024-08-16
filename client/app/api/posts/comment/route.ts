import getSession from "@/utils/getSession";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await getSession();
  const body = await req.json();

  if (user) {
    let newComment = {
      authorId: user.id,
      authorName: user.username,
      content: body.content,
      blogPostId: body.blogID,
    };

    const post = await prisma.blogPost.findUnique({
      where: { id: body.blogID },
      include: { comments: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "No post found with this ID" },
        { status: 400 }
      );
    }

    newComment = await prisma.comment.create({ data: newComment });

    return NextResponse.json({ success: "Added comment", comment: newComment });
  } else {
    return NextResponse.json("Not logged in", { status: 401 });
  }
}
