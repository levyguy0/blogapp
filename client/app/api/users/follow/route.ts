import getSession from "@/utils/getSession";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await getSession();
  const body = await req.json();
  const userToFollow = body["id"];

  const userToFollowExists = await prisma.user.findUnique({
    where: { id: userToFollow },
  });

  if (!userToFollowExists) {
    return NextResponse.json({ error: "User does not exist" }, { status: 404 });
  }

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
