import { z } from "zod";

// 1) CREATE ZOD SCHEMA
// ==================== Task Assignment Schema ====================
export const taskAssignmentSchema = z.object({
  taskTitle: z.string().min(1, "عنوان وظیفه الزامی است"),
  assigneeId: z.string().min(1, "شناسه مسئول الزامی است"),
  assigneeName: z.string().min(1, "نام مسئول الزامی است"),
});

// ==================== Stage Schema ====================
export const stageSchema = z.object({
  name: z.string().min(1, "نام مرحله الزامی است"),
  order: z.number().int().min(0, "ترتیب باید عدد صحیح مثبت باشد"),
  taskAssignments: z
    .array(taskAssignmentSchema)
    .min(1, "حداقل یک وظیفه برای هر مرحله باید تعیین شود."),
});

// ==================== Project Schema ====================
export const projectSchema = z.object({
  name: z
    .string()
    .min(3, "نام پروژه باید حداقل ۳ کاراکتر باشد")
    .max(100, "نام پروژه نباید بیشتر از ۱۰۰ کاراکتر باشد"),
  description: z
    .string()
    .max(500, "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد")
    .optional(),
  //   teamId: z.string().min(1, "شناسه تیم الزامی است"),
  //   ownerId: z.string().min(1, "شناسه مالک الزامی است"),
  stages: z.array(stageSchema).min(1, "حداقل یک مرحله باید تعریف شود"),
});

// 2) CREATE TYPE BASE ON THR ZOD SCHEMA
// ==================== CREATE TYPE BASE ON THE ZOD SCHEMA WITH TYPE SCRIPT ====================
export type ProjectFormData = z.infer<typeof projectSchema>;
export type StageFormData = z.infer<typeof stageSchema>;
export type TaskAssignmentFormData = z.infer<typeof taskAssignmentSchema>;
