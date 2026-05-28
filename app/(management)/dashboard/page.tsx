import DateTimeBox from "@/components/DateTimeBox";
import StepProgressBar from "@/components/StepProgressBar";
import UserInfo from "@/components/UserInfo";
import UserStatus from "@/components/UserStatus";
import WelcomeBox from "@/components/WelcomeBox";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

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

  const userProfile = {
    name: user?.name,
    jobTitle: user?.jobTitle,
    team: user?.teamId,
    avatar: "./../../../../public/images/moein.JPG",
    teamMembers: 12,
    activeProjects: 5,
    pendingTasks: 8,
  };

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

  if (user?.teamId && user.teamId !== "") {
    return (
      <div className="grid grid-cols-12 gap-2">
        <UserInfo userProfile={userProfile} />
        <DateTimeBox />

        {/* divider line*/}
        <div className="divider w-full"></div>
        <UserStatus userProfile={userProfile} />
      </div>
    );
  }
}

export default Page;
