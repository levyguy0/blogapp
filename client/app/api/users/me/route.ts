import { NextResponse } from "next/dist/server/web/spec-extension/response";
import getSession from "../../../../utils/getSession";
import { getFollowersInfo } from "@/utils/getFollowersInfo";

export async function GET() {
  const user = await getSession();

  if (user) {
    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          following: await getFollowersInfo(user.following),
          followers: await getFollowersInfo(user.followers),
        },
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}
