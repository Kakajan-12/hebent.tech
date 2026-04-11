"use client";

import { FaBars, FaXmark } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";

export default function MobileNav() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay =
    open &&
    createPortal(
      <div
        className="fixed inset-0 z-100 flex justify-end bg-slate-900/40 backdrop-blur-sm lg:hidden"
        role="presentation"
        onClick={() => setOpen(false)}
      >
        <nav
          className="flex h-fit w-56 flex-col bg-white shadow-2xl"
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
              onClick={() => setOpen(false)}
            >
              <FaXmark className="size-6" />
            </button>
          </div>
          <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4 py-6 text-lg font-medium text-black">
            <li>
              <Link
                href="/"
                className="block rounded-lg px-3 py-3 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {t("main")}
              </Link>
            </li>
            <li>
              <Link
                href="/project"
                className="block rounded-lg px-3 py-3 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {t("projects")}
              </Link>
            </li>
            <li>
              <Link
                href="/newsroom"
                className="block rounded-lg px-3 py-3 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {t("newsroom")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block rounded-lg px-3 py-3 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {t("about")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>,
      document.body,
    );

  return (
    <div className="lg:hidden relative">
      <button
        type="button"
        className="rounded-lg p-2 text-slate-800 hover:bg-black/5"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <FaXmark className="size-6 text-black" />
        ) : (
          <FaBars className="size-6 w-6 h-auto" />
        )}
      </button>
      {overlay}
    </div>
  );
}
