import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  const body = await req.json();

  let user = await prisma.user.findUnique({
    where: { username: body.username },
  });
  if (user) {
    return NextResponse.json({ error: "Username taken" }, { status: 409 });
  }

  user = await prisma.user.update({
    where: { id: body.id },
    data: { username: body.username },
  });

  return NextResponse.json({ message: "User updated" }, { status: 200 });
}
