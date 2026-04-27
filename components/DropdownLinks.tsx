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
        <Link href="/about">درباره ما</Link>
      </li>
      <li>
        <Link href="/services">خدمات</Link>
      </li>
      <li>
        <Link href="/contact">تماس با ما</Link>
      </li>
    </ul>
  );
}
