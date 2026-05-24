"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavProps {
  link: string;
  icon: React.ReactNode;
  text: string;
  handleClick?: () => void;
}

function SideNavLink({ link, icon, text, handleClick }: SideNavProps) {
  const path = usePathname();

  return (
    <li className="">
      <Link
        href={link}
        onClick={handleClick && handleClick}
        className={`flex items-center gap-2 px-4 py-3 ${path === link && "bg-linear-to-l from-blue-200 to-base-200 text-indigo-700 "} `}
      >
        {icon}
        {text}
      </Link>
    </li>
  );
}

export default SideNavLink;
