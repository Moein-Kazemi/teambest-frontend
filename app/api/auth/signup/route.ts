import { ITokenPayload } from "@/interfaces/tokenInterfaces";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, family, phone, password, passwordConfirm } = body;

    if (!name || !family || !phone || !password || !passwordConfirm) {
      return Response.json(
        { error: "شماره تماس و رمز عبور الزامی است." },
        { status: 400 },
      );
    }

    const { data: registerResponse } = await axios.post(
      "http://localhost:5000/api/v1/users/signup",
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (registerResponse.status === "success") {
      // STORE COOKIE BASE ON HTTP COOKIE
      // const isProduction = process.env.NODE_ENV === "production";
      // storeCookie.set("auth_token", registerResponse?.token, {
      //   httpOnly: true, // secure againts xss atack
      //   secure: isProduction, //process.env.NODE_ENV === "production", // change to production in deploy
      //   sameSite: isProduction ? "none" : "lax",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // store 7 days
      // });

      const user = jwtDecode<ITokenPayload>(registerResponse?.token);
      console.log(user);

      return Response.json({
        success: true,
        message: "کاربر با موفقیت ثبت نام شد.",
        user: registerResponse.data.user,
      });
    } else {
      throw new Error("ثبت نام موفقیت آمیز نبود");
    }
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ success: false, error: err.message });
    } else {
      return Response.json({ success: false, error: err });
    }
  }
}
