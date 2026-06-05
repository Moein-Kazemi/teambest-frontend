import { ProjectFormData } from "@/validation/projectValidationSchema";
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import TaskFields from "./TaskFields";
import { vazirMedium } from "@/app/fonts";
import { ITeamMember } from "@/interfaces/teamInterfaces";

interface StageFieldsProps {
  stageIndex: number;
  control: Control<ProjectFormData>;
  register: UseFormRegister<ProjectFormData>;
  errors: any;
  canDelete: boolean;
  onDelete: () => void;
  members: ITeamMember[];
  setValue: UseFormSetValue<ProjectFormData>;
}

export default function StageFields({
  stageIndex,
  control,
  register,
  errors,
  canDelete,
  onDelete,
  members,
  setValue,
}: StageFieldsProps) {
  // task assignement
  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: `stages.${stageIndex}.taskAssignments`,
  });

  return (
    <div className="card bg-base-200 p-4">
      {/* STAGE NUBER AND DELETE BTN */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`${vazirMedium.className} text-lg`}>
          مرحله {stageIndex + 1}
        </h3>
        <button
          type="button"
          onClick={onDelete}
          className="btn btn-error btn-sm rounded-xl"
          disabled={!canDelete}
        >
          حذف مرحله
        </button>
      </div>
      {/* STAGE SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* name of the stage */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center pb-7 md:pb-0">
          <label className="label text-black">
            <span className="label-text">
              نام مرحله <span className="text-red-700">*</span>
            </span>
          </label>
          <div className="relative ">
            <input
              type="text"
              {...register(`stages.${stageIndex}.name`)}
              className={`input border border-primary/20 outline-primary input-sm ${errors?.name ? "input-error " : ""}`}
              placeholder="مثال : ساخت بنر تبلیغاتی..."
            />
            {errors?.name && (
              <label className="label inline-block absolute -bottom-7  right-0">
                <span className="label-text-alt text-error  ">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* order */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
          <label className="label">
            <span className="label-text text-black">ترتیب</span>
          </label>
          <input
            type="number"
            {...register(`stages.${stageIndex}.order`, { valueAsNumber: true })}
            disabled={true}
            className="input border border-primary/20 outline-primary input-sm"
            min="1"
          />
          {errors?.order && (
            <label className="label text-error inline-block absolute -bottom-7  right-0">
              <span className="label-text-alt  ">{errors.order.message}</span>
            </label>
          )}
        </div>
      </div>

      {/* Task Assignments */}
      <div className="ml-4 border-l-2 border-primary pl-4">
        {/* task section and add task button */}
        <div className="flex items-center justify-between mb-2">
          <span className={`${vazirMedium.className} text-md `}>وظایف</span>
          <button
            type="button"
            onClick={() =>
              appendTask({ taskTitle: "", assigneeId: "", assigneeName: "" })
            }
            className="btn btn-primary rounded-xl btn-xs"
          >
            + افزودن وظیفه
          </button>
        </div>

        {/* for each task create some form elements */}
        {taskFields.map((task, taskIndex) => (
          <TaskFields
            key={task.id}
            stageIndex={stageIndex}
            taskIndex={taskIndex}
            register={register}
            errors={errors?.taskAssignments?.[taskIndex]}
            canDelete={taskFields.length > 1}
            onDelete={() => removeTask(taskIndex)}
            members={members}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  );
}
