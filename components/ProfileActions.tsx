import { CheckCircle, Pencil } from "lucide-react";
import Link from "next/link";
interface ProfileActionsProps {
  role: string;
}

function ProfileActions({ role }: ProfileActionsProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
      {role === "user" && (
        <Link
          href="/profile/complete"
          className="btn btn-primary  rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          <CheckCircle size={20} />
          تکمیل ثبت نام
        </Link>
      )}

      <Link
        href="/profile/update"
        className="btn btn-outline btn-secondary rounded-2xl hover:scale-105 transition-all duration-300"
      >
        <Pencil size={20} />
        آپدیت پروفایل
      </Link>
    </div>
  );
}

export default ProfileActions;
