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
  if (
    !token &&
    (pathname == "/" ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/login"))
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let value = token["value"];

  try {
    let secret = process.env.JWT_SECRET;
    const key = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(value, key, {
      algorithms: ["HS256"],
    });

    if (
      pathname == "/" ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/login")
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/home",
    "/post/:path*",
    "/settings",
    "/user/:path*",
    "/write",
  ],
};
