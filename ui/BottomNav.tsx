import { vazirBold } from "@/app/fonts";
import Link from "next/link";

function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-primary border-t border-base-300 shadow-lg">
      <div
        className={`tabs ${vazirBold.className} tabs-boxed mx-2 mb-2" role="tablist`}
      >
        <Link
          href="/dashboard"
          className="tab flex-1 flex flex-col items-center justify-center py-2 text-base-100/70  hover:text-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs">داشبورد</span>
        </Link>

        <Link
          href="/search"
          className="tab flex-1 flex flex-col items-center justify-center py-2 text-base-100/70 hover:text-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-xs">جستجو</span>
        </Link>

        <Link
          href="/profile"
          className="tab flex-1 flex flex-col items-center justify-center py-2 text-base-100/70 hover:text-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-xs">پروفایل</span>
        </Link>
      </div>
    </footer>
  );
}

export default BottomNav;
