import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getFollowersInfo } from "@/utils/getFollowersInfo";
import getSession from "@/utils/getSession";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const user = await getSession();

  if (user) {
    if (!username) {
      return NextResponse.json(
        { message: "Username is required." },
        { status: 400 }
      );
    }

    const userToView = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    const posts = await prisma.blogPost.findMany({
      where: { authorId: userToView?.id },
      orderBy: { createdAt: "desc" },
    });

    if (userToView) {
      if (posts && posts.length > 0) {
        return NextResponse.json(
          {
            user: {
              id: userToView.id,
              username: userToView.username,
              posts: posts,
              followers: await getFollowersInfo(userToView.followers),
              following: await getFollowersInfo(userToView.following),
            },
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json({
          user: {
            id: userToView.id,
            username: userToView.username,
            message: "No posts yet",
            followers: await getFollowersInfo(userToView.followers),
            following: await getFollowersInfo(userToView.following),
          },
        });
      }
    } else {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
  }
  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}
