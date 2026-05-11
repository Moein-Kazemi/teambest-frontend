"use client"; // این خط برای Next.js App Router الزامی است

import { vazirLight } from "@/app/fonts";

import { useState, useEffect } from "react";

export default function DateTimeBox() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // PERSIAN DATE OF NOW
      const dayOfWeek = new Intl.DateTimeFormat("fa-IR", {
        weekday: "long",
        calendar: "persian",
      }).format(now);
      const year = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        calendar: "persian",
      }).format(now);

      const month = new Intl.DateTimeFormat("fa-IR", {
        month: "long",
        calendar: "persian",
      }).format(now);

      const dayOfMonth = new Intl.DateTimeFormat("fa-IR", {
        day: "numeric",
        calendar: "persian",
      }).format(now);

      const persianDate = `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;

      // PERSIAN TIME OF NOW
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const persianTime = new Intl.DateTimeFormat("fa-IR", optionsTime).format(
        now,
      );
      setDate(persianDate);
      setTime(persianTime);
    };

    // FIRST TIME UPDATE
    updateDateTime();

    // UPDATE TIME AND TIME EVERY SECONDS
    const interval = setInterval(updateDateTime, 1000);

    // CLEAR TIMER AFTER ONMOUNT
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-base-300 col-span-12 md:col-span-6">
      <div className="card-body items-center text-center">
        {/* CALENDER ICON */}
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

        {/* PERSIAN DATE */}
        <h2
          className="card-title text-[16px] min-[420px]:text-xl mb-2 text-base-content"
          dir="rtl"
        >
          {date || "در حال بارگذاری..."}
        </h2>

        {/* DIVIDER LINE */}
        <div className="divider divide-gray-400 my-0"></div>

        {/* PERSIAN TIME */}
        <div
          className={`text-4xl ${vazirLight.className}  text-primary  tracking-wider`}
        >
          {time || "--:--:--"}
        </div>

        <p className="text-sm text-base-content/50 mt-2">زمان فعلی سیستم</p>
      </div>
    </div>
  );
}
