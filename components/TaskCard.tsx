import { ITask } from "@/interfaces/tasksInterfaces";
import { vazirMedium } from "@/app/fonts";
import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityIndicator from "./PriorityIndicator";
import Link from "next/link";
import UserBox from "./UserBox";
import DeleteTaskModal from "./DeleteTaskModal";
interface TaskCardProps {
  task: ITask;
  role: string;
}

function TaskCard({ task, role }: TaskCardProps) {
  return (
    <li className="card items-center sm:flex-row sm:justify-between  shadow-[0_3px_20px_rgba(0,0,0,0.25)] border-t-gray-700/20 space-y-6 sm:space-y-0 py-3 px-2 sm:px-4  bg-base-100  border border-base-300 hover:shadow-2xl transition-shadow duration-300">
      {/* TAKS TITLE AND PRIORITY */}
      <div className=" w-50  text-center max-w-full justify-center  p-2">
        <h3
          className={`${vazirMedium.className} text-center sm:text-right text-lg mb-2 `}
        >
          {task.title}
        </h3>
        <div className="flex justify-center items-center gap-3 sm:justify-start">
          <span className="font-medium">اولویت {task.priority}</span>
          <PriorityIndicator priority={task.priority as string} />
        </div>
      </div>
      {/* USER AVATAR AND RESPONSIBLE TO DO TASK  */}
      <div className="flex flex-col min-[840px]:flex-row p-2 min-w-50 justify-center items-center gap-2  ">
        <UserBox
          name={task?.assigneeTo?.assigneeName as string}
          userId={task?.assigneeTo?.assigneeId?.toString() as string}
        />
        <StatusBadge status={task.status as string} />
      </div>
      {/* BUTTON SECTIONS  */}
      <div className="flex justify-center sm:flex-col md:flex-row md:justify-end p-2 min-w-50 gap-3">
        <Link
          href={`/tasks/${task._id}`}
          className="btn btn-outline btn-info btn-sm"
        >
          <Eye size={16} />
          جزئیات
        </Link>

        {role === "manager" && <DeleteTaskModal taskId={task._id as string} />}
      </div>
    </li>
  );
}

export default TaskCard;
