"use client";
import { updateTask } from "@/lib/taskActions";
import { toast } from "sonner";

interface EndTaskButtonProps {
  taskId: string;
  status: "انجام نشده" | "در حال انجام" | "انجام شده";
}

function EndTaskButton({ taskId, status }: EndTaskButtonProps) {
  async function handelEnd() {
    const result = await updateTask(taskId, {
      status: "انجام شده",
    });

    if (result?.success) {
      toast.success("وظیفه با موفقیت به پایان رسید");
    } else {
      toast.error("وظیفه به دلایلی به پایان نرسید");
    }
  }
  return (
    <button
      disabled={status === "انجام نشده" || status === "انجام شده"}
      onClick={handelEnd}
      className="btn btn-success btn-sm md:btn-lg"
    >
      پایان
    </button>
  );
}

export default EndTaskButton;
