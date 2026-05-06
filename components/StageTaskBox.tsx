import { ITaskAssignment } from "@/interfaces/projectInterfaces";

function StageTaskBox({ task }: { task: ITaskAssignment }) {
  return (
    <div className="card gap-2 md:gap-0 md:card-side p-2 justify-between border text-white bg-purple-400 border-base-300 shadow-2xl">
      <h5>{task.taskTitle}</h5>
      <p className="text-primary">{task.assigneeName}</p>
    </div>
  );
}

export default StageTaskBox;
