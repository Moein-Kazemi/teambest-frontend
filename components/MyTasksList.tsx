import { ITask } from "@/interfaces/tasksInterfaces";
import { tasksAPI } from "@/lib/api";
import TaskCard from "./TaskCard";

async function MyTasksList() {
  const response = await tasksAPI.getAllMyTasks("69df5fc47621324e98a37b52");
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
        <TaskCard task={task} key={task._id} />
      ))}
    </ul>
  );
}

export default MyTasksList;
