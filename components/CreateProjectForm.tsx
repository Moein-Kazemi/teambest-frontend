"use client";

import { vazirMedium } from "@/app/fonts";
import { createProject } from "@/lib/projectActions";
import { useState } from "react";

// VALIDATIONS
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectFormData,
  projectSchema,
} from "@/validation/projectValidationSchema";
import StageFields from "./StageFields";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const initialFormValue = {
  name: "",
  description: "",
  stages: [
    {
      name: "",
      order: 1,
      taskAssignments: [{ taskTitle: "", assigneeId: "", assigneeName: "" }],
    },
  ],
};

// ==================== Component ====================
export default function CreateProjectForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  // CONNECT REACT-HOOK-FORM TO ZOD AND CALL SOME METHODS FROM USEFORM.
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
    // reValidateMode: "onChange",
    defaultValues: initialFormValue,
  });

  // CONTROL NESTED ARRAY
  const {
    fields: stageFields,
    append: appendStage,
    remove: removeStage,
  } = useFieldArray({
    control,
    name: "stages",
  });

  // ADD HIDDEN IDS TO FORM
  const ids = {
    teamId: "69df5fc47621324e98a37b93",
    ownerId: "69df5fc47621324e98a37b37",
  };
  const createProjectWithIds = createProject.bind(null, ids);

  const onSubmit = async (data: ProjectFormData) => {
    setServerError(null);
    setServerSuccess(null);

    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("description", data.description || "");

    formData.set("stages", JSON.stringify(data.stages));

    const result = await createProjectWithIds(formData);

    if (!result?.success) {
      // if the project cant be create in the db
      setServerError(result?.error || "خطای ناشناخته");
      // setServerError(result.error || "");
    } else if (result?.success) {
      toast.success("پروژه با موفقیت ایجاد شد.");
      router.replace("/projects");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 card rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.25)]  bg-base-100 border-t border-t-gray-700/20   max-w-4xl mx-auto py-4 px-6"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        {/* name of the project */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row  md:items-center pb-7 md:pb-0">
          <label className="label">
            <span className="label-text text-black">
              نام پروژه <span className="text-red-600">*</span>
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              autoFocus
              {...register("name")}
              className="input border border-primary/20 outline-primary relative "
              placeholder="نام پروژه را وارد کنید"
            />
            {errors.name && (
              <label className="label inline-block absolute -bottom-7  right-0 ">
                <span className="label-text-alt text-error">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* project description */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
          <label className="label">
            <span className="label-text text-black">توضیحات</span>
          </label>

          <div className="relative">
            <textarea
              {...register("description")}
              className="textarea border resize-none border-primary/20 outline-primary "
              rows={3}
              cols={50}
              placeholder="توضیحات پروژه..."
            />
            {errors.description && (
              <label className="label ">
                <span className="label-text-alt text-error inline-block absolute -bottom-7  right-0 ">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Stages */}
      <div className={`divider ${vazirMedium.className} text-lg`}>مرحله‌ها</div>

      {/* ERROR OF ROOT STAGES */}
      {errors.stages?.root && (
        <div className="alert alert-error">
          <span>{errors.stages.root.message}</span>
        </div>
      )}

      {stageFields.map((stage, stageIndex) => (
        <StageFields
          key={stage.id}
          stageIndex={stageIndex}
          control={control}
          register={register}
          errors={errors.stages?.[stageIndex]}
          canDelete={stageFields.length > 1}
          onDelete={() => removeStage(stageIndex)}
        />
      ))}

      {/* ADD STAGE */}
      <button
        type="button"
        onClick={() =>
          appendStage({
            name: "",
            order: stageFields.length + 1,
            taskAssignments: [
              { taskTitle: "", assigneeId: "", assigneeName: "" },
            ],
          })
        }
        className="btn btn-outline btn-primary rounded-xl w-full"
      >
        + افزودن مرحله جدید
      </button>

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
            "ایجاد پروژه"
          )}
        </button>
      </div>
    </form>
  );
}
