import { ITask } from "@/interfaces/tasksInterfaces";
import { tasksAPI } from "@/lib/api";
import TaskCard from "./TaskCard";

interface MyTasksListProps {
  id: string;
  role:string
}

async function MyTasksList({ id , role}: MyTasksListProps) {
  const response = await tasksAPI.getAllMyTasks(id);
  const myTasks: ITask[] = response.data.tasks;

  if (myTasks.length === 0) {
    return (
      <div className="center text-primary">
        هنوز وظیفه ای برای شما تعریف نشده است...
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {myTasks.map((task) => (
        <TaskCard task={task} key={task._id} role={role} />
      ))}
    </ul>
  );
}

export default MyTasksList;
