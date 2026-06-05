import { vazirMedium } from "@/app/fonts";
import DotsLoader from "@/components/DotsLoader";
import HeadingOne from "@/components/HeadingOne";
import MyTasksList from "@/components/MyTasksList";
import TeamTaskList from "@/components/TeamTaskList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";

async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="space-y-8 text-center">
      {/* my task section */}
      <div className="flex justify-between">
        <HeadingOne data="وظایف من" />
        {user?.role === "manager" && (
          <Link
            href="/tasks/create"
            className="btn  btn-outline text-white bg-primary hover:text-white"
          >
            ایجاد وظیفه
          </Link>
        )}
      </div>
      <Suspense fallback={<DotsLoader />}>
        <MyTasksList id={user?.id as string} role={user?.role as string} />
      </Suspense>

      {/* team task section */}
      <h2 className={`${vazirMedium.className} text-2xl`}>وظایف تیم من</h2>
      <Suspense fallback={<DotsLoader />}>
        <TeamTaskList
          teamId={user?.teamId as string}
          role={user?.role as string}
        />
      </Suspense>
    </div>
  );
}

export default Page;
