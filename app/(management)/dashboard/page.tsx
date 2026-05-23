import DateTimeBox from "@/components/DateTimeBox";
import StepProgressBar from "@/components/StepProgressBar";
import UserInfo from "@/components/UserInfo";
import UserStatus from "@/components/UserStatus";
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
  const session = await getServerSession(authOptions);
  // const { user } = session;

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
  if (!session) {
    return <div>لطفاً وارد شوید.</div>;
  }

  if (user?.role === "user") {
    return (
      <>
        <StepProgressBar currStep={2} />
        <Link href="/profile"></Link>
      </>
    );
  }

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

export default Page;
