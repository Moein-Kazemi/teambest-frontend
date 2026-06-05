import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export async function GET(request: NextRequest) {
//   return handler(request);
// }

// export async function POST(request: NextRequest) {
//   const response = await handler(request);

//   // 2. بررسی اینکه آیا لاگین موفق بوده است
//   // اگر لاگین موفق باشد، NextAuth کوکی session-token را ست می‌کند
//   const setCookieHeader = response.headers.get("set-cookie");

//   if (setCookieHeader && setCookieHeader.includes("next-auth.session-token")) {
//     const session = await getServerSession(authOptions);
//     const userRole = await session?.user?.role;

//     const newResponse = new NextResponse(response.body, {
//       status: response.status,
//       statusText: response.statusText,
//       headers: response.headers,
//     });

//     newResponse.cookies.set("auth-role", userRole, {
//       httpOnly: true,
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24, // 1 روز
//     });

//     return newResponse;
//   }
// }
