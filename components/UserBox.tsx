import Image from "next/image";
import avatar from "@/public/images/moein.JPG";
import { vazirMedium } from "@/app/fonts";

interface UserBoxProps {
  name: string;
}

function UserBox({ name }: UserBoxProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="avatar placeholder">
        <div className="bg-primary text-primary-content rounded-full w-10">
          <Image src={avatar} alt="avarar-image" />
        </div>
      </div>
      <div className="text-center">
        <div className={vazirMedium.className}>{name}</div>
      </div>
    </div>
  );
}

export default UserBox;
