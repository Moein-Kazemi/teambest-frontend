"use client";
import { updateTask } from "@/lib/taskActions";
import { Play } from "lucide-react";

import { toast } from "sonner";

function StartTaskButton({ taskId }: { taskId: string }) {
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
    <button className="btn btn-primary btn-sm" onClick={handelStart}>
      <Play size={16} />
      شروع
    </button>
  );
}

export default StartTaskButton;
