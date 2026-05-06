"use server";

import { revalidatePath } from "next/cache";
import api from "./api";
import { IProject } from "@/interfaces/projectInterfaces";
import { redirect } from "next/navigation";

export async function deleteProject(projectId: string) {
  await api.delete(`/projects/${projectId}`);
  revalidatePath("/projects");
}

export async function createProject(ids: any, formData: FormData) {
  const tasksData = [];

  // CREATE PROJECT DATA BASE ON THE FORM DATA
  const projectData: IProject = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    teamId: ids.teamId,
    ownerId: ids.ownerId,
    stages: JSON.parse(formData.get("stages") as string),
  };

  // CREATE TASKS DATA
  for (const stage of projectData.stages) {
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
  await api.post("/projects", data);
  revalidatePath("/projects");
  redirect("/projects");
}
