import DateTimeBox from "@/components/DateTimeBox";
import UserInfo from "@/components/UserInfo";
import UserStatus from "@/components/UserStatus";

const userProfile = {
  name: "معین کاظمی",
  role: "توسعه‌دهنده فرانت‌اند",
  team: "دیجیتال مارکتینگ دیوید جونز",
  avatar: "./../../../../public/images/moein.JPG",
  teamMembers: 12,
  activeProjects: 5,
  pendingTasks: 8,
};

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

function Page() {
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
