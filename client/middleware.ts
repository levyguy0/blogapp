import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/users/signup") ||
    pathname.startsWith("/api/users/login")
  ) {
    return NextResponse.next();
  }

  let token = cookies().get("auth");
  if (!token) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  let value = token["value"];

  try {
    let secret = process.env.JWT_SECRET;
    const key = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(value, key, {
      algorithms: ["HS256"],
    });

    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JWT" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:function*",
};
