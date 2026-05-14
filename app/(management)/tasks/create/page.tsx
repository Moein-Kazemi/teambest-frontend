import { vazirMedium } from "@/app/fonts";
import CreateTaskForm from "@/components/CreateTaskForm";
import { IProject } from "@/interfaces/projectInterfaces";
import { projectsAPI } from "@/lib/api";

async function page() {
  const response = await projectsAPI.getProjectsByTeam(
    "69df5fc47621324e98a37b93",
  );
  const projects: IProject[] = response.data.projects;

  return (
    <div className="space-y-6">
      <h2 className={`${vazirMedium.className} text-2xl text-center`}>
        ساخت وظیفه جدید
      </h2>

      <CreateTaskForm projects={projects} />
    </div>
  );
}

export default page;
