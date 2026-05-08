"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiSolidDownArrow } from "react-icons/bi";
import type { NavLink } from "./navItems";

type Props = {
  title: string;
  items: NavLink[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  pathname: string;
  t: (k: string) => string;
};

export default function DropdownMenu({
  title,
  items,
  isOpen,
  onOpen,
  onClose,
  pathname,
  t,
}: Props) {
  const anyActive = items.some(
    (i) => pathname === i.href || pathname.startsWith(i.href + "/"),
  );

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`relative ${anyActive ? "border-b-2 border-white" : ""}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-1 cursor-pointer text-white select-none"
      >
        {title}
        <BiSolidDownArrow
          size={15}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute left-0 mt-2 rounded divide-y-2 divide-white divide-opacity-40 z-50 px-3 pt-3 pb-4 
                    transition-all duration-150 transform origin-top
                    ${
                      isOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }
                    ${
                      isScrolled
                        ? "main-background-color shadow-lg"
                        : "backdrop-blur-[67.5px] shadow-[0_0_16px_1px_rgba(0,0,0,0.25)] bg-white/10"
                    }`}
      >
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="block font-light text-white text-center py-2 text-nowrap hover:bg-white/10"
            prefetch={false}
          >
            {t(i.labelKey)}
          </Link>
        ))}
      </div>
    </div>
  );
}
