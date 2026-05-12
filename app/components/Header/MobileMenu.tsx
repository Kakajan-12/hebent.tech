"use client";

import { FaBars, FaChevronDown, FaXmark } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type MobileSection = "products" | "company" | null;

const KEEP_MOBILE_NAV_OPEN_KEY = "hbent-keep-mobile-nav-open";

function markMobileNavOpenForLocaleChange(
  section: MobileSection,
  next: string,
) {
  sessionStorage.setItem(
    KEEP_MOBILE_NAV_OPEN_KEY,
    JSON.stringify({ section, next, t: Date.now() }),
  );
}

export default function MobileNav() {
  const tNav = useTranslations("Nav");
  const tLang = useTranslations("Lang");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<MobileSection>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // useEffect(() => {
  //   try {
  //     const raw = sessionStorage.getItem(KEEP_MOBILE_NAV_OPEN_KEY);
  //     if (!raw) return;
  //     sessionStorage.removeItem(KEEP_MOBILE_NAV_OPEN_KEY);
  //     const parsed = JSON.parse(raw) as {
  //       section?: unknown;
  //       next?: string;
  //       t?: number;
  //     };
  //     const ttlMs = 15_000;
  //     if (
  //       typeof parsed.t !== "number" ||
  //       Date.now() - parsed.t > ttlMs ||
  //       parsed.next !== locale
  //     ) {
  //       return;
  //     }
  //     const s = parsed.section;
  //     queueMicrotask(() => {
  //       setOpen(true);
  //       if (s === "products" || s === "company" || s === null) {
  //         setSection(s);
  //       }
  //     });
  //   } catch {
  //     try {
  //       sessionStorage.removeItem(KEEP_MOBILE_NAV_OPEN_KEY);
  //     } catch {
  //       /* ignore */
  //     }
  //   }
  // }, [locale]);

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenu = () => {
    setSection(null);
    setOpen(false);
  };

  const productLinks = [
    { href: "/products/traveltech", label: tNav("travel") },
    { href: "/products/logtech", label: tNav("logistics") },
    { href: "/products/eventtech", label: tNav("events") },
  ];

  const companyLinks = [
    { href: "/about", label: tNav("about") },
    { href: "/careers", label: tNav("careers") },
    { href: "/contacts", label: tNav("contacts") },
  ];

  const productsOpen = open && section === "products";
  const companyOpen = open && section === "company";
  const productsActive = productLinks.some((i) => checkActive(i.href));
  const companyActive = companyLinks.some((i) => checkActive(i.href));

  const switchLocale = (next: string) => {
    if (open) {
      try {
        markMobileNavOpenForLocaleChange(section, next);
      } catch {
        /* ignore */
      }
    }
    router.replace(pathname, { locale: next });
  };

  const localeLabel = (loc: string) =>
    loc === "en" ? tLang("en") : loc === "ru" ? tLang("ru") : tLang("tk");

  const linkClass = (href: string) =>
    `block rounded-lg px-3 py-3 ${
      checkActive(href) ? "bg-brand text-white" : "text-black hover:bg-slate-50"
    }`;

  const overlay =
    open &&
    createPortal(
      <div
        className="fixed inset-0 z-100 flex justify-end bg-slate-900/40 backdrop-blur-sm lg:hidden"
        role="presentation"
        onClick={closeMenu}
      >
        <nav
          className="flex h-full w-[min(20rem,calc(100vw-2rem))] max-w-full flex-col bg-white shadow-2xl font-vox"
          aria-label="Mobile"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-end border-b border-slate-100 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-800 hover:bg-slate-100"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <FaXmark className="size-6" />
            </button>
          </div>
          <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4 py-4 text-lg font-medium">
            <li>
              <Link href="/" className={linkClass("/")} onClick={closeMenu}>
                {tNav("main")}
              </Link>
            </li>
            <li>
              <Link
                href="/project"
                className={linkClass("/project")}
                onClick={closeMenu}
              >
                {tNav("projects")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left ${
                  productsActive || productsOpen
                    ? "bg-brand text-white"
                    : "text-black hover:bg-slate-50"
                }`}
                aria-expanded={productsOpen}
                onClick={() =>
                  setSection((s) => (s === "products" ? null : "products"))
                }
              >
                {tNav("products")}
                <FaChevronDown
                  className={`size-4 shrink-0 transition ${productsOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {productsOpen ? (
                <ul className="mt-1 flex flex-col gap-1 border-l-2 border-slate-200 pl-3">
                  {productLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-lg py-2 pl-2 text-base font-medium ${
                          checkActive(item.href)
                            ? "text-brand font-semibold"
                            : "text-slate-700 hover:text-black"
                        }`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
            <li>
              <Link
                href="/newsroom"
                className={linkClass("/newsroom")}
                onClick={closeMenu}
              >
                {tNav("newsroom")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left ${
                  companyActive || companyOpen
                    ? "bg-brand text-white"
                    : "text-black hover:bg-slate-50"
                }`}
                aria-expanded={companyOpen}
                onClick={() =>
                  setSection((s) => (s === "company" ? null : "company"))
                }
              >
                {tNav("company")}
                <FaChevronDown
                  className={`size-4 shrink-0 transition ${companyOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {companyOpen ? (
                <ul className="mt-1 flex flex-col gap-1 border-l-2 border-slate-200 pl-3">
                  {companyLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-lg py-2 pl-2 text-base font-medium ${
                          checkActive(item.href)
                            ? "text-brand font-semibold"
                            : "text-slate-700 hover:text-black"
                        }`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          </ul>
          <div className="shrink-0 border-t border-slate-100 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex gap-2">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={`font-vox flex-1 rounded-lg border border-slate-200 py-2 text-center text-sm font-semibold transition hover:bg-slate-50 ${
                    loc === locale
                      ? "bg-slate-100 text-brand"
                      : "text-slate-800"
                  }`}
                  onClick={() => switchLocale(loc)}
                >
                  {localeLabel(loc)}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>,
      document.body,
    );

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        className="rounded-lg p-2 text-slate-800 hover:bg-black/5"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : setOpen(true))}
      >
        {open ? (
          <FaXmark className="size-6 text-black" />
        ) : (
          <FaBars className="size-6 h-auto w-6" />
        )}
      </button>
      {overlay}
    </div>
  );
}
