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
        className={`fixed lg:top-5 left-0 right-0 z-110 pointer-events-none lg:px-10 xl:px-20 ${
          isOpen ? "lg:hidden" : ""
        }`}
      >
        <div className="container mx-auto h-15 md:h-18 shadow-sm backdrop-blur-xs bg-white/5 border-b border-white/10 rounded" />
      </div>

      {/* Logo layer A — icon keeps its color; */}
      <div className="fixed lg:top-5 -left-2 lg:-left-1 right-0 z-110 pointer-events-none">
        <div className="container mx-auto px-5 lg:px-10 xl:px-20">
          <div className="flex items-center px-2">
            <Link
              href="/"
              aria-label="Home"
              onClick={() => setIsOpen(false)}
              className="pointer-events-auto flex shrink-0 items-center py-2 lg:px-2"
            >
              <Image
                src="/logoIcon.svg"
                alt="logo icon"
                width={54}
                height={54}
                priority
                className="w-[44px] h-[44px] md:w-[54px] md:h-[54px]"
              />
              <Image
                src="/logo.svg"
                alt="HEBENT TECHNOLOGY"
                aria-hidden
                width={121}
                height={54}
                priority
                loading="eager"
                className="invisible w-[88px] h-auto md:w-[112px] lg:w-[130px]"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Logo layer B — text only */}
      <div className="fixed -top-1 md:top-1 lg:top-5 -left-8 sm:-left-9 md:-left-7 lg:-left-5 right-0 z-110 mix-blend-difference pointer-events-none">
        <div className="container mx-auto px-5 lg:px-10 xl:px-20">
          <div className="flex items-center px-2">
            <div className="flex shrink-0 items-center px-3 py-2 sm:px-5">
              <Image
                src="/logoIcon.svg"
                alt="logo icon"
                aria-hidden
                width={54}
                height={54}
                className="invisible w-[54px] h-[54px]"
              />
              <Image
                src="/logo.svg"
                alt="HEBENT TECHNOLOGY"
                width={121}
                height={54}
                priority
                className="w-[88px] h-auto md:w-[112px] lg:w-[130px] brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-4 md:top-6 lg:top-8.5 left-0 right-0 lg:right-1.5 z-110 pointer-events-none">
        <div className="container mx-auto px-3 lg:px-10 xl:px-20 font-vox">
          <div className="flex items-center justify-end gap-3 rounded px-2">
            <div className="pointer-events-auto flex items-center gap-2">
              <Link
                href="/contacts"
                onClick={() => setIsOpen(false)}
                className={`hidden sm:inline-flex items-center justify-center border px-3 lg:px-8 py-1 lg:py-2.5  text-sm font-medium transition ${
                  isOpen
                    ? "bg-black border-white text-white hover:bg-black"
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
                  className={`border p-1 lg:p-2.5 transition ${
                    isOpen
                      ? "bg-black border-white text-white hover:bg-black"
                      : "bg-white border-black text-black hover:bg-white"
                  }`}
                >
                  {isOpen ? <IoClose size={20} /> : <CiMenuBurger size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
