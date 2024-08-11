import { NextResponse } from "next/dist/server/web/spec-extension/response";
import getSession from "../../../../utils/getSession";

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
          posts: user.posts,
        },
      },
      { status: 200 }
    );
  }

  return NextResponse.json("Not logged in", { status: 401 });
}
