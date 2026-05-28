"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  completeRegisterSchema,
  CompleteRegisterFormData,
} from "@/validation/authValidationsSchema";
import { signOut, useSession } from "next-auth/react";

import { completeRegister } from "@/lib/userActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";

const avatars = [
  "user-1.jpg",
  "user-2.jpg",
  "user-3.jpg",
  "user-4.jpg",
  "user-5.jpg",
  "user-6.jpg",
  "user-7.jpg",
  "user-8.jpg",
  "user-9.jpg",
  "user-10.jpg",
];
const defaultRegisterValue = {
  jobTitle: "",
  email: "",
  role: "member",
  avatar: "default.jpg",
} as const;

export default function CompleteRegisterForm() {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, isValid, errors },
  } = useForm<CompleteRegisterFormData>({
    resolver: zodResolver(completeRegisterSchema),
    mode: "onChange",
    defaultValues: defaultRegisterValue,
  });

  const selectedAvatar = watch("avatar");

  const onSubmit = async (data: CompleteRegisterFormData) => {
    const formData = new FormData();
    formData.set("jobTitle", data.jobTitle);
    formData.set("email", data.email || "");
    formData.set("role", data.role);
    formData.set("avatar", data.avatar as string);

    const result = await completeRegister(formData, user?.id as string);
    if (result.success) {
      toast.success("ثبت نام تکمیلی موفقیت آمیز");

      // CLEAR ROLE COOKIE BEFORE LOGOUT TO PREVENT AUTO LOGIN WITH INCOMPLETE PROFILE
      const clearRoleCookieRes = await authAPI.clearRoleCookie();
      if (clearRoleCookieRes.success) {
        signOut({ callbackUrl: "/login" });
      }

      router.replace("/profile");
    } else {
      toast.error("تکمیل ثبت نام ناموفق");
      router.replace("/profile/complete");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-5 rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.25)]  bg-base-100 border-t border-t-gray-700/20   max-w-4xl mx-auto py-4 px-6"
    >
      {/* NAME */}
      <div className="form-control flex gap-2 flex-col md:flex-row md:items-center pb-7 md:pb-0">
        <label className="label">
          <span className="label-text text-black">
            نام <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative w-full">
          <input
            type="text"
            value={user?.name as string}
            disabled={true}
            className="input border border-primary/20 outline-primary relative w-full"
          />
        </div>
      </div>

      {/* FAMILY */}
      <div className="form-control flex gap-2 flex-col md:flex-row md:items-center pb-7 md:pb-0">
        <label className="label">
          <span className="label-text text-black">
            نام خانوادگی <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative w-full">
          <input
            type="text"
            value={user?.family}
            disabled={true}
            className="input border border-primary/20 outline-primary relative w-full"
          />
        </div>
      </div>

      {/* jobTitle */}
      <div className="form-control col-span-2 md:col-span-1 flex gap-2 flex-col md:flex-row md:items-center pb-7 md:pb-0">
        <label className="label">
          <span className="label-text text-black">
            عنوان شغلی <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative w-full">
          <input
            type="text"
            {...register("jobTitle")}
            className="input border border-primary/20 outline-primary relative w-full"
            placeholder="عنوان شغلی را وارد کنید"
          />

          {errors.jobTitle && (
            <label className="label inline-block absolute -bottom-7 right-0">
              <span className="label-text-alt text-error">
                {errors.jobTitle.message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* email */}
      <div className="form-control col-span-2 md:col-span-1 flex gap-2 flex-col md:flex-row md:items-center pb-7 md:pb-0">
        <label className="label">
          <span className="label-text text-black">ایمیل</span>
        </label>

        <div className="relative w-full">
          <input
            type="email"
            {...register("email")}
            className="input border border-primary/20 outline-primary relative w-full"
            placeholder="ایمیل را وارد کنید"
          />

          {errors.email && (
            <label className="label inline-block absolute -bottom-7 right-0">
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* role */}
      <div className="form-control col-span-2 md:col-span-1 flex gap-2 flex-col md:flex-row md:items-center pb-7 md:pb-0">
        <label className="label">
          <span className="label-text text-black">
            نقش کاربر <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative w-full">
          <select
            {...register("role")}
            className="select border border-primary/20 outline-primary w-full"
          >
            <option value="">انتخاب نقش</option>
            <option value="member">اعضای تیم</option>
            <option value="manager">مدیر تیم</option>
          </select>

          {errors.role && (
            <label className="label inline-block absolute -bottom-7 right-0">
              <span className="label-text-alt text-error">
                {errors.role.message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* avatar */}
      <div className="col-span-2">
        <label className="label mb-3">
          <span className="label-text text-black">انتخاب آواتار</span>
        </label>

        <div className="flex flex-wrap gap-4">
          {avatars.map((avatar) => (
            <button
              type="button"
              key={avatar}
              onClick={() => setValue("avatar", avatar)}
              className={`border-2 w-16  rounded-full p-1 transition ${
                selectedAvatar === avatar ? "border-primary" : "border-gray-300"
              }`}
            >
              <Image
                src={`/avatar/${avatar}`}
                alt={avatar}
                width={70}
                height={70}
                className="rounded-full"
              />
            </button>
          ))}
        </div>

        {errors.avatar && (
          <label className="label inline-block mt-2">
            <span className="label-text-alt text-error">
              {errors.avatar.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control col-span-2 mt-6">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`btn btn-success w-full rounded-xl p-4 `}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner text-primary w-4 h-4"></span>
          ) : (
            "تکمیل ثبت نام"
          )}
        </button>
      </div>
    </form>
  );
}
