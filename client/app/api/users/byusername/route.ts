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

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      posts: true,
    },
  });

  if (user) {
    if (user.posts && user.posts.length > 0) {
      return NextResponse.json(
        {
          user: {
            id: user.id,
            username: user.username,
            posts: user.posts,
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
