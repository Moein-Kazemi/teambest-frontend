import { vazirMedium } from "@/app/fonts";
import CreateProjectForm from "@/components/CreateProjectForm";
import { ITeam } from "@/interfaces/teamInterfaces";
import { getTeam } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function Page() {
  let team;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.teamId) {
    team = await getTeam(user?.teamId);
  }

  return (
    <div className="space-y-6">
      <h2 className={`${vazirMedium.className} text-2xl text-center`}>
        ساختن پروژه جدید
      </h2>
      {/* <CreateProjectForm /> */}
      <CreateProjectForm
        teamId={user?.teamId as string}
        ownerId={user?.id as string}
        team={team as ITeam}
      />
    </div>
  );
}

export default Page;
