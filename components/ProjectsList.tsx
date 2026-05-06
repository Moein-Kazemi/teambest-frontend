import { IProject } from "@/interfaces/projectInterfaces";
import { projectsAPI } from "@/lib/api";

import ProjectItem from "./ProjectItem";
import Link from "next/link";

async function ProjectsList() {
  // the teamId must be cahnged in the future base on the User.teamId
  const response = await projectsAPI.getAll("69df5fc47621324e98a37b93");
  const projects: IProject[] = response.data.data.projects;

  // IF THE PROJECT DOES NOT EXIST YET.
  if (projects.length === 0)
    return (
      <div className="text-center space-y-4">
        <h5 className="text-xl">پروژه ای یافت نشد</h5>
        <Link href="/project/create" className="text-primary">
          ایجاد پروژه +
        </Link>
      </div>
    );

  return (
    <>
      <ul className="space-y-4">
        {projects.map((project) => {
          return <ProjectItem key={project._id} project={project} />;
        })}
      </ul>
      <Link
        href="/projects/create"
        className="text-xl block text-center mt-6 mb-4 text-primary"
      >
        ایجاد پروژه جدید +
      </Link>
    </>
  );
}

export default ProjectsList;
