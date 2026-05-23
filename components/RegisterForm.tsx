"use client";

import { vazirMedium } from "@/app/fonts";
import { signIn } from "next-auth/react";
import {
  RegisterFormData,
  registerSchema,
} from "@/validation/authValidationsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authAPI } from "@/lib/api";

// DEFAULT VALUES
const defaultRegisterValue = {
  name: "",
  family: "",
  phone: "",
  password: "",
  passwordConfirm: "",
};

function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: defaultRegisterValue,
  });

  // HANDEL SUBMIT
  const onSubmit = async (data: RegisterFormData) => {
    const phone = data.phone;
    const password = data.password;

    // SIGNUP
    const responseResult = await authAPI.signup(data);

    if (responseResult?.success) {
      // LOGIN
      const resultLogin = await signIn("credentials", {
        phone: phone,
        password: password,
        redirect: false,
      });

      if (resultLogin?.ok) {
        // SET AUTH-ROLE COOKIE
        const setRoleCookieResponse = await authAPI.setRoleCookie();

        if (setRoleCookieResponse.success) {
          toast.success("ثبت نام شما با موفقیت انجام شد");
          router.replace("/dashboard");
        } else {
          toast.error("نقش کاربر به درستی ذخیره نشد");
          router.replace("/login");
        }
      } else {
        toast.error(
          "ثبت نام با موفقیت انجام شد ، اما ورود خودکار انجام نشد.لطفا وارد شوید.",
        );
        router.replace("/login");
      }
    } else {
      toast.error("ثبت نام انجام نشد.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" grid grid-cols-2 gap-5 rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.25)]  bg-base-100 border-t border-t-gray-700/20   max-w-4xl mx-auto py-4 px-6"
    >
      {/* NAME */}
      <div className="form-control col-span-2 min-[640px]:col-span-1 w-full flex gap-2 flex-col   pb-7 ">
        <label className="label ">
          <span className={` label-text text-black ${vazirMedium.className}`}>
            نام <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative  ">
          <input
            type="text"
            required
            {...register("name")}
            className="input w-full border border-primary/20 outline-primary relative "
          />
          {errors.name && (
            <label className="label inline-block absolute -bottom-7  right-0 ">
              <span className="label-text-alt text-error">
                {errors.name.message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* FAMLIY */}
      <div className="form-control col-span-2 min-[640px]:col-span-1  w-full flex gap-2 flex-col    pb-7 ">
        <label className="label">
          <span className={` label-text text-black ${vazirMedium.className}`}>
            نام خانوادگی <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative ">
          <input
            type="text"
            required
            {...register("family")}
            className="input border w-full border-primary/20 outline-primary relative "
          />
          {errors.family && (
            <label className="label inline-block absolute -bottom-7  right-0 ">
              <span className="label-text-alt text-error">
                {errors.family.message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* PHONE */}
      <div className="form-control col-span-2 min-[640px]:col-span-1 w-full flex gap-2 flex-col   pb-7 ">
        <label className="label">
          <span className={` label-text text-black ${vazirMedium.className}`}>
            شماره تماس <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative ">
          <input
            type="tel"
            required
            {...register("phone")}
            className="input border w-full border-primary/20 outline-primary relative "
            placeholder="09***"
          />
          {errors.phone && (
            <label className="label inline-block absolute -bottom-7  right-0 ">
              <span className="label-text-alt text-error">
                {errors.phone.message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* PASSWORD */}
      <div className="form-control col-span-2 min-[640px]:col-span-1 w-full flex gap-2 flex-col    pb-7 ">
        <label className="label">
          <span className={` label-text text-black ${vazirMedium.className}`}>
            رمز عبور <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative ">
          <input
            type="password"
            required
            {...register("password")}
            className="input border w-full border-primary/20 outline-primary relative "
          />
          {errors.password && (
            <label className="label inline-block absolute -bottom-7  right-0 ">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </label>
          )}
        </div>
      </div>
      {/* PASSWORDCONFIRM */}
      <div className="form-control col-span-2 min-[640px]:col-span-1 w-full flex gap-2 flex-col  pb-7 ">
        <label className="label">
          <span className={` label-text text-black ${vazirMedium.className}`}>
            تکرار رمز عبور <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative">
          <input
            type="password"
            required
            {...register("passwordConfirm")}
            className="input border w-full border-primary/20 outline-primary relative "
          />
          {errors.passwordConfirm && (
            <label className="label inline-block absolute -bottom-7  right-0 ">
              <span className="label-text-alt text-error">
                {errors.passwordConfirm.message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* SUBMIT */}
      <div className="form-control col-span-2 mt-6">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`btn btn-success w-full rounded-xl p-4 `}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner text-primary w-4 h-4"></span>
          ) : (
            "ثبت نام"
          )}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
