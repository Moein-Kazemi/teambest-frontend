import { vazirMedium } from "@/app/fonts";
import CreateTeamForm from "@/components/CreateTeamForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="space-y-6">
      <h2 className={`${vazirMedium.className} text-2xl text-center`}>
        ایجاد <span className="text-primary">تیم</span>
      </h2>

      <CreateTeamForm
        token={session?.accessToken as string}
        ownerId={user?.id as string}
      />
    </div>
  );
}

export default Page;
