"use client";

import { useRouter } from "next/navigation";

import { deleteTeam } from "@/lib/teamActions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

// ==================== PROPS ====================

interface DeleteTeamButtonProps {
  teamId: string;
}

// ==================== COMPONENT ====================

export default function DeleteTeamButton({ teamId }: DeleteTeamButtonProps) {
  const router = useRouter();
  const { update } = useSession();

  // ==================== HANDLE DELETE ====================

  const handleDelete = async () => {
    const confirmed = confirm("واقعا میخواهی تیم را حذف کنی؟");

    if (!confirmed) return;

    const result = await deleteTeam(teamId);

    if (result.success) {
      await update();
      toast.success("تیم با موفقیت حذف شد");
      router.replace("/team");
    } else {
      alert(result.error || "خطا در حذف تیم");
    }
  };

  // ==================== RENDER ====================

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="btn btn-error rounded-2xl px-8"
    >
      حذف
    </button>
  );
}
