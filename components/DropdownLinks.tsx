import { vazirBold } from "@/app/fonts";
import {
  CheckSquare,
  HomeIcon,
  LayoutDashboardIcon,
  Rocket,
  User,
  Users,
} from "lucide-react";
import SideNavLink from "./SideNavLink";
import LogoutButton from "./LogoutButton";

const mobileMnueLinks = [
  { link: "/", icon: <HomeIcon size={14} />, text: "خانه" },
  {
    link: "/dashboard",
    icon: <LayoutDashboardIcon size={14} />,
    text: "داشبورد",
  },
  { link: "/projects", icon: <Rocket size={14} />, text: "پروژه ها" },
  { link: "/tasks", icon: <CheckSquare size={14} />, text: "وظایف" },
  { link: "/team", icon: <Users size={14} />, text: "تیم" },
  { link: "/profile", icon: <User size={14} />, text: "حساب کاربری" },
];

interface DropdownLinksProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

export default function DropdownLinks({
  isOpen,
  toggleIsOpen,
}: DropdownLinksProps) {
  if (isOpen) {
    return (
      <ul
        tabIndex={0}
        className={`menu menu-sm dropdown-content bg-gray-100 ${isOpen && "absolute right-0 top-0 z-55"} space-y-4 h-[80vh] ${vazirBold.className} bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow right-0 top-full`}
      >
        {mobileMnueLinks.map((link) => (
          <SideNavLink
            key={link.link}
            link={link.link}
            icon={link.icon}
            text={link.text}
            handleClick={toggleIsOpen}
          />
        ))}
        <LogoutButton />
      </ul>
    );
  }
}
