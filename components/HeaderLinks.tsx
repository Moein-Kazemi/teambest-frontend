import Link from "next/link";

export default function HeaderLinks() {
    return   <ul className="menu menu-horizontal px-1">
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
}
