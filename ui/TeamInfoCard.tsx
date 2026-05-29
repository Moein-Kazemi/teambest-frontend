import DeleteTeamButton from "@/components/DeleteTeamButton";
import { ITeam, ITeamProject } from "@/interfaces/teamInterfaces";

import { Users } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

interface TeamInfoCardProps {
  team: ITeam;
  role: string;
}
export default async function TeamInfoCard({ team, role }: TeamInfoCardProps) {
  return (
    <div className=" bg-base-200 flex items-center justify-center p-2 rounded-4xl md:p-6">
      <div className="w-full max-w-4xl bg-base-100 rounded-4xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden border border-base-300">
        {/* HEADER */}
        <div className="relative bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-5 flex flex-col items-center text-center border-b border-base-300">
          {/* TEAM LOGO */}
          <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-base-100">
            <Users size={40} />
          </div>

          {/* TEAM NAME */}
          <h1 className="mt-4 text-xl md:text-3xl font-black text-base-content">
            {team?.name || ""}
          </h1>

          {/* SUMMARY */}
          <p className="mt-4 text-base max-w-2xl text-base-content/70 leading-8 md:text-lg">
            {team?.summary || ""}
          </p>
          {role === "manager" && (
            <div className="flex mt-2 gap-2">
              <Link
                href="/team/update"
                className="btn btn-secondary btn-outline rounded-2xl px-8"
              >
                به روز رسانی
              </Link>
              <DeleteTeamButton teamId={team?._id} />
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="grid lg:grid-cols-2 p-4 gap-4 md:gap-8 md:p-8">
          {/* MEMBERS */}
          <div className="bg-base-200 rounded-3xl p-4 border border-base-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-2xl font-black text-base-content">
                اعضای تیم
              </h2>

              <div className="badge badge-primary badge-base md:badge-lg p-2 md:px-4 md:py-4">
                {team?.members?.length} عضو
              </div>
            </div>

            <div className="space-y-4">
              {team?.members?.map((member) => (
                <div
                  key={member.memberId}
                  className="bg-base-100 border border-base-300 rounded-2xl p-3 flex items-center justify-between hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="avatar">
                      <div className="w-10 relative rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                        <Image
                          src={`/avatar/${member.memberAvatar}`}
                          fill
                          alt={member.memberName}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm md:text-lg text-base-content">
                        {member.memberName}
                      </h3>

                      <p className="text-base-content/60 text-xs md:text-sm mt-1">
                        {member.memberJobTitle}
                      </p>
                    </div>
                  </div>

                  <div className="badge hidden md:inline-flex badge-outline badge-primary px-4 py-3">
                    عضو تیم
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECTS */}
          <div className="bg-base-200 rounded-3xl p-4 border border-base-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-2xl font-black text-base-content">
                پروژه ها
              </h2>

              <div className="badge badge-secondary p-2 badge-base md:badge-lg md:px-4 md:py-4">
                {team?.projects?.length} پروژه
              </div>
            </div>

            {team?.projects && team.projects.length > 0 ? (
              <div className="space-y-3">
                {team.projects.map((project: ITeamProject) => (
                  <div
                    key={project.projectId}
                    className="bg-base-100 rounded-2xl border border-base-300 p-3 md:p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-bold text-sm md:text-lg text-base-content">
                      {project.projectName}
                    </h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-50 flex flex-col items-center justify-center text-center bg-base-100 rounded-3xl border border-dashed border-base-300">
                <div className="text-4xl md:text-6xl opacity-60">📁</div>

                <h3 className="mt-4 text-base md:text-xl font-black text-base-content">
                  هنوز پروژه ای ایجاد نشده است
                </h3>

                <p className="mt-2 text-sm text-base-content/60 max-w-sm ">
                  پس از ایجاد پروژه های جدید، اطلاعات آن ها در این بخش نمایش
                  داده خواهد شد.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
