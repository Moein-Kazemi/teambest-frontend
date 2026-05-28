import { Briefcase, Phone, User } from "lucide-react";

import Image from "next/image";
import ProfileInfoBox from "@/components/ProfileInfoBox";
import { IUser } from "@/interfaces/userInterfaces";

interface ProfileCardProps {
  user: IUser;
}
function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-base-200 rounded-3xl  p-4 md:p-8 border border-base-300 shadow-inner">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* AVATAR */}
        <div className="relative">
          <div className="avatar">
            <div className="w-28 relative md:h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-xl">
              {user.avatar === "" ? (
                ""
              ) : (
                <Image src={`/avatar/${user?.avatar}`} fill alt="user avatar" />
              )}
            </div>
          </div>

          <div className="absolute max-w-10 bottom-2 right-2 badge badge-success gap-1 px-3 py-3 shadow-md">
            آنلاین
          </div>
        </div>

        {/* USER INFO */}
        <div className="flex-1 w-full">
          <div className="mb-6 text-center lg:text-right">
            <h1 className="text-2xl md:text-3xl font-black text-base-content mb-2">
              {user?.name} {user?.family}
            </h1>

            <p className="text-lg text-primary font-semibold">
              {user.jobTitle || "عنوان شغلی وارد نشده"}
            </p>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NAME */}
            <ProfileInfoBox
              icon={<User />}
              iconColor="primary"
              lable="نام و نام خانوادگی"
              value={`${user?.name} ${user?.family}`}
            />

            {/* JOB */}
            <ProfileInfoBox
              icon={<Briefcase />}
              iconColor="secondary"
              lable="عنوان شغلی"
              value={user?.jobTitle || "عنوان شغلی وارد نشده"}
            />

            {/* PHONE */}
            <ProfileInfoBox
              icon={<Phone />}
              iconColor="accent"
              lable="شماره تماس"
              value={user?.phone || "شماره تماس وارد نشده"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
