import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// PUBLIC ROUTE
const publicRoutes = [
  "/login",
  "/signup",
  "/about",
  "/services",
  "/contact",
  "/",
];

// PROTECTED ROUTE
const protectedRoute = ["/dashboard", "/projects", "/tasks", "/chat", "/note"];
const userOnlyRoutes = ["/profile/complete"];
const managerOnlyRoutes = ["/projects/create", "/tasks/create", "/manager"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // IF IS PUBLIC ROUTE PASS HIM
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("next-auth.session-token");
  const userRole = request.cookies.get("auth-role")?.value;

  // CHECKPROTECTEDROUTE
  if (protectedRoute.some((route) => pathname.startsWith(route))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // IF IS MANAGER ROUTE ONLY ALLOW MANAGER ROLE
  if (managerOnlyRoutes.some((route) => pathname.startsWith(route))) {
    // CHECK THE SISSION TOKEN IF NOT EXIST GO TO DASHBOARD
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!userRole || userRole !== "manager") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  // IF IS USER ROUTE ONLY ALLOW USER ROLE
  if (userOnlyRoutes.some((route) => pathname.startsWith(route))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!userRole || userRole !== "user") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}
