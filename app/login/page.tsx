import LoginForm from "@/components/LoginForm";
import { vazirBold } from "../fonts";

function Page() {
  return (
    <div className="p-6 space-y-6">
      <h1 className={`text-2xl ${vazirBold.className} text-center`}>
        <span className="text-primary">ورود</span> به تیم بست
      </h1>
      <LoginForm />
    </div>
  );
}

export default Page;
