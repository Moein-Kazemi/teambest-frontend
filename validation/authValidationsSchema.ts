import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "نام کاربر الزامی است" })
      .min(3, { message: "نام باید حداقل 3 کارکتر باشد." })
      .max(10, { message: "نام باید کمتر از 10 کارکتر باشد" })
      .trim()
      .regex(/^[\u0600-\u06FF\s]+$/, "نام باید به فارسی باشد"),

    family: z
      .string()
      .min(1, { message: "نام خانوادگی کاربر الزامی است" })
      .min(3, { message: "نام خانوادگی باید حداقل 3 کارکتر باشد" })
      .max(10, { message: "نام خانوادگی باید کمتر از 10 کارکتر باشد" })
      .trim()
      .regex(/^[\u0600-\u06FF\s]+$/, "نام باید به فارسی باشد"),

    phone: z
      .string()
      .min(1, { message: "شماره تلفن الزامی است" })
      .refine(
        (val) => {
          const phoneRegex = /^09\d{9}$/;
          return phoneRegex.test(val);
        },
        { message: "شماره تماس نامعتبر است." },
      ),

    password: z
      .string()
      .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),

    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "رمز عبور و تکرار رمز عبور باید یکسان باشند.",
    path: ["passwordConfirm"], // CONNECT THIS ERROR TO FIELD OF THE FORM
  });

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "شماره تلفن الزامی است" })
    .refine(
      (val) => {
        const phoneRegex = /^09\d{9}$/;
        return phoneRegex.test(val);
      },
      { message: "شماره تماس نامعتبر است." },
    ),

  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

export const completeRegisterSchema = z.object({
  jobTitle: z.string().min(2, "عنوان شغلی الزامی است"),
  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "لطفا یک ایمیل معتبر وارد کنید.")
    .optional(),
  role: z.enum(["member", "manager"], {
    message: "نقش کاربر الزامی است",
  }),
  avatar: z.string().optional(),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "نام کاربر الزامی است" })
    .min(3, { message: "نام باید حداقل 3 کارکتر باشد." })
    .max(10, { message: "نام باید کمتر از 10 کارکتر باشد" })
    .trim()
    .regex(/^[\u0600-\u06FF\s]+$/, "نام باید به فارسی باشد"),

  family: z
    .string()
    .min(1, { message: "نام خانوادگی کاربر الزامی است" })
    .min(3, { message: "نام خانوادگی باید حداقل 3 کارکتر باشد" })
    .max(10, { message: "نام خانوادگی باید کمتر از 10 کارکتر باشد" })
    .trim()
    .regex(/^[\u0600-\u06FF\s]+$/, "نام باید به فارسی باشد"),

  jobTitle: z.string().min(2, "عنوان شغلی الزامی است"),
  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "لطفا یک ایمیل معتبر وارد کنید.")
    .optional(),
  avatar: z.string().optional(),
});

export type CompleteRegisterFormData = z.infer<typeof completeRegisterSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
