import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function getSession() {
  let token = cookies().get("auth");
  if (!token) {
    return;
  }

  let value = token["value"];

  try {
    let secret = process.env.JWT_SECRET;
    const key = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(value, key, {
      algorithms: ["HS256"],
    });

    const user = await prisma.user.findUnique({
      where: { id: payload["sub"] },
      include: { posts: true },
    });
    return user;
  } catch {
    cookies().set("auth", "", { expires: new Date(0) });
    return;
  }
}

export default getSession;
