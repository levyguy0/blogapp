import ValidUsername from "@/models/ValidUsername";
import getSession from "@/utils/getSession";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const user = await getSession();

  if (user) {
    const valid = await ValidUsername.safeParseAsync(body);
    if (valid["success"] == false) {
      return NextResponse.json(valid["error"], { status: 400 });
    }

    let checkUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });
    if (checkUsername) {
      return NextResponse.json({ error: "Username taken" }, { status: 409 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { username: body.username },
    });

    await prisma.blogPost.updateMany({
      where: { authorId: user.id },
      data: { authorName: body.username },
    });

    await prisma.comment.updateMany({
      where: { authorId: user.id },
      data: { authorName: body.username },
    });

    return NextResponse.json({ message: "User updated" }, { status: 200 });
  }

  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}
