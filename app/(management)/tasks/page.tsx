import { vazirMedium } from "@/app/fonts";

import DotsLoader from "@/components/DotsLoader";
import HeadingOne from "@/components/HeadingOne";
import MyTasksList from "@/components/MyTasksList";
import TeamTaskList from "@/components/TeamTaskList";
import { Suspense } from "react";

function Page() {
  return (
    <div className="space-y-8 text-center">
      {/* my task section */}
      <HeadingOne data="وظایف من" />
      <Suspense fallback={<DotsLoader />}>
        <MyTasksList />
      </Suspense>

      {/* team task section */}
      <h2 className={`${vazirMedium.className} text-2xl`}>وظایف تیم من</h2>
      <Suspense fallback={<DotsLoader />}>
        <TeamTaskList />
      </Suspense>
    </div>
  );
}

export default Page;
