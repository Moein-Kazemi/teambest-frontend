"use client"; // این خط برای Next.js App Router الزامی است

import { useState, useEffect } from "react";

export default function DateTimeBox() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // 1. تنظیمات تاریخ شمسی
      const optionsDate: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        calendar: "persian", // تقویم شمسی
      };
      // تبدیل به رشته فارسی
      const persianDate = new Intl.DateTimeFormat("fa-IR", optionsDate).format(
        now,
      );

      // 2. تنظیمات ساعت
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // فرمت ۱۲ ساعته (صبح/بعدازظهر)
      };
      const persianTime = new Intl.DateTimeFormat("fa-IR", optionsTime).format(
        now,
      );

      setDate(persianDate);
      setTime(persianTime);
    };

    // آپدیت اولیه
    updateDateTime();

    // تنظیم تایمر برای آپدیت هر ثانیه
    const interval = setInterval(updateDateTime, 1000);

    // پاکسازی تایمر هنگام بسته شدن کامپوننت
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      {/* باکس اصلی با استایل دیزی‌یو */}
      <div className="card w-96 bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          {/* آیکون تقویم */}
          <div className="mb-4 p-4 bg-primary/10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* نمایش تاریخ */}
          <h2 className="card-title text-xl mb-2 text-base-content">
            {date || "در حال بارگذاری..."}
          </h2>

          {/* خط جداکننده */}
          <div className="divider divider-primary my-0"></div>

          {/* نمایش ساعت */}
          <div className="text-4xl font-bold text-primary font-mono tracking-wider">
            {time || "--:--:--"}
          </div>

          <p className="text-sm text-base-content/50 mt-2">زمان فعلی سیستم</p>
        </div>
      </div>
    </div>
  );
}
