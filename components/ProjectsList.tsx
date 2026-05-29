import { IProject } from "@/interfaces/projectInterfaces";
import { projectsAPI } from "@/lib/api";

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import EmptyStat from "@/ui/EmptyStat";
import { Rocket } from "lucide-react";

interface ProjectsListProps {
  teamId: string;
  role: string;
}

async function ProjectsList({ teamId, role }: ProjectsListProps) {
  // the teamId must be cahnged in the future base on the User.teamId
  let response;
  let projects: IProject[] = [];

  if (teamId) {
    response = await projectsAPI.getProjectsByTeam(teamId);
    projects = response?.data.projects;
  }

  // IF THE PROJECT DOES NOT EXIST YET.

  if (projects.length === 0)
    return (
      <EmptyStat
        icon={<Rocket size={40} className="text-secondary" />}
        title="هیچ پروژه ای یافت نشد"
        description="هیچ پروژه ای ایجاد نشده ابتدا باید مدیر پروژه ای ایجاد کند."
        role={role}
        createLink="/projects/create"
      />
    );

  return (
    <>
      <ul className="space-y-4">
        {projects.map((project) => {
          return <ProjectCard key={project._id} project={project} />;
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
