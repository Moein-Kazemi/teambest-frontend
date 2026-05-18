import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    // ۱. دریافت داده‌ها از فرانت‌اند
    const { name, family, phone, password, passwordConfirm } =
      await request.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: "شماره تماس و رمز عبور الزامی است." },
        { status: 400 },
      );
    }

    // ۳. ارسال درخواست به API بک‌اند (Express)
    // با withCredentials: true، کوکی‌های برگشتی از بک‌اند در مرورگر ذخیره می‌شوند
    const { data: registerResponse } = await axios.post(
      "http://localhost:5000/api/v1/users/signup",
      { name, family, phone, password, passwordConfirm },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (registerResponse.status === "success") {
      return NextResponse.json({
        success: true,
        message: "کاربر با موفقیت ثبت نام شد.",
        user: registerResponse.data.user, // فرض بر این است که بک‌اند user را برمی‌گرداند
      });
    }
  } catch (error: any) {
    console.error("Signup Error:", error);

    if (error.response) {
      return NextResponse.json(
        { error: error.response.data.message || "ثبت نام انجام نشد." },
        { status: error.response.status },
      );
    } else {
      return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
    }
  }
}
