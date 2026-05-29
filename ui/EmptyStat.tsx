import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface EmptyStatProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  role: string;
  createLink: string;
}

function EmptyStat({
  icon,
  title,
  description,
  role,
  createLink,
}: EmptyStatProps) {
  return (
    <div className="container  mx-auto py-6 md:py-12 px-4">
      <div className="max-w-2xl border-t-gray-700/20 rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.25)] mx-auto">
        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body items-center text-center py-14">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              {icon}
            </div>

            <h1 className="text-xl md:text-3xl font-bold mb-3">{title}</h1>

            <p className="text-base-content/70 leading-8 max-w-md">
              {description}
            </p>

            {role === "manager" && (
              <div className="mt-8">
                <Link href={createLink} className="btn btn-primary gap-2">
                  <PlusCircle size={20} />
                  ایجاد
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyStat;
