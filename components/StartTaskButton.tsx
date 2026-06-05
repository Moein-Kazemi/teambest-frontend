"use client";
import { updateTask } from "@/lib/taskActions";
import { Play } from "lucide-react";

import { toast } from "sonner";

interface StartTaskButton {
  taskId: string;
  status: "انجام نشده" | "در حال انجام" | "انجام شده";
}

function StartTaskButton({ taskId, status }: StartTaskButton) {
  async function handelStart() {
    const result = await updateTask(taskId, {
      status: "در حال انجام",
    });

    if (result?.success) {
      toast.success("وظیفه با موفقیت شروع شد");
    } else {
      toast.error("وظیفه به دلایلی شروع نشد.");
    }
  }

  return (
    <button
      disabled={status === "انجام شده" || status === "در حال انجام"}
      className="btn btn-primary btn-sm md:btn-lg"
      onClick={handelStart}
    >
      <Play size={16} />
      شروع
    </button>
  );
}

export default StartTaskButton;
