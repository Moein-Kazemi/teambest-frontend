"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import api from "@/lib/api";

import {
  createTeamSchema,
  CreateTeamFormData,
} from "@/validation/teamValidationsSchema";

// ==================== CREATE TEAM ACTION ====================

export async function createTeam(data: CreateTeamFormData): Promise<{
  success: boolean;
  teamId?: string;
  error?: string;
}> {
  try {
    // ==================== VALIDATION ====================

    const validatedData = createTeamSchema.parse(data);

    // ==================== API REQUEST ====================

    const { data: createTeamResponse } = await api.post(
      "/teams",
      validatedData,
    );

    // ==================== ERROR HANDLING ====================

    if (createTeamResponse.status === "fail") {
      throw new Error(createTeamResponse.message || "خطا در ایجاد تیم");
    }

    // ==================== REVALIDATE ====================

    revalidatePath("/team");
    revalidatePath("/dashboard");
    revalidatePath("/projects");
    revalidatePath("/tasks");
    revalidatePath("/profile");
    revalidateTag(`team-${createTeamResponse.data.team._id.toString()}`);

    // ==================== SUCCESS ====================

    return {
      success: true,
      teamId: createTeamResponse.data.team._id.toString(),
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "خطا در ایجاد تیم",
    };
  }
}

// ==================== DELETE TEAM ACTION ====================

export async function deleteTeam(teamId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // ==================== DELETE TEAM ====================

    const { data } = await api.delete(`/teams/${teamId}`);

    // ==================== API ERROR ====================

    if (data.status === "fail") {
      throw new Error(data.message || "خطا در حذف تیم");
    }

    // ==================== REVALIDATE ====================

    revalidateTag(`team-${teamId}`);
    revalidatePath("/team");

    // ==================== SUCCESS ====================

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "خطا در حذف تیم",
    };
  }
}
