import { CheckSquare, FolderKanban, Users } from "lucide-react";

interface UserStatusProp {
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

function UserStatus({ userProfile }: UserStatusProp) {
  return (
    <div className="grid grid-cols-4 gap-2 w-full col-span-12  ">
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
  );
}

export default UserStatus;
