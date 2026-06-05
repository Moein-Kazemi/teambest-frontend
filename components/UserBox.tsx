import Image from "next/image";
import { vazirMedium } from "@/app/fonts";
import { getUser } from "@/lib/api";

interface UserBoxProps {
  name: string;
  userId: string;
}

async function UserBox({ name, userId }: UserBoxProps) {
  let fetchedUser;
  if (userId) {
    fetchedUser = await getUser(userId);
  }
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="avatar placeholder">
        <div className="bg-primary text-primary-content rounded-full w-10 relative">
          <Image
            src={`/avatar/${fetchedUser?.avatar}`}
            fill
            alt="avarar-image"
          />
        </div>
      </div>
      <div className="text-center">
        <div className={vazirMedium.className}>{name}</div>
      </div>
    </div>
  );
}

export default UserBox;
