import { vazirMedium } from "@/app/fonts";
import CreateTaskForm from "@/components/CreateTaskForm";
import { IProject } from "@/interfaces/projectInterfaces";
import { IUser } from "@/interfaces/userInterfaces";
import { getTeam, getUser, projectsAPI } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  let manager;
  if (user?.id) {
    manager = await getUser(user?.id);
  }

  const response = await projectsAPI.getProjectsByTeam(user?.teamId as string);
  const projects: IProject[] = response.data.projects;

  const team = await getTeam(user?.teamId as string);

  return (
    <div className="space-y-6">
      <h2 className={`${vazirMedium.className} text-2xl text-center`}>
        ساخت وظیفه جدید
      </h2>

      <CreateTaskForm
        projects={projects}
        team={team}
        manager={manager as IUser}
      />
    </div>
  );
}

export default page;
