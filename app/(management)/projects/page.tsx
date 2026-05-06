import { vazirMedium } from "@/app/fonts";
import DotsLoader from "@/components/DotsLoader";
import ProjectsList from "@/components/ProjectsList";

import { Suspense } from "react";

async function Page() {
  return (
    <>
      <h1 className={`text-3xl ${vazirMedium.className} pb-8`}>
        لیست پروژه ها
      </h1>

      <Suspense fallback={<DotsLoader />}>
        <ProjectsList />
      </Suspense>
    </>
  );
}

export default Page;
