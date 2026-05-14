import { z } from "zod";

// CREATE ZOD SCHEMA
export const assigneeSchema = z.object({
  assigneeId: z.string().min(1, "شناسه مسئول الزامی است"),
  assigneeName: z.string().min(1, "نام مسئول الزامی است"),
});

export const taskSchema = z.object({
  projectId: z.string().min(1, "شناسه پروژه الزامی است"),
  stageId: z.string().min(1, "شناسه مرحله الزامی است"),
  title: z
    .string()
    .min(1, "عنوان تسک الزامی است")
    .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
    .max(200, "عنوان نباید بیشتر از ۲۰۰ کاراکتر باشد"),
  description: z
    .string()
    .max(2000, "توضیحات نباید بیشتر از ۲۰۰۰ کاراکتر باشد")
    .optional(),
  assigneeTo: assigneeSchema,

  status: z.enum(["انجام نشده", "در حال انجام", "انجام شده"]).optional(),

  priority: z.enum(["کم", "متوسط", "زیاد", "خیلی زیاد"]).optional(),

  //   startDate: z.coerce.date().optional(),
  //   endDate: z.coerce.date().optional(),
});

//  CREATEA TYPE BASE ON THE ZOD SCHEMA
export type TaskFormData = z.infer<typeof taskSchema>;
export type AssigneeSchema = z.infer<typeof assigneeSchema>;
