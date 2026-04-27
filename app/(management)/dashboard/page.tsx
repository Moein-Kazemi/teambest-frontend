import { Users, FolderKanban, CheckSquare } from "lucide-react";
import Image from "next/image";
import moeinImage from "@/public/images/moein.jpg";
import DateTimeBox from "@/components/DateTimeBox";

const userProfile = {
  name: "معین کاظمی",
  role: "توسعه‌دهنده فرانت‌اند",
  team: "دیجیتال مارکتینگ دیوید جونز",
  avatar: "./../../../../public/images/moein.JPG",
  teamMembers: 12,
  activeProjects: 5,
  pendingTasks: 8,
};

function Page() {
  return (
    <div>
      {/* کارت اصلی پروفایل */}
      <div className="card w-full max-w-full bg-base-100 shadow-xl">
        <div className="card-body items-center text-center space-y-4">
          {/* بخش ۱: آواتار و اطلاعات کاربر */}
          <div className="flex flex-col items-center w-full">
            {/* آواتار */}
            <div className="avatar mb-2">
              <div className="w-24 relative rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Image src={moeinImage} fill alt={userProfile.name} />
              </div>
            </div>

            {/* نام کاربر */}
            <h2 className="card-title text-2xl text-primary">
              {userProfile.name}
            </h2>

            {/* نقش کاربر */}
            <p className="text-base-content/70 font-medium">
              {userProfile.role}
            </p>

            {/* نام تیم */}
            <div className="badge badge-outline badge-primary gap-2 mt-1">
              <Users className="w-4 h-4" />
              {userProfile.team}
            </div>
          </div>
          {/* <DateTimeBox /> */}

          {/* خط جداکننده */}
          <div className="divider w-full"></div>

          {/* بخش ۲: آمار (سه باکس) */}
          <div className="grid grid-cols-4 gap-2 w-full">
            {/* باکس ۱: اعضای تیم */}
            <div className="stat col-span-4 bg-base-200 rounded-box p-3">
              <div className="stat-figure text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div className="stat-title text-xs">اعضای تیم</div>
              <div className="stat-value text-xl text-primary">
                {userProfile.teamMembers}
              </div>
            </div>

            {/* باکس ۲: پروژه‌ها */}
            <div className="stat col-span-2 bg-base-200 rounded-box p-3">
              <div className="stat-figure text-secondary">
                <FolderKanban className="w-6 h-6" />
              </div>
              <div className="stat-title text-xs">پروژه‌ها</div>
              <div className="stat-value text-xl text-secondary">
                {userProfile.activeProjects}
              </div>
            </div>

            {/* باکس ۳: تسک‌ها */}
            <div className="stat col-span-2 bg-base-200 rounded-box p-3">
              <div className="stat-figure text-accent">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div className="stat-title text-xs">تسک‌های من</div>
              <div className="stat-value text-xl text-accent">
                {userProfile.pendingTasks}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
