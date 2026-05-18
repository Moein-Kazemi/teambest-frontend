import RegisterForm from "@/components/RegisterForm";
import { vazirBold } from "../fonts";

function Page() {
  return (
    <div className="p-6 space-y-6">
      <h1 className={`text-2xl ${vazirBold.className} text-center`}>
        <span className="text-primary">ثبت نام</span> در تیم بست
      </h1>
      <RegisterForm />
    </div>
  );
}

export default Page;
