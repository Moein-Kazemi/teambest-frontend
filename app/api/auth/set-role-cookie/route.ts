import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.role) {
    return NextResponse.json({
      success: false,
      error: "سشن مورد نظر یا نقش کاربر یافت نشد.",
    });
  }

  const response = NextResponse.json({
    success: true,
    message: "کوکی نقش کاربر ذخیره شد",
  });

  response.cookies.set("auth-role", String(session.user.role), {
    httpOnly: false, // because mabe we need in the client and security of this cookie doesn't matter
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
