import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  let body = await req.json();

  let user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: `Invalid email or password.` },
      { status: 400 }
    );
  }

  // const validPassword = await bcrypt.compare(body.password, user.password);

  if (body.password != user.password) {
    return NextResponse.json(
      { error: `Invalid email or password.` },
      { status: 400 }
    );
  }

  // const token = jwt.sign(user.id, process.env.JWT_SECRET);
  let secret = process.env.JWT_SECRET;
  const key = new TextEncoder().encode(secret);

  const token = await new SignJWT({ sub: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(key);

  cookies().set("auth", token, { maxAge: 60 * 60 * 24 * 7, secure: true });

  return NextResponse.json({ message: "Logged in" }, { status: 200 });
}
