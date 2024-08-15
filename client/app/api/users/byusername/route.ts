import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getFollowersInfo } from "@/utils/getFollowersInfo";

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
            followers: await getFollowersInfo(user.followers),
            following: await getFollowersInfo(user.following),
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({
        user: {
          id: user.id,
          username: user.username,
          message: "No posts yet",
          followers: await getFollowersInfo(user.followers),
          following: await getFollowersInfo(user.following),
        },
      });
    }
  } else {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
}
