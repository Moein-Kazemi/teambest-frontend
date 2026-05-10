import { ITask } from "@/interfaces/tasksInterfaces";
import { tasksApi } from "@/lib/api";

async function MyTasksList() {
  const response = await tasksApi.getAllMyTasks("69df5fc47621324e98a37b52");
  const myTasks: ITask[] = response.data.data.tasks;
  return (
    <ul>
      {myTasks.map((task) => (
        <div key={task._id}>{task.title}</div>
      ))}
    </ul>
  );
}

export default MyTasksList;
