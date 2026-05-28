import { vazirBold } from "@/app/fonts";
import CompleteRegisterForm from "@/components/CompleteRegisterForm";

function Page() {
  return (
    <div className="space-y-6">
      <h1 className={`text-2xl ${vazirBold.className} text-center`}>
        <span className="text-primary">تکمیل</span> ثبت نام
      </h1>
      <CompleteRegisterForm />
    </div>
  );
}

export default Page;
