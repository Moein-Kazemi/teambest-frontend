import { ProjectFormData } from "@/validation/projectValidationSchema";
import { UseFormRegister } from "react-hook-form";

interface TaskFieldsProps {
  stageIndex: number;
  taskIndex: number;
  register: UseFormRegister<ProjectFormData>;
  errors: any;
  canDelete: boolean;
  onDelete: () => void;
}

export default function TaskFields({
  stageIndex,
  taskIndex,
  register,
  errors,
  canDelete,
  onDelete,
}: TaskFieldsProps) {
  return (
    <div className="bg-base-100 p-3 rounded-lg mb-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 space-y-5">
        {/* task name */}
        <div className="form-control relative ">
          <input
            type="text"
            {...register(
              `stages.${stageIndex}.taskAssignments.${taskIndex}.taskTitle`,
            )}
            className={`input border border-primary/20 outline-primary input-sm ${errors?.taskTitle ? "input-error" : ""}`}
            placeholder="عنوان وظیفه"
          />
          {errors?.taskTitle && (
            <span className="text-error text-xs mt-1 inline-block absolute -bottom-5  right-0 md:bottom-0  ">
              {errors.taskTitle.message}
            </span>
          )}
        </div>
        {/* assigen id */}
        <div className="form-control relative">
          <input
            type="text"
            {...register(
              `stages.${stageIndex}.taskAssignments.${taskIndex}.assigneeId`,
            )}
            className={`input border border-primary/20 outline-primary input-sm ${errors?.assigneeId ? "input-error" : ""}`}
            placeholder="شناسه مسئول"
          />
          {errors?.assigneeId && (
            <span className="text-error text-xs mt-1 inline-block absolute -bottom-5  right-0 md:bottom-0">
              {errors.assigneeId.message}
            </span>
          )}
        </div>

        {/* assignee name */}
        <div className="form-control space-y-4 space-x-2 flex-col  items-center">
          <input
            type="text"
            {...register(
              `stages.${stageIndex}.taskAssignments.${taskIndex}.assigneeName`,
            )}
            className={`input border border-primary/20 outline-primary input-sm flex-1 inline-block ${errors?.assigneeName ? "input-error" : ""}`}
            placeholder="نام مسئول"
          />
          <button
            type="button"
            onClick={onDelete}
            className="btn rounded-xl w-full lg:w-auto btn-error btn-xs flex items-center justify-center"
            disabled={!canDelete}
          >
            حذف وظیفه
          </button>
        </div>
      </div>
    </div>
  );
}
