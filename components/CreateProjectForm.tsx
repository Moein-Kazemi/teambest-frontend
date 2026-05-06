"use client";

import { vazirMedium } from "@/app/fonts";
import { createProject } from "@/lib/projectActions";
import { useState } from "react";

// TYPE CHEKING
import { IStage, ITaskAssignment } from "@/interfaces/projectInterfaces";

// ==================== Component ====================
export default function CreateProjectForm() {
  const [stages, setStages] = useState<IStage[]>([
    {
      name: "",
      order: 1,
      taskAssignments: [{ taskTitle: "", assigneeId: "", assigneeName: "" }],
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // ADD HIDDEN IDS TO FORM
  const ids = {
    teamId: "69df5fc47621324e98a37b93",
    ownerId: "69df5fc47621324e98a37b37",
  };
  const createProjectWithIds = createProject.bind(null, ids);

  // اضافه کردن Stage جدید
  const addStage = () => {
    setStages([
      ...stages,
      {
        name: "",
        order: stages.length,
        taskAssignments: [{ taskTitle: "", assigneeId: "", assigneeName: "" }],
      },
    ]);
  };

  // حذف Stage
  const removeStage = (stageIndex: number) => {
    setStages(
      stages
        .filter((_, i) => i !== stageIndex)
        .map((s, i) => ({ ...s, order: i + 1 })),
    );
  };

  // آپدیت Stage
  const updateStage = (
    stageIndex: number,
    field: keyof IStage,
    value: string | number,
  ) => {
    setStages(
      stages.map((stage, i) =>
        i === stageIndex ? { ...stage, [field]: value } : stage,
      ),
    );
  };

  // اضافه کردن Task به Stage
  const addTask = (stageIndex: number) => {
    setStages(
      stages.map((stage, i) =>
        i === stageIndex
          ? {
              ...stage,
              taskAssignments: [
                ...stage.taskAssignments,
                { taskTitle: "", assigneeId: "", assigneeName: "" },
              ],
            }
          : stage,
      ),
    );
  };

  // حذف Task از Stage
  const removeTask = (stageIndex: number, taskIndex: number) => {
    setStages(
      stages.map((stage, i) =>
        i === stageIndex
          ? {
              ...stage,
              taskAssignments: stage.taskAssignments.filter(
                (_, ti) => ti !== taskIndex,
              ),
            }
          : stage,
      ),
    );
  };

  // آپدیت Task
  const updateTask = (
    stageIndex: number,
    taskIndex: number,
    field: keyof ITaskAssignment,
    value: string,
  ) => {
    setStages(
      stages.map((stage, si) =>
        si === stageIndex
          ? {
              ...stage,
              taskAssignments: stage.taskAssignments.map((task, ti) =>
                ti === taskIndex ? { ...task, [field]: value } : task,
              ),
            }
          : stage,
      ),
    );
  };

  // ارسال فرم
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    formData.set("stages", JSON.stringify(stages));

    await createProjectWithIds(formData);

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 card rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.25)]  bg-base-100 border-t border-t-gray-700/20   max-w-4xl mx-auto py-4 px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* name of the project */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
          <label className="label">
            <span className="label-text text-black">
              نام پروژه <span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="input border border-primary/20 outline-primary"
            placeholder="نام پروژه را وارد کنید"
          />
        </div>
        {/* project description */}
        <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
          <label className="label">
            <span className="label-text text-black">توضیحات</span>
          </label>
          <textarea
            name="description"
            className="textarea border resize-none border-primary/20 outline-primary"
            rows={3}
            placeholder="توضیحات پروژه..."
          />
        </div>
      </div>

      {/* Stages */}
      <div className={`divider ${vazirMedium.className} text-lg`}>مرحله‌ها</div>

      {/* for any stage in the stage create one form */}
      {stages.map((stage, stageIndex) => (
        <div key={stageIndex} className="card bg-base-200 p-4">
          {/* stage number and delete btn */}
          <div className="flex items-center justify-between mb-4">
            <h3 className={`${vazirMedium.className} text-lg`}>
              مرحله {stageIndex + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeStage(stageIndex)}
              className="btn btn-error btn-sm rounded-xl"
              disabled={stages.length === 1}
            >
              حذف مرحله
            </button>
          </div>

          {/* stage Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* name of the stage */}
            <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
              <label className="label">
                <span className="label-text text-black ">
                  نام مرحله <span className="text-red-700">*</span>
                </span>
              </label>
              <input
                type="text"
                value={stage.name}
                onChange={(e) =>
                  updateStage(stageIndex, "name", e.target.value)
                }
                className="input border border-primary/20 outline-primary input-sm"
                placeholder="مثال : ساخت بنر تبلیغاتی..."
                required
              />
            </div>

            {/* order */}
            <div className="form-control flex gap-2 flex-col md:col-span-1 md:flex-row md:items-center">
              <label className="label">
                <span className="label-text text-black">ترتیب</span>
              </label>
              <input
                type="number"
                value={stage.order}
                onChange={(e) =>
                  updateStage(stageIndex, "order", parseInt(e.target.value))
                }
                className="input border border-primary/20 outline-primary input-sm"
                min="1"
              />
            </div>
          </div>

          {/* Task Assignments */}
          <div className="ml-4 border-l-2 border-primary pl-4">
            {/* task section and add task button */}
            <div className="flex items-center justify-between mb-2">
              <span className={`${vazirMedium.className} text-md `}>وظایف</span>
              <button
                type="button"
                onClick={() => addTask(stageIndex)}
                className="btn btn-primary rounded-xl btn-xs"
              >
                + افزودن وظیفه
              </button>
            </div>

            {/* for each task create some form elements */}
            {stage.taskAssignments.map((task, taskIndex) => (
              <div key={taskIndex} className="bg-base-100 p-3 rounded-lg mb-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* task name */}
                  <div className="form-control">
                    <input
                      type="text"
                      value={task.taskTitle}
                      onChange={(e) =>
                        updateTask(
                          stageIndex,
                          taskIndex,
                          "taskTitle",
                          e.target.value,
                        )
                      }
                      className="input border border-primary/20 outline-primary input-sm"
                      placeholder="عنوان وظیفه"
                    />
                  </div>
                  {/* assingeId */}
                  <div className="form-control">
                    <input
                      type="text"
                      value={task.assigneeId}
                      onChange={(e) =>
                        updateTask(
                          stageIndex,
                          taskIndex,
                          "assigneeId",
                          e.target.value,
                        )
                      }
                      className="input border border-primary/20 outline-primary input-sm"
                      placeholder="شناسه مسئول"
                    />
                  </div>

                  {/* assigne name  */}
                  <div className="form-control space-y-4 space-x-2 flex-col  items-center">
                    <input
                      type="text"
                      value={task.assigneeName}
                      name="assigneeName"
                      onChange={(e) =>
                        updateTask(
                          stageIndex,
                          taskIndex,
                          "assigneeName",
                          e.target.value,
                        )
                      }
                      className="input border border-primary/20 outline-primary input-sm flex-1 inline-block"
                      placeholder="نام مسئول"
                    />
                    <button
                      type="button"
                      onClick={() => removeTask(stageIndex, taskIndex)}
                      className="btn rounded-xl w-full lg:w-auto btn-error btn-xs flex items-center justify-center"
                      disabled={stage.taskAssignments.length === 1}
                    >
                      حذف وظیفه
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* دکمه افزودن Stage */}
      <button
        type="button"
        onClick={addStage}
        className="btn btn-outline btn-primary rounded-xl w-full"
      >
        + افزودن مرحله جدید
      </button>

      {/* پیام‌ها و دکمه ارسال */}
      {message && (
        <div
          className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}
        >
          <span>{message.text}</span>
        </div>
      )}

      <div className="form-control mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-success w-full rounded-xl ${isSubmitting ? "loading" : ""}`}
        >
          {isSubmitting ? "در حال ارسال..." : "ایجاد پروژه"}
        </button>
      </div>
    </form>
  );
}
