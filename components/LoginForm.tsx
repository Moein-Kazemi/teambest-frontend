"use client";
import { vazirMedium } from "@/app/fonts";
import { authAPI } from "@/lib/api";
import { LoginFormData, loginSchema } from "@/validation/authValidationsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultRegisterValue = {
  phone: "",
  password: "",
};

function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: defaultRegisterValue,
  });

  const onSubmit = async (data: LoginFormData) => {
    // REQUEST TO NEXTAUTH DIRECTLY AND LOG IN.
    const resultLogin = await signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: false,
    });

    if (resultLogin?.ok) {
      // SET ROLE COOKIE
      const setRoleCookieResponse = await authAPI.setRoleCookie();

      if (setRoleCookieResponse.success) {
        toast.success("ورود موفقیت آمیز");
        router.replace("/dashboard");
      } else {
        toast.error("نقش کاربر به درستی ذخیره نشد");
        router.replace("/login");
      }
    } else {
      toast.error("ورود نا موفق.");
      router.replace("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" grid grid-cols-2 gap-5 rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.25)]  bg-base-100 border-t border-t-gray-700/20   max-w-4xl mx-auto py-4 px-6"
    >
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

      {/* LOGIN */}
      <div className="form-control col-span-2 mt-6">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`btn btn-success w-full rounded-xl p-4 `}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner text-primary w-4 h-4"></span>
          ) : (
            "ورود"
          )}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
