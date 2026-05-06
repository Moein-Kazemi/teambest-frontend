"use client";
import { vazirBold } from "@/app/fonts";
import DropdownLinks from "@/components/DropdownLinks";
import HeaderLinks from "@/components/HeaderLinks";
import Link from "next/link";
import Logo from "./Logo";


export default function Navbar() {
  return (
    <header className="navbar space-x-4  bg-base-100 shadow-md justify-between sticky top-0 z-51">
      {/* LOGO IN DESKTOP SIZE AND ALSO MENU BUTTON IN THE MOBILE SIZE */}
      <div className="navbar-start w-auto  lg:justify-start lg:w-[50%]">
        {/* HAMBERGURE BUTTON*/}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* DROPDOWN MENU IN MOBILE SIZE*/}
          <DropdownLinks />
        </div>

        {/* LOGO IN DESKTOP SIZE*/}
        <div className="w-30 hidden lg:block  ">
          <Logo />
        </div>
      </div>

      {/* LINKS IN DESKTOP SIZE */}
      <div className={`navbar-center ${vazirBold.className} hidden lg:flex `}>
        <HeaderLinks />
      </div>
      {/* LOGO IN MOBILE SIZE */}
      <div className="w-30 lg:hidden  ">
        <Logo />
      </div>

      {/* LOGIN OR REGISTER BUTTON */}
      <div className="navbar-end w-auto lg:w-[50%]">
        <Link href="/login" className="btn text-[12px]">
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.99441 12.4018C5.06176 12.4018 1.70337 12.9115 1.70337 14.953C1.70337 16.9946 5.04046 17.5226 8.99441 17.5226C12.9271 17.5226 16.2845 17.012 16.2845 14.9713C16.2845 12.9306 12.9484 12.4018 8.99441 12.4018Z"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.99454 9.48992C11.5753 9.48992 13.667 7.6958 13.667 5.48325C13.667 3.2707 11.5753 1.47741 8.99454 1.47741C6.41377 1.47741 4.32107 3.2707 4.32107 5.48325C4.31236 7.68833 6.39053 9.48245 8.96162 9.48992H8.99454Z"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
