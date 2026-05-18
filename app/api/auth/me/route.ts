import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ITokenPayload } from "@/interfaces/tokenInterfaces";
const jwt = require("jsonwebtoken");

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    // دیکدیت توکن برای به دست آوردن اطلاعات کاربر
    const decoded: ITokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ user: decoded });
  } catch (err) {
    console.log(err);
    // اگر توکن منقضی شده یا نامعتبر بود
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
