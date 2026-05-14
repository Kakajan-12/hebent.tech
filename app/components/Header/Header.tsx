"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import Navigation from "../sections/Navigation";
import LangSwitcher from "./LangSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Nav");

  return (
    <header className="h-32 lg:h-42">
      <div className="fixed top-10 left-0 right-0 z-110">
        <div className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 font-vox">
          <div
            className={`flex items-center justify-between gap-3 rounded px-2 ${isOpen ? "" : "backdrop-blur-sm bg-white/10"}`}
          >
            <Link
              href="/"
              aria-label="Home"
              className="flex shrink-0 items-center px-3 py-2 sm:px-5"
            >
              {isOpen ? (
                <Image
                  src="/logo.svg"
                  alt="HEBENT TECHNOLOGY"
                  width={174}
                  height={54}
                  priority
                  className="w-[108px] h-auto md:w-[150px] lg:w-[174px] brightness-0 invert"
                />
              ) : (
                <Image
                  src="/logo.svg"
                  alt="HEBENT TECHNOLOGY"
                  width={174}
                  height={54}
                  priority
                  className="w-[108px] h-auto md:w-[150px] lg:w-[174px]"
                />
              )}
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/contacts"
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
