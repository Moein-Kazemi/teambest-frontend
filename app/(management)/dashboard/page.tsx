import DateTimeBox from "@/components/DateTimeBox";
import StepProgressBar from "@/components/StepProgressBar";
import UserInfo from "@/components/UserInfo";
import UserStatus from "@/components/UserStatus";
import WelcomeBox from "@/components/WelcomeBox";
import { getTeam, getUser } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { IUser } from "@/interfaces/userInterfaces";
import { ITeam } from "@/interfaces/teamInterfaces";

/*
position: relative;
        display: flex;
        flex-direction: column;
        border-radius: var(--radius-box) /* var(--radius-box) ;
        outline-width: 2px;
        transition: outline 0.2s ease-in-out;
        outline: 0 solid #0000;
        outline-offset: 2px;
*/

async function Page() {
  //  GET CURRENT USER
  const session = await getServerSession(authOptions);
  const user = session?.user;
  let fetchedUser: IUser | null = null;
  let team: ITeam | null = null;
  if (user?.id) {
    fetchedUser = await getUser(user.id);
  }
  if (user?.teamId) {
    team = await getTeam(user.teamId);
  }

  if (user?.teamId === null || user?.teamId === "") {
    return (
      <>
        <WelcomeBox name={user?.name as string} role={user?.role as string} />
        <StepProgressBar role={user.role as string} />
        <div className="flex justify-center">
          <Link
            href="/profile"
            className="btn  btn-outline btn-warning max-w-80 w-full"
          >
            حساب کاربری
          </Link>
        </div>
      </>
    );
  }

  if (user?.teamId && user.teamId !== "" && fetchedUser && team) {
    return (
      <div className="grid grid-cols-12 gap-2">
        <UserInfo fetchedUser={fetchedUser} team={team} />
        <DateTimeBox />

        {/* divider line*/}
        <div className="divider w-full"></div>
        <UserStatus fetchedUser={fetchedUser} team={team} />
      </div>
    );
  }
}

export default Page;
