"use client";
import DropdownLinks from "@/components/DropdownLinks";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function HamberMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="relative ">
      {/*MENU BUTTON  */}
      <div
        tabIndex={0}
        role="button"
        onClick={handleToggle}
        className="btn btn-ghost lg:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </div>

      {/* DROPDOWN MENU IN MOBILE SIZE*/}
      <DropdownLinks isOpen={isOpen} toggleIsOpen={handleToggle} />
    </div>
  );
}

export default HamberMenu;
