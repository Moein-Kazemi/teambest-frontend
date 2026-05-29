import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; // برای ارسال درخواست به بک‌اند
import { NextAuthOptions } from "next-auth";
import { ITokenPayload } from "@/interfaces/tokenInterfaces";
import api from "./api";

// TYPE CHEKER

interface BackendResponse {
  status: string;
  data: {
    user: ITokenPayload;
  };
  token: string;
}

declare module "next-auth" {
  /**
   * کاربری که از authorize بازگردانده می‌شود
   */
  interface User {
    id?: string;
    name?: string | null;
    family?: string;
    role?: string;
    jobTitle?: string;
    teamId?: string;
    token?: string;
  }

  /**
   * سشنی که به کامپوننت‌ها یا APIها داده می‌شود
   */
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      family?: string;
      role?: string;
      jobTitle?: string;
      teamId?: string;
      accessToken?: string;
    };
    accessToken?: string;
  }
}

// این بخش برای کال‌بک jwt ضروری است
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    family?: string;
    role?: string;
    jobTitle?: string;
    teamId?: string;
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  // ارائه‌دهنده اعتبارنامه (Credentials) برای لاگین با ایمیل/رمز عبور
  providers: [
    CredentialsProvider({
      // نام ارائه‌دهنده (برای نمایش در UI)
      name: "credentials",

      // فیلدهای فرم لاگین
      credentials: {
        phone: { label: "شماره تماس", type: "tel" },
        password: { label: "رمز عبور", type: "password" },
      },

      // تابع authorize - جایی که احراز هویت انجام می‌شود
      async authorize(credentials) {
        //, req
        try {
          // THIS IS FOR LOGIN
          const response = await axios.post<BackendResponse>(
            `http://localhost:5000/api/v1/users/login`,
            {
              phone: credentials?.phone,
              password: credentials?.password,
            },
          );
          if (response.data.status === "success") {
            // EXTRACT TOKEN AND USER
            const { token } = response.data;
            const { user } = response.data.data;

            // برگرداندن آبجکت کاربر به همراه توکن
            // NextAuth این اطلاعات را در session ذخیره می‌کند
            return {
              id: user.id,
              name: user.name,
              family: user.family,
              role: user.role,
              jobTitle: user.jobTitle,
              teamId: user.teamId,
              token: token,
            };
          }

          // اگر لاگین ناموفق بود
          return null;
        } catch (error) {
          // خطا در ارتباط با سرور یا اطلاعات نادرست
          if (error instanceof Error) {
            console.error("خطا در ارتباط با سرور", error.message);
          } else {
            console.error(`خطایی با کد خطای : ${error}`);
          }

          return null;
        }
      },
    }),
  ],

  // کالبک‌ها - برای مدیریت session و token
  callbacks: {
    // کالبک jwt - هر بار که token ایجاد یا به‌روزرسانی می‌شود اجرا می‌شود
    async jwt({ token, user, trigger }) {
      // زمان لاگین (user موجود است) - اطلاعات کاربر را به token اضافه می‌کنیم
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.family = user.family;
        token.role = user.role;
        token.jobTitle = user.jobTitle;
        token.teamId = user.teamId;
        token.accessToken = user.token; // ذخیره توکن دریافتی از بک‌اند
      }

      // IF UPDATE CALL FROM CLIENT THE JWT CALLBACK IS CALL AGAIN
      if (trigger === "update") {
        const { data } = await api.get(`/users/${token.id}`, {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        });

        const dbUser = data.data.user;

        token.id = dbUser.id;
        token.name = dbUser.name;
        token.family = dbUser.family;
        token.role = dbUser.role;
        token.jobTitle = dbUser.jobTitle;
        token.teamId = dbUser.teamId;
        token.accessToken = dbUser.token;
      }

      return token;
    },

    // کالبک session - هر بار که session خوانده می‌شود اجرا می‌شود
    async session({ session, token }) {
      // اضافه کردن اطلاعات token به session (برای دسترسی در کلاینت)

      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.family = token.family as string;
        session.user.role = token.role as string;
        session.user.jobTitle = token.jobTitle as string;
        session.user.teamId = token.teamId as string;
        session.accessToken = token.accessToken as string; // توکن برای درخواست‌های بعدی
      }
      return session;
    },
  },

  // صفحات سفارشی (اختیاری - برای مسیرهای سفارشی لاگین/خطا)
  pages: {
    signIn: "/login", // صفحه لاگین سفارشی
    // error: "/auth/error", // صفحه خطا
  },

  // استراتژی session - استفاده از JWT (پیش‌فرض)
  session: {
    strategy: "jwt",
    // حداکثر زمان اعتبار session (بر حسب ثانیه)
    maxAge: 1 * 24 * 60 * 60, // 1 روز
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // در دیولوپمنت false باشد
      },
    },
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    // این خط را اضافه کنید تا از HS256 استفاده شود
    // algorithm: "HS256",
  },

  // فعال کردن لاگ‌های پیشرفته در محیط توسعه
  debug: process.env.NODE_ENV === "development",
};
