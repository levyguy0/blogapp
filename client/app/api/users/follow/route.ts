import getSession from "@/utils/getSession";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await getSession();
  const body = await req.json();
  const userToFollow = body["id"];

  if (user) {
    if (!userToFollow) {
      return NextResponse.json(
        { error: "Must provide a user to follow" },
        { status: 400 }
      );
    }

    const userToFollowExists = await prisma.user.findUnique({
      where: { id: userToFollow },
    });

    if (!userToFollowExists) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    if (userToFollow == user?.id)
      return NextResponse.json(
        { error: "Cannot follow yourself" },
        { status: 403 }
      );

    if (user?.following.includes(userToFollow)) {
      return NextResponse.json(
        { error: "Already following user" },
        { status: 403 }
      );
    }

    await prisma.user.update({
      where: { id: userToFollow },
      data: {
        followers: { push: user?.id },
      },
    });

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        following: { push: userToFollow },
      },
    });

    return NextResponse.json({ message: "Followed user" });
  }

  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}

export async function DELETE(req: NextRequest) {
  const user = await getSession();
  const body = await req.json();
  const userToUnfollow = body["id"];

  if (user) {
    if (!userToUnfollow) {
      return NextResponse.json(
        { error: "Must provide a user to unfollow" },
        { status: 400 }
      );
    }

    const userToUnfollowExists = await prisma.user.findUnique({
      where: { id: userToUnfollow },
    });

    if (!userToUnfollowExists) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    if (userToUnfollow == user?.id)
      return NextResponse.json(
        { error: "Cannot unfollow yourself" },
        { status: 403 }
      );

    if (!user?.following.includes(userToUnfollow)) {
      return NextResponse.json(
        { error: "User is not currently followed" },
        { status: 403 }
      );
    }

    await prisma.user.update({
      where: { id: userToUnfollow },
      data: {
        followers: {
          set: userToUnfollowExists.followers.filter(
            (followerId) => followerId !== user?.id
          ),
        },
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        following: {
          set: user.following.filter(
            (followingId) => followingId !== userToUnfollow
          ),
        },
      },
    });

    return NextResponse.json({ message: "Unfollowed user" });
  }
  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}
