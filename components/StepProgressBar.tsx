"use client";

import React from "react";
import { User, UserPlus, Users, LayoutList } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description?: string; // برای توضیحات کوتاه در صورت نیاز
  icon: React.ElementType;
}

const steps: Step[] = [
  {
    id: 1,
    title: "ثبت نام اولیه",
    icon: User,
  },
  {
    id: 2,
    title: "تکمیل ثبت نام",
    description: "به عنوان مدیر یا اعضای تیم",
    icon: UserPlus,
  },
  {
    id: 3,
    title: "ایجاد تیم",
    description: "یا عضویت در یک تیم",
    icon: Users,
  },
  {
    id: 4,
    title: "پروژه‌ها و وظایف",
    description: "ایجاد یا دیدن پروژه‌ها",
    icon: LayoutList,
  },
];

export default function StepProgressBar({ role }: { role: string }) {
  // const { data } = useSession();
  // console.log(data?.user);
  // فرض بر این است که کاربر در مرحله ۱ (اول) قرار دارد.
  // می‌توانید این متغیر را از پراپ‌ها (props) دریافت کنید.
  let currentStep: number = 2;
  if (role === "user") {
    currentStep = 2;
  }
  if (role === "member") {
    currentStep = 3;
  }
  if (role === "manager") currentStep = 3;

  return (
    <div className="w-full max-w-4xl mx-auto my-5 md:my-10 p-4">
      <div className="flex gap-5 flex-col md:flex-row items-center justify-between w-full relative">
        {/* (Background Line) */}
        <div className="absolute hidden md:block md:top-1/2 md:left-0 w-full h-1 bg-base-300 -z-10 rounded-full transform -translate-y-1/2"></div>

        {/* (Active Line) */}
        <div
          className="absolute hidden md:block right-0 top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transform -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            maxWidth: "100%",
          }}
        ></div>

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10 group"
            >
              {/* دایره و آیکون */}
              <div
                className={`
                  w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center 
                  border-4 transition-all duration-300 shadow-sm
                  ${
                    isCompleted
                      ? "bg-primary text-primary-content border-primary"
                      : isActive
                        ? "bg-base-100 text-primary border-primary animate-pulse"
                        : "bg-base-100 text-base-content border-base-300"
                  }
                `}
              >
                <Icon size={isActive || isCompleted ? 24 : 20} />
              </div>

              {/* باکس متن (نام مرحله و توضیحات) */}
              <div
                className={`
                  mt-4 md:mt-8 w-32 sm:w-40 text-center p-2 rounded-lg transition-all duration-300
                  ${isActive ? "bg-base-100 shadow-md scale-105" : "bg-transparent"}
                `}
              >
                <h3
                  className={`
                    text-sm sm:text-base font-bold mb-1
                    ${isActive || isCompleted ? "text-primary" : "text-base-content/50"}
                  `}
                >
                  {step.title}
                </h3>
                {step.description && (
                  <p
                    className={`
                      text-xs sm:text-sm leading-tight
                      ${isActive || isCompleted ? "text-base-content" : "text-base-content/40"}
                    `}
                  >
                    {step.description}
                  </p>
                )}
              </div>

              {/* نشانگر مرحله (اختیاری: شماره مرحله) */}
              <div
                className={`
                  absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border-2
                  ${
                    isCompleted
                      ? "bg-primary text-primary-content border-base-100"
                      : isActive
                        ? "bg-primary text-primary-content border-primary"
                        : "bg-base-100 text-base-content/30 border-base-300"
                  }
                `}
              >
                {isCompleted ? "✓" : step.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
