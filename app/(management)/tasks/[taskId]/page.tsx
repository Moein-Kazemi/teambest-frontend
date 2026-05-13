import { vazirMedium } from "@/app/fonts";
import BackButtonServer from "@/components/BackButtonServer";
import UserBox from "@/components/UserBox";
import { IProject, IStage } from "@/interfaces/projectInterfaces";
import { ITask } from "@/interfaces/tasksInterfaces";
import { projectsAPI, tasksAPI } from "@/lib/api";
import { Group, Newspaper } from "lucide-react";

interface PageProps {
  params: {
    taskId: string;
  };
}

async function Page({ params }: PageProps) {
  // fetch task
  const taskId = params.taskId;
  const resTask = await tasksAPI.getTaskById(taskId);
  const task: ITask = resTask.data.task;

  //   fetch project
  const resProj = await projectsAPI.getById(task.projectId);
  const project: IProject = resProj.data.project;
  const stage: IStage = project.stages.find(
    (stage) => stage._id === task.stageId,
  ) as IStage;

  return (
    <div className="space-y-6">
      {/* TITLE AND BACK BUTTON */}
      <div className="flex flex-col gap-4 items-start">
        <BackButtonServer path="/tasks" />
        <h2 className={`${vazirMedium.className} text-2xl`}>{task.title}</h2>
      </div>

      {/* DESCRIOPTION SECTIONS */}
      <div className=" space-y-2">
        <h3 className="text-xl text-gray-500">توضیحات</h3>
        <p className={`text-[16px] ${task.description ? "" : "text-primary"}`}>
          {task.description
            ? task.description
            : "مدیر هنوز توضیحی برای این وظیفه وارد نکرده است."}
        </p>
      </div>

      {/* name of the project and number of the stages */}
      <div className="space-y-2">
        <h4 className="flex items-center gap-1">
          <Newspaper className="text-indigo-500" size={18} />
          <strong>پروژه {project.name}</strong>
        </h4>

        <h5 className="flex gap-1 items-center">
          <Group className="text-indigo-500" size={18} />
          <strong>
            مرحله {stage.order} : {stage.name}
          </strong>
        </h5>
      </div>

      {/* responsible person box */}
      <div className="card space-y-2 rounded-2xl text-center bg-gray-300 p-4">
        <h5>مسئول انجام وظیفه</h5>
        <UserBox name={task?.assigneeTo?.assigneeName as string} />
      </div>
    </div>
  );
}

export default Page;
