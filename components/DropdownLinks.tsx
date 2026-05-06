import { vazirBold } from "@/app/fonts";
import Link from "next/link";

export default function DropdownLinks() {
  return (
    <ul
      tabIndex={0}
      className={`menu menu-sm dropdown-content ${vazirBold.className} bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow right-0 top-full`}
    >
      <li>
        <Link href="/">خانه</Link>
      </li>
      <li>
        <Link href="/dashboard">داشبورد</Link>
      </li>
      <li>
        <Link href="/projects">پروژه ها</Link>
      </li>
      <li>
        <Link href="/tasks">وظایف</Link>
      </li>
    </ul>
  );
}
