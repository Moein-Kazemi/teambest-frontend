"use server";

import { revalidatePath } from "next/cache";
import api from "./api";

export async function deleteProject(projectId: string) {
  await api.delete(`/projects/${projectId}`);
  revalidatePath("/projects");
}

export async function createProject(ids: any, formData: any) {
  const formDataWithStagesJson = {
    ...formData,
    stages: JSON.parse(formData.get("stages") as string),
  };

  console.log(ids);
  console.log(formDataWithStagesJson);
}
