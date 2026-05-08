"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import DesktopMenu from "./DesktopMenu";
import LangSwitcher from "./LangSwitcher";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
      <header className="h-42">
        <div className="fixed top-0 left-0 right-0 z-50 font-nexa">
          <div className="container mx-auto pt-7 lg:pt-10 px-5 lg:px-10 xl:px-0">
            <div
                className="flex h-12 md:h-16 lg:h-18 items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm border-b border-white/20 shadow-sm px-2 py-2 sm:px-7">
              <Link
                  href="/"
                  className="flex shrink-0 items-center"
                  aria-label="Home"
              >
                <Image
                    src="/logo.svg"
                    alt="HEBENT TECHNOLOGY"
                    width={174}
                    height={54}
                    priority
                    className="w-[108px] h-auto md:w-[150px] lg:w-[174px]"
                />
              </Link>
              <div className="hidden min-w-0 flex-1 justify-center lg:flex">
                <DesktopMenu/>
              </div>
              <LangSwitcher/>
              <div className="ml-auto shrink-0 lg:hidden">
                <MobileMenu/>
              </div>
            </div>
          </div>
        </div>
      </header>

  );
}
