"use server";

import { ITask } from "@/interfaces/tasksInterfaces";
import { taskSchema } from "@/validation/taskValidationSchema";
import api from "./api";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createTask(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const taskData: ITask = {
      projectId: formData.get("projectId") as string,
      stageId: formData.get("stageId") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      assigneeTo: JSON.parse(formData.get("assigneeTo") as string),
      priority: formData.get("priority") as
        | "کم"
        | "متوسط"
        | "زیاد"
        | "خیلی زیاد",
    };

    // VALIDATE DATA IN THE SERVER ACTION
    const validateData = taskSchema.parse(taskData);

    const { data: createTaskResponse } = await api.post("/tasks", validateData);

    if (createTaskResponse.status === "fail") {
      throw new Error(createTaskResponse.data.message);
    }
    revalidateTag("projects");
    revalidatePath("/tasks");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "وظیفه به دلایلی ایجاد نشد." };
    }
  }
}

export async function deleteTaskById(taskId: string) {
  try {
    await api.delete(`/tasks/${taskId}`);
    revalidateTag("projects");
    revalidatePath("/tasks");
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: `عملیات با کد خطا ${err} انجام نشد.` };
    }
  }
}

export async function updateTask(
  id: string,
  data: Partial<ITask>,
): Promise<{ success: boolean; message: string }> {
  try {
    await api.patch(`/tasks/${id}`, data);
    revalidatePath("/tasks");
    return { success: true, message: "وظیفه با موفقیت شروع به انجام شد" };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    } else {
      return { success: false, message: "پروژه به دلایلی شروع نشد." };
    }
  }
}
