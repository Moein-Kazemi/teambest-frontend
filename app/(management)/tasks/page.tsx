import { vazirMedium } from "@/app/fonts";
import DotsLoader from "@/components/DotsLoader";
import HeadingOne from "@/components/HeadingOne";
import MyTasksList from "@/components/MyTasksList";
import { Suspense } from "react";

function Page() {
  return (
    <div className="space-y-8 text-center">
      <HeadingOne data="وظایف من" />
      <Suspense fallback={<DotsLoader />}>
        <MyTasksList />
      </Suspense>
      <h2 className={`${vazirMedium.className} text-2xl`}>وظایف تیم من</h2>
    </div>
  );
}

export default Page;
