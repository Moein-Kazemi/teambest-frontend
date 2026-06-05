"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import api from "./api";
import { IProject } from "@/interfaces/projectInterfaces";

import { projectSchema } from "@/validation/projectValidationSchema";

export async function deleteProject(projectId: string) {
  try {
    await api.delete(`/projects/${projectId}`);
    revalidateTag("projects");
    revalidatePath("/projects");
    revalidatePath("/team");
    revalidatePath("/tasks");
    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: `عملیات با کد خطا ${err} انجام نشد.` };
    }
  }
}

export async function createProject(
  ids: { teamId: string; ownerId: string },
  formData: FormData,
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const tasksData = [];

    // CREATE PROJECT DATA BASE ON THE FORM DATA
    const projectData: IProject = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      teamId: ids.teamId,
      ownerId: ids.ownerId,
      stages: JSON.parse(formData.get("stages") as string),
    };

    // VALIDATE PROJECT DATA WITH ZOD
    const validatedData = projectSchema.parse(projectData);

    // CREATE TASKS DATA
    for (const stage of validatedData.stages) {
      for (const task of stage.taskAssignments) {
        tasksData.push({
          projectId: "",
          stageId: "",
          title: task.taskTitle,
          description: "",
          assigneeTo: {
            assigneeId: task.assigneeId,
            assigneeName: task.assigneeName,
          },
        });
      }
    }

    // CREATE RIGHT FORMAT OF DATA FOR SENDING TO API IN THE BACKEND
    const data = {
      projectData,
      tasksData,
    };

    // SEND THE REQUEST TO API
    const { data: createProjectResponse } = await api.post("/projects", data);

    if (createProjectResponse.status === "fail") {
      throw new Error(createProjectResponse.data.message);
    }

    revalidateTag("projects");
    revalidatePath("/projects");
    revalidatePath("/team");
    revalidatePath("/tasks");
    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "پروژه به دلایلی ایجاد نشد." };
    }
  }
}
