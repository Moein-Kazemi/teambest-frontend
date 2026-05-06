import { Users } from "lucide-react";
import Image from "next/image";
import moeinImage from "@/public/images/moein.jpg";

interface UserInfoProp {
  userProfile: {
    name: string;
    role: string;
    team: string;
    avatar: string;
    teamMembers: number;
    activeProjects: number;
    pendingTasks: number;
  };
}

function UserInfo({ userProfile }: UserInfoProp) {
  return (
    <div className="card w-full max-w-full bg-base-100 shadow-xl col-span-12 md:col-span-6">
      <div className="card-body items-center text-center  ">
        {/* بخش ۱: آواتار و اطلاعات کاربر */}
        <div className="flex flex-col items-center w-full">
          {/* آواتار */}
          <div className="avatar mb-2">
            <div className="w-24 relative rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image src={moeinImage} fill alt={userProfile.name} />
            </div>
          </div>

          {/* نام کاربر */}
          <h2 className="card-title text-2xl text-black">{userProfile.name}</h2>

          {/* نقش کاربر */}
          <p className="text-base-content/70 font-medium">{userProfile.role}</p>

          {/* نام تیم */}
          <div className="badge badge-outline badge-primary gap-2 mt-1">
            <Users className="w-4 h-4" />
            {userProfile.team}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
