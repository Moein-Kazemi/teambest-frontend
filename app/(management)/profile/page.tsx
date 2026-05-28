import ProfileActions from "@/components/ProfileActions";

import { getUser } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { calculateProfileCompletion } from "@/lib/calculateProfileCompletion";
import ProfileCard from "@/ui/ProfileCard";
import ProfileTopGradient from "@/ui/ProfileTopGradient";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // get user
  const userinfo = await getUser(user?.id as string);
  // calculate profile completion
  const completion = calculateProfileCompletion(userinfo);

  return (
    <div className="max-w-5xl mx-auto">
      {/* HEADER CARD */}
      <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
        {/* TOP GRADIENT */}
        <ProfileTopGradient completion={completion} />

        {/* BODY */}
        <div className="pt-20 pb-8 px-6 md:px-10">
          {/* ACTION BUTTONS */}
          <ProfileActions role={user?.role as string} />

          {/* PROFILE CARD */}
          <ProfileCard user={userinfo} />
        </div>
      </div>
    </div>
  );
}

export default Page;
