import DotsLoader from "@/components/DotsLoader";
import MyTasksList from "@/components/MyTasksList";
import { Suspense } from "react";

function Page() {
  return (
    <div>
      <h2>وظایف من</h2>
      <Suspense fallback={<DotsLoader />}>
        <MyTasksList />
      </Suspense>
    </div>
  );
}

export default Page;
