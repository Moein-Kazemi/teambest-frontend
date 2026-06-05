import { Users } from "lucide-react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import EmptyStat from "@/ui/EmptyStat";
import TeamInfoCard from "@/ui/TeamInfoCard";
import { getTeam } from "@/lib/api";
// import { teamAPI } from "@/lib/apis/team.api";

export const revalidate = 0; // revalidate at most

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  let team;
  if (user?.teamId !== null) {
    team = await getTeam(user?.teamId as string);
  }
  const role = session?.user?.role;

  // IF TEH TEAMID IS NOT CREATE
  if (!team || user?.id === null) {
    return (
      <EmptyStat
        icon={<Users size={40} className="text-primary" />}
        title="شما هنوز تیمی ندارید"
        description="شما هنوز هیچ تیمی ایجاد نکرده اید یا عضو هیچ تیمی نیستید."
        role={user?.role as string}
        createLink="/team/create"
      />
    );
  } else {
    return <TeamInfoCard team={team} role={role as string} />;
  }
}
