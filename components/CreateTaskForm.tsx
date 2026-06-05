"use client";

import { IProject } from "@/interfaces/projectInterfaces";
import { ITask } from "@/interfaces/tasksInterfaces";
import { TaskFormData, taskSchema } from "@/validation/taskValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { vazirMedium } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { createTask } from "@/lib/taskActions";
import { toast } from "sonner";
import { ITeam } from "@/interfaces/teamInterfaces";

import { IUser } from "@/interfaces/userInterfaces";

interface createTaskFormProps {
  projects: IProject[];
  team: ITeam;
  manager: IUser;
}

const initialFormValue: ITask = {
  projectId: "",
  stageId: "",
  title: "",
  description: "",
  assigneeTo: {
    assigneeId: "",
    assigneeName: "",
  },
  priority: "کم",
};

function CreateTaskForm({ projects, team, manager }: createTaskFormProps) {
  console.log(team);
  const members = [
    ...team.members,
    {
      memberId: manager._id,
      memberName: `${manager.name} ${manager.family}`,
      memberAvatar: manager.avatar,
      memberJobTitle: manager.role,
    },
  ];

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  //react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: initialFormValue,
  });

  // watch projectId that choose
  const selectedProjectId = watch("projectId");

  // SELECT STAGES BASE ON THE PROJECT THAT CHOOSE
  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return projects.find(
      (project) => project._id?.toString() === selectedProjectId,
    );
  }, [selectedProjectId, projects]);

  const onSubmit = async (data: TaskFormData) => {
    setServerError(null);
    setServerSuccess(null);

    // create form data
    const formData = new FormData();
    formData.set("projectId", data.projectId);
    formData.set("stageId", data.stageId);
    formData.set("title", data.title);
    formData.set("description", data.description || "");
    formData.set("assigneeTo", JSON.stringify(data.assigneeTo));
    formData.set("priority", data.priority as string);

    const result = await createTask(formData);

    if (result?.success) {
      toast.success("وظیفه با موفقیت ایجاد شد.");
      router.replace("/tasks");
    } else {
      setServerError(result?.error || "");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 card rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.25)]  bg-base-100 border-t border-t-gray-700/20   max-w-4xl mx-auto py-4 px-6"
    >
      {/* CHOOSE A PROJECT IN THE PROJECT SECTION */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        {/* PROJECT */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row  md:items-center pb-7 md:pb-0">
          <label className="label">
            <span className="label-text text-black">
              پروژه <span className="text-red-600">*</span>
            </span>
          </label>

          <select
            className="select dropdown-bottom select-bordered w-full border border-primary/20 outline-primary relative"
            {...register("projectId")}
          >
            <option value="" className="text-gray-500">
              انتخاب پروژه
            </option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        {/* STAGE */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
          <label className="label">
            <span className="label-text text-black">
              مرحله <span className="text-red-600">*</span>
            </span>
          </label>

          <select
            className="select dropdown-bottom select-bordered w-full border border-primary/20 outline-primary relative"
            {...register("stageId")}
            disabled={!selectedProject}
          >
            <option value="" className="text-gray-500">
              ابتدا یک پروژه انتخاب کنید سپس یک مرحله
            </option>
            {selectedProject &&
              selectedProject.stages.map((stage) => (
                <option key={stage._id} value={stage._id}>
                  {stage.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className={`divider ${vazirMedium.className} text-lg`}>وظیفه</div>

      {/* TITLE AND DESCRIPTION */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        {/* TITLE */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row  md:items-center pb-7 md:pb-0">
          <label className="label">
            <span className="label-text text-black">
              نام وظیفه <span className="text-red-600">*</span>
            </span>
          </label>

          <div className="relative">
            <input
              type="text"
              required
              {...register("title")}
              className="input border border-primary/20 outline-primary relative "
              placeholder="عنوان وظیفه را وارد کنید."
            />
            {errors.title && (
              <label className="label inline-block absolute -bottom-7  right-0 ">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
          <label className="label">
            <span className="label-text text-black">توضیحات</span>
          </label>

          <div className="relative">
            <textarea
              rows={3}
              cols={50}
              required
              {...register("description")}
              className="textarea border resize-none border-primary/20 outline-primary  "
              placeholder="توضیحات وظیفه"
            />
            {errors.description && (
              <label className="label inline-block absolute -bottom-7  right-0 ">
                <span className="label-text-alt text-error">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* ASSIGNEE */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        {/* assigneeId hidden */}
        <input type="hidden" {...register("assigneeTo.assigneeId")} />

        {/* assigneeName hidden */}
        <input type="hidden" {...register("assigneeTo.assigneeName")} />

        {/* Select Box */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text text-black">
              مسئول تسک <span className="text-red-600">*</span>
            </span>
          </label>

          <div className="relative">
            <select
              className="select border border-primary/20 outline-primary w-full"
              defaultValue=""
              onChange={(e) => {
                const selectedMember = members.find(
                  (member) => member.memberId === e.target.value,
                );

                if (!selectedMember) return;

                setValue("assigneeTo.assigneeId", selectedMember.memberId, {
                  shouldValidate: true,
                });

                setValue("assigneeTo.assigneeName", selectedMember.memberName, {
                  shouldValidate: true,
                });
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

            {(errors.assigneeTo?.assigneeId ||
              errors.assigneeTo?.assigneeName) && (
              <label className="label inline-block absolute -bottom-7 right-0">
                <span className="label-text-alt text-error">
                  لطفاً یک مسئول انتخاب کنید
                </span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* PRIORITY */}

      <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
        <label className="label">
          <span className="label-text text-black">اولویت</span>
        </label>
        <select
          className="select dropdown-bottom select-bordered w-full border border-primary/20 outline-primary relative"
          {...register("priority")}
        >
          <option value="کم" selected>
            کم
          </option>
          <option value="متوسط">متوسط</option>
          <option value="زیاد">زیاد</option>
          <option value="خیلی زیاد">خیلی زیاد</option>
        </select>
      </div>

      {/* SERVER MESSAGES */}
      {serverError && (
        <div className="alert alert-error">
          <span>{serverError}</span>
        </div>
      )}
      {serverSuccess && (
        <div className="alert alert-success">
          <span>{serverSuccess}</span>
        </div>
      )}

      <div className="form-control mt-6">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`btn btn-success w-full rounded-xl p-4 `}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner text-primary w-4 h-4"></span>
          ) : (
            "ایجاد وظیفه"
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateTaskForm;
