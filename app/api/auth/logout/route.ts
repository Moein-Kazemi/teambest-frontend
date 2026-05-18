import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const isProduction = process.env.NODE_ENV === "production";

  cookies().set("auth_token", "", {
    httpOnly: true,
    secure: isProduction, // false in the development
    expires: new Date(0),
    path: "/",
    sameSite: isProduction ? "none" : "lax",
  });

  return NextResponse.json({ success: true });
}
