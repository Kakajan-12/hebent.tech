"use client";
import { FaChevronDown } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LangSwitcher({ isOpen }: { isOpen?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Lang");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const switchLocale = (next: string) => {
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  const shortLabel =
    locale === "en" ? t("en") : locale === "ru" ? t("ru") : t("tk");

  return (
    <div className="relative shrink-0 font-bold group" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 p-1 lg:p-2 font-vox text-sm border border-r-0 border-black ${isOpen ? "bg-transparent text-white border-white group-hover:text-brand-dark group-hover:bg-white/50 " : "bg-white text-black hover:bg-white"}`}
        aria-expanded={open}
      >
        {shortLabel}
        <FaChevronDown
          className={`size-3 transition ${isOpen ? "text-white group-hover:text-brand-dark " : "text-black"} ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-11 lg:w-14 border border-neutral-800/20 bg-white/40 backdrop-blur-sm py-2 shadow-lg">
          {routing.locales
            .filter((loc) => loc !== locale)
            .map((loc) => (
              <button
                key={loc}
                type="button"
                className={`block w-full px-1 lg:px-2 py-1 lg:py-2 text-center text-sm ${isOpen ? " text-white hover:text-black hover:bg-white" : " text-black hover:bg-white/80"}`}
                onClick={() => switchLocale(loc)}
              >
                {loc === "en" ? t("en") : loc === "ru" ? t("ru") : t("tk")}
              </button>
            ))}
        </div>
      ) : null}
    </div>
  );
}
