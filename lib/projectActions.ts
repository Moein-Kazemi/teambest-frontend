"use server";

import { revalidatePath } from "next/cache";
import api from "./api";
import { IProject } from "@/interfaces/projectInterfaces";
import { redirect } from "next/navigation";
import { projectSchema } from "@/validation/projectValidationSchema";

export async function deleteProject(projectId: string) {
  await api.delete(`/projects/${projectId}`);
  revalidatePath("/projects");
}

export async function createProject(
  ids: any,
  formData: FormData,
): Promise<{
  success: boolean;
  data?: IProject;
  error?: string;
  errors?: { field: string; message: string }[];
} | void> {
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

    // : {
    //   status: string;
    //   data: { project: IProject };
    //   message?: string;
    // }
    // SEND THE REQUEST TO API
    const createProjectRespones = await api.post("/projects", data);
    console.log(`project ${createProjectRespones}`);
    if (createProjectRespones.data.status === "success") {
      revalidatePath("/projects");
      redirect("/projects");
    }

    if (createProjectRespones.data.status === "fail") {
      throw new Error(createProjectRespones.data.message);
    }
  } catch (err: any) {
    return { success: false, error: err.data.message };
    // if (err instanceof Error) {
    //   // console.log(err);
    //   return {
    //     success: false,
    //     error: err.message,
    //   };
    // } else {
    //   return {
    //     success: false,
    //     error: "حطای ناشناخته ای در زمان ایجاد پروژه به وجود آمد.",
    //   };
    // }
  }
}
