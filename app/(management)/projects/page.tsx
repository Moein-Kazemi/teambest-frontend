import DotsLoader from "@/components/DotsLoader";
import HeadingOne from "@/components/HeadingOne";
import ProjectsList from "@/components/ProjectsList";

import { Suspense } from "react";

async function Page() {
  return (
    <div className="space-y-8 text-center">
      <HeadingOne data="لیست پروژه ها" />

      <Suspense fallback={<DotsLoader />}>
        <ProjectsList />
      </Suspense>
    </div>
  );
}

export default Page;
