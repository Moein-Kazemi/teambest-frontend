import { ITask } from "@/interfaces/tasksInterfaces";
import Image from "next/image";
import avatar from "@/public/images/moein.JPG";

function TaskCard({ task }: { task: ITask }) {
  return (
    <li className="card sm:justify-between shadow-[0_3px_20px_rgba(0,0,0,0.25)] border-t-gray-700/20 space-y-6 sm:space-y-0 py-3 px-2 sm:px-4 sm:card-side  justify-center items-center bg-base-100  border border-base-300 hover:shadow-2xl transition-shadow duration-300">
      {/* <div className=" flex-row items-center p-4 gap-6"> */}
      {/* TAKS TITLE AND PRIORITY */}
      <div className="card-body text-center  max-w-full flex flex-col justify-center p-2">
        <h3 className="card-title text-lg mb-2 ">{task.title}</h3>
        <div className="flex justify-center items-center gap-3 sm:justify-start">
          <span className="font-medium">اولویت {task.priority}</span>
          <div className="indicator">
            <div className="w-4 h-4 rounded-full bg-success shadow-sm"></div>
          </div>
        </div>
      </div>

      <div className="grow flex  justify-center items-center gap-2 sm:flex-col ">
        {/* avatar */}
        <div className="flex justify-center items-center gap-2">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <Image src={avatar} alt="avarar-image" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-base-content/50">مسئول انجام</div>
            <div className="font-medium">محمد رضایی</div>
          </div>
        </div>

        <div className="badge badge-lg gap-2 bg-success text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          تکمیل شده
        </div>
      </div>

      <div className="flex-shrink-0 flex flex-col items-end gap-3">
        <div className="flex gap-2">
          <button className="btn btn-outline btn-info btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            جزئیات
          </button>

          <button className="btn btn-primary btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            شروع
          </button>

          <button className="btn btn-error btn-outline btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            حذف
          </button>
        </div>
      </div>
      {/* </div> */}
    </li>
  );
}

export default TaskCard;
