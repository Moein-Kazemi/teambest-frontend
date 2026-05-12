"use client";
import { vazirBold } from "@/app/fonts";

import { deleteProject } from "@/lib/projectActions";
import { Trash } from "lucide-react";
import { useRef } from "react";

export default function DeleteProjectModal({
  projectId,
}: {
  projectId: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // باز کردن مودال
  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  // بستن مودال
  const closeModal = () => {
    // setIsOpen(false);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  // هندلر تایید حذف
  const handleConfirmDelete = async () => {
    await deleteProject(projectId);
    closeModal();
  };

  // هندلر لغو حذف
  const handleCancelDelete = () => {
    closeModal();
  };

  return (
    <>
      <button className="btn btn-error btn-sm" onClick={openModal}>
        <Trash size={15} />
        حذف
      </button>

      {/* DELETE Modal */}
      <dialog
        ref={dialogRef}
        id="delete_project_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className={`text-lg  text-center ${vazirBold.className}`}>
            تایید حذف
          </h3>
          <p className="py-4 text-center">
            آیا مطمئن هستید میخواهید این پروژه را حذف کنید ؟
          </p>

          <div className="modal-action">
            <form method="dialog" className="flex gap-2 justify-center w-full">
              {/* CANCELE */}
              <button
                className="btn btn-ghost flex-1"
                onClick={handleCancelDelete}
              >
                خیر
              </button>

              {/* DELETE */}
              <button
                className="btn btn-error flex-1"
                onClick={handleConfirmDelete}
              >
                بله
              </button>
            </form>
          </div>
        </div>

        {/* CLOSE WHEN CLICK ON THE BACKDROP */}
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={closeModal}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
}
