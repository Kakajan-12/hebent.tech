"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import Navigation from "../sections/Navigation";
import LangSwitcher from "./LangSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Nav");

  return (
    <header className="h-32 lg:h-42">
      {/* Frosted glass bar — always visible, except inside nav at lg+ */}
      <div
        className={`fixed top-5 left-0 right-0 pointer-events-none px-5 lg:px-10 ${
          isOpen ? "lg:hidden z-105" : "z-90"
        }`}
      >
        <div
          className={`container mx-auto h-15 md:h-19.5 shadow-sm backdrop-blur-xs border-b border-white/10 ${
            isOpen ? "bg-white/10" : "bg-white/5"
          }`}
        />
      </div>

      {/* Logo layer A — icon keeps its color; */}
      <div className="fixed top-5 left-0 z-110 pointer-events-none">
        <div className="container mx-auto px-5 lg:px-10">
          <Link
            href="/"
            aria-label="Home"
            onClick={() => setIsOpen(false)}
            className="pointer-events-auto flex shrink-0 py-4 md:py-3 px-3 lg:px-5"
          >
            <Image
              src="/logoIcon.svg"
              alt="logo icon"
              width={44}
              height={44}
              priority
              className={`w-[25px] h-[25px] md:w-[54px] md:h-[54px] ${isOpen ? "brightness-0 invert" : ""}`}
            />
          </Link>
        </div>
      </div>

      {/* Logo layer B — text only */}
      <div
        className={`fixed top-6 md:top-5 left-11 md:left-18 z-110 pointer-events-none ${isOpen ? "brightness-0 invert" : "mix-blend-difference"}`}
      >
        <div className="container mx-auto px-5 lg:px-10">
          <Link
            href="/"
            aria-label="Home"
            onClick={() => setIsOpen(false)}
            className="pointer-events-auto flex shrink-0 py-3 lg:px-5"
          >
            <Image
              src="/logo.svg"
              alt="HEBENT TECHNOLOGY"
              width={121}
              height={54}
              priority
              className={`w-17 md:w-full h-auto invert ${isOpen ? "brightness-0 invert" : ""}`}
            />
          </Link>
        </div>
      </div>

      <div className="fixed top-5 right-0 z-110 pointer-events-none">
        <div className="container mx-auto px-5 lg:px-10 font-vox">
          <div className="flex items-center justify-end gap-5 py-4 md:py-6 lg:py-5 px-3 lg:px-5 pointer-events-auto">
            {/* <div className="pointer-events-auto flex items-center gap-2"> */}
            <Link
              href="/contacts"
              onClick={() => setIsOpen(false)}
              className={`hidden sm:inline-flex items-center justify-center border px-3 lg:px-8 py-1 lg:py-2 text-sm font-medium transition ${
                isOpen
                  ? "bg-transparent border-white text-white hover:text-[#253081] hover:bg-white/50"
                  : "bg-white border-black text-black hover:bg-white"
              }`}
            >
              {t("contacts")}
            </Link>
            <div className="flex items-center">
              <LangSwitcher isOpen={isOpen} />
              <button
                type="button"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((v) => !v)}
                className={`border p-1 lg:p-2 transition ${
                  isOpen
                    ? "bg-transparent border-white text-white hover:text-[#253081] hover:bg-white/50"
                    : "bg-white border-black text-black hover:bg-white"
                }`}
              >
                {isOpen ? <IoClose size={20} /> : <CiMenuBurger size={20} />}
              </button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      <Navigation isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
