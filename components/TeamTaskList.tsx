import { IProject } from "@/interfaces/projectInterfaces";
import { ITask } from "@/interfaces/tasksInterfaces";
import { projectsAPI, tasksAPI } from "@/lib/api";
import TaskCard from "./TaskCard";

interface TeamTaskListProps {
  teamId: string;
  role: string;
}

async function TeamTaskList({ teamId, role }: TeamTaskListProps) {
  const teamTasksIds: string[] = [];
  const teamTasks: ITask[] = [];

  // fetch projects
  const response = await projectsAPI.getProjectsByTeam(teamId);
  const projects: IProject[] = response.data.projects;

  // push all temaTaskId(except my task) to the teamTasksIds array
  projects.forEach((project) =>
    project.stages.forEach((stage) =>
      stage.taskAssignments.forEach((task) => {
        if (typeof task.taskId === "string") {
          // filter my task base on the user.id and id below must be cahnge in the future
          if (task.assigneeId !== "69df5fc47621324e98a37b52")
            teamTasksIds.push(task.taskId);
        }
      }),
    ),
  );

  //   fetch task base on the taskId
  for (const taskId of teamTasksIds) {
    const response = await tasksAPI.getTaskById(taskId);
    const task = response.data.task;
    teamTasks.unshift(task);
  }

  if (projects.length === 0) {
    return (
      <div className="text-center text-primary">
        هنوز وظیفه ای برای اعضای تیم شما تعریف نشده است...
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {teamTasks.map((task) => (
        <TaskCard task={task} key={task._id} role={role} />
      ))}
    </ul>
  );
}

export default TeamTaskList;
