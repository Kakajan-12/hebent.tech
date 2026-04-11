"use client";
import { FaChevronDown } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LangSwitcher() {
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
    <div className="relative hidden shrink-0 lg:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className=" flex items-center gap-2 rounded-3xl border border-black px-4 py-2 font-vox text-base font-medium shadow-sm"
        aria-expanded={open}
      >
        {shortLabel}
        <FaChevronDown
          className={`size-4 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-20 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              className={`block w-full px-4 py-2 text-center text-sm hover:bg-slate-50 ${
                loc === locale ? "font-semibold text-brand" : ""
              }`}
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
