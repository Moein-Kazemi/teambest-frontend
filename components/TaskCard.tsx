import { ITask } from "@/interfaces/tasksInterfaces";
import Image from "next/image";
import avatar from "@/public/images/moein.JPG";
import { vazirMedium } from "@/app/fonts";
import { Eye, Play, Trash } from "lucide-react";
import StatusBadge from "./StatusBadge";

function TaskCard({ task }: { task: ITask }) {
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
          <div className="indicator">
            <div className="w-4 h-4 rounded-full bg-success shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* USER AVATAR AND RESPONSIBLE TO DO TASK  */}
      <div className="flex flex-col min-[840px]:flex-row p-2 min-w-50 justify-center items-center gap-2  ">
        {/* avatar */}
        <div className="flex justify-center items-center gap-2">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <Image src={avatar} alt="avarar-image" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-base-content/50">مسئول انجام</div>
            <div className={vazirMedium.className}>
              {task?.assigneeTo?.assigneeName}
            </div>
          </div>
        </div>

        <StatusBadge status={task.status as string} />
      </div>

      {/* BUTTON SECTIONS  */}
      <div className="flex sm:flex-col md:flex-row p-2 min-w-50 gap-3">
        <button className="btn btn-outline btn-info btn-sm">
          <Eye size={16} />
          جزئیات
        </button>

        <button className="btn btn-primary btn-sm">
          <Play size={16} />
          شروع
        </button>

        <button className="btn btn-error btn-outline btn-sm">
          <Trash size={16} />
          حذف
        </button>
      </div>
    </li>
  );
}

export default TaskCard;
