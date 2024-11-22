import SignupUser from "../../../../models/SignupUser";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const disabled = false;
  if (!disabled) {
    const body = await req.json();

    const valid = await SignupUser.safeParseAsync(body);
    if (valid["success"] == false) {
      return NextResponse.json(valid["error"], { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "Email already Registered", path: "email" },
        { status: 409 }
      );
    }

    user = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "Username is taken.", path: "username" },
        { status: 409 }
      );
    }

    let new_user = {
      username: body.username,
      name: body.name,
      email: body.email,
      password: body.password,
    };

    const salt = await bcrypt.genSalt(10);
    new_user.password = await bcrypt.hash(new_user.password, salt);

    try {
      new_user = await prisma.user.create({
        data: new_user,
      });
      return NextResponse.json(
        {
          user: {
            email: new_user.email,
            name: new_user.name,
            username: new_user.username,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Error creating user" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({
      message: "Website is in demo mode - please try again later.",
    });
  }
}
