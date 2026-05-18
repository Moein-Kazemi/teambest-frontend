import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// THE ROUTES NEED TO LOGIN FIRST
const authRoutes = [
  "/dashboard",
  "/chat",
  "/notes",
  "/projects",
  "/tasks",
  "/teams",
];

//  THE ROUTES ONLY MANAGER CAN GO INTO THAT
// const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. بررسی مسیرهای عمومی (مثل لاگین و ثبت‌نام)
  if (pathname === "/login" || pathname === "/signup") {
    // IF THE USER LOGED IN
    const token = request.cookies.get("auth_token")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 2. CHECK THE PROTECTED ROUTES
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      //   IF THE TOKEN NOT EXIST GO TO LOGIN PAGE
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // (اختیاری اما پیشنهادی) اعتبارسنجی توکن در اینجا
    // می‌توانید توکن را با jwt.verify بررسی کنید تا مطمئن شوید منقضی نشده است
    // اگر توکن نامعتبر بود:
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // MANAGER ROUTES
  //   if (adminRoutes.some((route) => pathname.startsWith(route))) {
  //     const token = request.cookies.get("auth_token")?.value;

  //     if (!token) {
  //       return NextResponse.redirect(new URL("/login", request.url));
  //     }

  //     // در اینجا باید پیکسل توکن را دیکدیت کنید تا نقش کاربر را بفهمید
  //     // چون کوکی HttpOnly است، نمی‌توانید در جاوااسکریپت مستقیم دیکدیت کنید.
  //     // بهترین راه: ارسال یک درخواست به یک API داخلی Next.js که توکن را چک می‌کند
  //     // یا استفاده از یک کتابخانه مثل jose در سمت سرور برای دیکدیت کوکی.

  //     // روش ساده‌تر: استفاده از یک API داخلی برای چک کردن نقش
  //     const checkAdminRes = await fetch(`${request.url}/api/auth/check-admin`, {
  //       headers: { Cookie: request.headers.get("cookie") || "" },
  //     });

  //     if (!checkAdminRes.ok) {
  //       // دسترسی غیرمجاز
  //       return new NextResponse("Unauthorized", { status: 401 });
  //     }
  //   }

  return NextResponse.next();
}

// middlaware run before matcher route
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
