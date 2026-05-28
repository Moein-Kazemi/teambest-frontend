"use server";
import { IUser } from "@/interfaces/userInterfaces";
import {
  completeRegisterSchema,
  updateProfileSchema,
} from "@/validation/authValidationsSchema";
import api from "./api";
import { revalidatePath, revalidateTag } from "next/cache";

export async function completeRegister(
  formData: FormData,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const userData: Partial<IUser> = {
      jobTitle: formData.get("jobTitle") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as "member" | "manager",
      avatar: formData.get("avatar") as string,
    };

    const validatedData = completeRegisterSchema.parse(userData);
    const { data: completeRegisterResponse } = await api.patch(
      `/users/${userId}`,
      validatedData,
    );

    if (completeRegisterResponse.status === "fail") {
      throw new Error(completeRegisterResponse.data.message);
    }

    // revalidateTag("projects");
    revalidatePath("/profile");
    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "پروژه به دلایلی ایجاد نشد." };
    }
  }
}

export async function updateProfile(
  formData: FormData,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const userData: Partial<IUser> = {
      name: formData.get("name") as string,
      family: formData.get("family") as string,
      jobTitle: formData.get("jobTitle") as "member" | "manager",
      email: formData.get("email") as string,
      avatar: formData.get("avatar") as string,
    };

    const validatedData = updateProfileSchema.parse(userData);
    const { data: completeRegisterResponse } = await api.patch(
      `/users/${userId}`,
      validatedData,
    );

    if (completeRegisterResponse.status === "fail") {
      throw new Error(completeRegisterResponse.data.message);
    }

    // revalidateTag("projects");
    revalidateTag(`user-${userId}`);
    revalidatePath("/profile");

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: "پروژه به دلایلی ایجاد نشد." };
    }
  }
}
