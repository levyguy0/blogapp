import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().set("auth", "", { expires: new Date(0) });
  return NextResponse.json({ message: "Logged out" });
}
