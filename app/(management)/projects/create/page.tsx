import { vazirMedium } from "@/app/fonts";
import CreateProjectForm from "@/components/CreateProjectForm";

function Page() {
  return (
    <div className="space-y-6">
      <h2 className={`${vazirMedium.className} text-2xl text-center`}>
        ساختن پروژه جدید
      </h2>
      {/* <CreateProjectForm /> */}
      <CreateProjectForm />
    </div>
  );
}

export default Page;
