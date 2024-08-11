import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { message: "Username is required." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      posts: true,
    },
  });

  if (user) {
    if (user.posts && user.posts.length > 0) {
      const userPosts = user.posts.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        category: post.category,
        createdAt: post.createdAt,
        authorName: post.authorName,
      }));

      return NextResponse.json(
        {
          user: {
            id: user.id,
            username: user.username,
            posts: userPosts,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "User has not posted." });
    }
  } else {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
}
