import DotsLoader from "@/components/DotsLoader";
import HeadingOne from "@/components/HeadingOne";
import ProjectsList from "@/components/ProjectsList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { Suspense } from "react";

async function Page() {
  const session = await getServerSession(authOptions);
  const teamId = session?.user?.teamId;

  return (
    <div className="space-y-8 text-center">
      <HeadingOne data="لیست پروژه ها" />

      <Suspense fallback={<DotsLoader />}>
        <ProjectsList
          teamId={teamId as string}
          role={session?.user?.role as string}
        />
      </Suspense>
    </div>
  );
}

export default Page;
