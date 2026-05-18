import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { phone, password } = await request.json();

    const { data: loginResponse } = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      { phone, password },
      { withCredentials: true },
    );

    // بک‌اند کوکی را ست کرده است، اما ما باید وضعیت کاربر را به فرانت منتقل کنیم
    // نکته: چون کوکی HttpOnly است، نمی‌توانیم مستقیماً در جاوااسکریپت بخوانیم.
    // اما مرورگر به طور خودکار کوکی را برای درخواست‌های بعدی می‌فرستد.

    // ما فقط یک سیگنال موفقیت به کلاینت می‌دهیم تا ریدایرکت کند
    return NextResponse.json({ success: true, user: loginResponse.data.user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data?.message || "Login failed" },
      { status: error?.response?.status || 500 },
    );
  }
}
