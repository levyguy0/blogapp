import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();

async function getSession() {
  let token = cookies().get("auth");
  if (token) {
    let value = token["value"];
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
  }
}

export default getSession;
