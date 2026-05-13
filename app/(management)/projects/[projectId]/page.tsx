import { vazirMedium } from "@/app/fonts";
import { IProject } from "@/interfaces/projectInterfaces";
import { projectsAPI } from "@/lib/api";

// COMPONENTS
import StagesList from "@/components/StagesList";
import BackButtonServer from "@/components/BackButtonServer";

async function Page({ params }: { params: { projectId: string } }) {
  const res = await projectsAPI.getById(params.projectId);
  const project: IProject = res.data.project;

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col gap-4 items-start">
        <BackButtonServer path="/projects" />
        <h2 className={`text-[26px] ${vazirMedium.className} text-center`}>
          {project.name}
        </h2>
      </div>
      <p>{project.description}</p>
      <div className="card px-2 py-4 bg-base-100 shadow-xl border border-base-300">
        <h3 className="card-title ">مراحل</h3>
        <div className="divider divide-gray-400 my-0"></div>
        <StagesList stages={project.stages} />
      </div>
    </div>
  );
}

export default Page;
