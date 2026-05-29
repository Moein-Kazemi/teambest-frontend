import { Users } from "lucide-react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import EmptyStat from "@/ui/EmptyStat";
// import { teamAPI } from "@/lib/apis/team.api";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // اگر تیم نداشت
  if (!user?.teamId) {
    return (
      <EmptyStat
        icon={<Users size={40} className="text-primary" />}
        title="شما هنوز تیمی ندارید"
        description="شما هنوز هیچ تیمی ایجاد نکرده اید یا عضو هیچ تیمی نیستید."
        role={user?.role as string}
      />
    );
  }

  return <div>تیم ساخته شده</div>;
  // دریافت اطلاعات تیم
  // const team = await teamAPI.getTeam(user.teamId);

  // return (
  //   <div className="container mx-auto py-10 px-4">
  //     <div className="flex items-center justify-between mb-10">
  //       <div>
  //         <h1 className="text-4xl font-black mb-2">{team.name}</h1>

  //         <p className="text-base-content/70">اطلاعات تیم و اعضای آن</p>
  //       </div>

  //       {user.role === "manager" && (
  //         <Link
  //           href={`/team/${team._id}/settings`}
  //           className="btn btn-outline btn-primary"
  //         >
  //           مدیریت تیم
  //         </Link>
  //       )}
  //     </div>

  //     {/* Team Info */}
  //     <div className="grid lg:grid-cols-3 gap-6">
  //       <div className="card bg-base-100 border border-base-300 shadow-sm">
  //         <div className="card-body">
  //           <h2 className="card-title">اطلاعات تیم</h2>

  //           <div className="space-y-3 mt-4">
  //             <div>
  //               <span className="font-semibold">نام تیم:</span> {team.name}
  //             </div>

  //             <div>
  //               <span className="font-semibold">توضیحات:</span>{" "}
  //               {team.description || "-"}
  //             </div>

  //             <div>
  //               <span className="font-semibold">تعداد اعضا:</span>{" "}
  //               {team.members?.length || 0}
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Members */}
  //       <div className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm">
  //         <div className="card-body">
  //           <div className="flex items-center justify-between mb-4">
  //             <h2 className="card-title">اعضای تیم</h2>

  //             {user.role === "manager" && (
  //               <button className="btn btn-primary btn-sm">افزودن عضو</button>
  //             )}
  //           </div>

  //           <div className="space-y-4">
  //             {team.members?.map((member: any) => (
  //               <div
  //                 key={member._id}
  //                 className="flex items-center gap-4 p-4 rounded-xl border border-base-300"
  //               >
  //                 <img
  //                   src={`/avatar/${member.avatar}`}
  //                   alt={member.name}
  //                   className="w-14 h-14 rounded-full object-cover"
  //                 />

  //                 <div className="flex-1">
  //                   <h3 className="font-bold">
  //                     {member.name} {member.family}
  //                   </h3>

  //                   <p className="text-sm text-base-content/70">
  //                     {member.jobTitle}
  //                   </p>
  //                 </div>

  //                 <div className="badge badge-primary">{member.role}</div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
