import { vazirBold } from "@/app/fonts";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getUser } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const currUser = await getUser(user?.id as string);
  return (
    <div className="space-y-6">
      <h1 className={`text-2xl ${vazirBold.className} text-center`}>
        <span className="text-primary">به روزرسانی</span> حساب کاربری
      </h1>
      <UpdateProfileForm user={currUser} />
    </div>
  );
}

export default Page;
