import { ITask } from "@/interfaces/tasksInterfaces";
import { tasksApi } from "@/lib/api";
import TaskCard from "./TaskCard";

async function MyTasksList() {
  const response = await tasksApi.getAllMyTasks("69df5fc47621324e98a37b52");
  const myTasks: ITask[] = response.data.data.tasks;

  return (
    <ul className="space-y-4">
      {myTasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </ul>
  );
}

export default MyTasksList;
