import { ITeamMember } from "@/interfaces/teamInterfaces";
import { ProjectFormData } from "@/validation/projectValidationSchema";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface TaskFieldsProps {
  stageIndex: number;
  taskIndex: number;
  register: UseFormRegister<ProjectFormData>;
  errors: any;
  canDelete: boolean;
  onDelete: () => void;
  members: ITeamMember[];
  setValue: UseFormSetValue<ProjectFormData>;
}

export default function TaskFields({
  stageIndex,
  taskIndex,
  register,
  errors,
  canDelete,
  onDelete,
  members,
  setValue,
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

        {/* assignee id hidden */}
        <input
          type="hidden"
          {...register(
            `stages.${stageIndex}.taskAssignments.${taskIndex}.assigneeId`,
          )}
        />

        {/* assignee select */}
        <div className="form-control space-y-4 space-x-2 flex-col items-center">
          <select
            className={`select select-sm border border-primary/20 outline-primary w-full ${
              errors?.assigneeName ? "select-error" : ""
            }`}
            defaultValue=""
            onChange={(e) => {
              const selectedMember = members.find(
                (member) => member.memberId === e.target.value,
              );

              if (!selectedMember) return;

              setValue(
                `stages.${stageIndex}.taskAssignments.${taskIndex}.assigneeId`,
                selectedMember.memberId,
                { shouldValidate: true },
              );

              setValue(
                `stages.${stageIndex}.taskAssignments.${taskIndex}.assigneeName`,
                selectedMember.memberName,
                { shouldValidate: true },
              );
            }}
          >
            <option value="" disabled>
              انتخاب مسئول
            </option>

            {members.map((member) => (
              <option key={member.memberId} value={member.memberId}>
                {member.memberName}
              </option>
            ))}
          </select>

          {/* assigneeName hidden */}
          <input
            type="hidden"
            {...register(
              `stages.${stageIndex}.taskAssignments.${taskIndex}.assigneeName`,
            )}
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

// {/* assigen id */}
//     <div className="form-control relative">
//       <input
//         type="text"
//         {...register(
//           `stages.${stageIndex}.taskAssignments.${taskIndex}.assigneeId`,
//         )}
//         className={`input border border-primary/20 outline-primary input-sm ${errors?.assigneeId ? "input-error" : ""}`}
//         placeholder="شناسه مسئول"
//       />
//       {errors?.assigneeId && (
//         <span className="text-error text-xs mt-1 inline-block absolute -bottom-5  right-0 md:bottom-0">
//           {errors.assigneeId.message}
//         </span>
//       )}
//     </div>

//     {/* assignee name */}
//     <div className="form-control space-y-4 space-x-2 flex-col  items-center">
//       <input
//         type="text"
//         {...register(
//           `stages.${stageIndex}.taskAssignments.${taskIndex}.assigneeName`,
//         )}
//         className={`input border border-primary/20 outline-primary input-sm flex-1 inline-block ${errors?.assigneeName ? "input-error" : ""}`}
//         placeholder="نام مسئول"
//       />
//       <button
//         type="button"
//         onClick={onDelete}
//         className="btn rounded-xl w-full lg:w-auto btn-error btn-xs flex items-center justify-center"
//         disabled={!canDelete}
//       >
//         حذف وظیفه
//       </button>
//     </div>
