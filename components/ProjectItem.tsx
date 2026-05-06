import { IProject } from "@/interfaces/projectInterfaces";
import { Eye } from "lucide-react";
import Link from "next/link";
import DeleteProjectModal from "./DeleteProjectModal";

function ProjectItem({ project }: { project: IProject }) {
  return (
    <li
      key={project._id}
      className="card py-3 px-2 sm:px-4 sm:card-side  justify-center items-center bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="card-body max-w-full flex flex-col justify-center p-2">
        {/* Title */}
        <h2 className="card-title text-lg mb-2 text-primary/">
          {project.name}
        </h2>

        {/* description */}
        <p className="text-base-content/70 text-sm leading-relaxed mb-4 truncate w-full">
          {project.description}
        </p>
      </div>

      {/* detail link */}
      <div className="flex gap-2">
        <Link
          href={`/projects/${project._id}`}
          className="btn btn-primary btn-sm"
        >
          <Eye size={16} />
          مشاهده
        </Link>

        {/* MODAL SECTIONS */}

        <DeleteProjectModal projectId={project._id?.toString() || ""} />
      </div>
    </li>
  );
}

export default ProjectItem;
