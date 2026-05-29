import LogoutButton from "@/components/LogoutButton";
import SideNavLink from "@/components/SideNavLink";
import { CheckSquare, Home, Rocket, User, Users } from "lucide-react";

const sideNavLinks = [
  { link: "/dashboard", icon: <Home size={18} />, text: "داشبورد" },
  { link: "/projects", icon: <Rocket size={18} />, text: " پروژه ها" },
  { link: "/tasks", icon: <CheckSquare size={18} />, text: "وظایف" },
  { link: "/team", icon: <Users size={18} />, text: "تیم" },
  { link: "/profile", icon: <User size={18} />, text: "حساب کاربری" },
];

export default function Sidebar() {
  return (
    <aside className="hidden col-span-2 max-w-64 right-0 top-17 z-50 border-l shadow-lg bg-gray-50 h-full border-base-300 lg:flex lg:flex-col justify-between">
      {/* LIST OF THE LINKS */}
      <ul className="menu p-4 w-full flex-1 gap-4">
        {sideNavLinks.map((link) => (
          <SideNavLink
            key={link.link}
            link={link.link}
            icon={link.icon}
            text={link.text}
          />
        ))}
      </ul>

      {/* LOGOUT*/}
      <LogoutButton />
    </aside>
  );
}
