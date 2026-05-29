import { z } from "zod";

// ==================== TEAM MEMBER SCHEMA ====================

export const teamMemberSchema = z.object({
  memberId: z.string().min(1, "شناسه عضو الزامی است"),
  memberName: z.string().min(2, "نام عضو باید حداقل ۲ کاراکتر باشد"),
  memberAvatar: z.string().default(""),
  memberJobTitle: z.string().default(""),
});

// ==================== TEAM PROJECT SCHEMA ====================

export const teamProjectSchema = z.object({
  projectId: z.string().min(1, "شناسه پروژه الزامی است"),
  projectName: z.string().min(2, "نام پروژه باید حداقل ۲ کاراکتر باشد"),
});

// ==================== MAIN TEAM SCHEMA ====================

export const createTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "نام تیم باید بیشتر از ۳ کاراکتر باشد")
    .max(100, "نام تیم نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),

  summary: z
    .string()
    .trim()
    .min(10, "خلاصه فعالیت تیم باید بیشتر از ۱۰ کاراکتر باشد")
    .max(500, "خلاصه تیم نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"),

  logo: z.string().default(""),

  ownerId: z.string().min(1, "شناسه مدیر تیم الزامی است"),

  members: z
    .array(teamMemberSchema)
    .min(1, "حداقل یک عضو باید به تیم اضافه شود.")
    .default([]),

  projects: z.array(teamProjectSchema).default([]),
});

// ==================== TYPES ====================

export type CreateTeamFormData = z.infer<typeof createTeamSchema>;

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;
