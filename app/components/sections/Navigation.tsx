"use client";

import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { HiArrowUpRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import { useGetNewsQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { NewsItem } from "@/app/Interfaces/interfaces";
import NewsCard from "../Newsroom/NewsCard";

type NavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

function formatNewsDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
      .format(new Date(iso))
      .toUpperCase();
  } catch {
    return iso;
  }
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const t = useTranslations("Nav");
  const locale = useAppLocale();
  const { data: newsData } = useGetNewsQuery();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const latestNews = useMemo<NewsItem[]>(() => {
    const list = Array.isArray(newsData) ? [...newsData] : [];
    list.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return list.slice(0, 2);
  }, [newsData]);

  const products = [
    { href: "https://travel-tech.hebent.tech", label: t("travel") },
    { href: "https://logtech.hebent.tech", label: t("logistics") },
    { href: `${locale}/products/eventtech`, label: t("events") },
    // { href: "https://eventtech.hebent.tech", label: t("events") },
  ];

  const otherPages = [
    { href: "/project", label: t("projects") },
    { href: "/newsroom", label: t("newsroom") },
    { href: "/about", label: t("about") },
    { href: "/careers", label: t("careers") },
    { href: "/contacts", label: t("contacts") },
  ];

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-100 bg-black text-white font-vox overflow-y-auto overscroll-contain pb-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 pt-32 lg:pt-42 pb-10 min-h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 xl:gap-12"
            >
              <div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                  style={{ transformOrigin: "left" }}
                  className="h-px bg-white"
                />
                <div className="flex items-center justify-between pt-3">
                  <span className="text-xs tracking-widest text-[#b9b9b9] uppercase">
                    {t("products")}
                  </span>
                </div>
                <ul className="mt-6 flex flex-col gap-5">
                  {products.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        onClick={onClose}
                        className="group inline-flex items-baseline gap-2 text-2xl lg:text-4xl font-medium hover:text-white/70 transition"
                      >
                        <span className="text-white/40 text-lg lg:text-2xl">
                          ↳
                        </span>
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
                  style={{ transformOrigin: "left" }}
                  className="h-px bg-white"
                />
                <div className="flex items-center justify-between pt-3">
                  <span className="text-xs tracking-widest text-[#b9b9b9] uppercase">
                    {t("newsroom")}
                  </span>
                  <Link
                    href="/newsroom"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs tracking-widest uppercase underline underline-offset-4 hover:text-white/70 group transition"
                  >
                    {t("newsroom")}
                    <HiArrowUpRight
                      className="size-3 group-hover:translate-x-1 transition-transform duration-300"
                      aria-hidden
                    />
                  </Link>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4">
                  {latestNews.length === 0 ? (
                    <p className="text-sm text-white/50 sm:col-span-2">—</p>
                  ) : (
                    latestNews.map((item) => (
                      <NewsCard
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        title={item[`title_${locale}`] ?? ""}
                        text={item[`text_${locale}`] ?? ""}
                        dateLabel={formatNewsDate(item.created_at, locale)}
                        isoDate={item.created_at}
                        onNavigate={onClose}
                        light
                      />
                    ))
                  )}
                </div>
              </div>

              <div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
                  style={{ transformOrigin: "left" }}
                  className="h-px bg-white"
                />
                <div className="flex items-center justify-between pt-3">
                  <span className="text-xs tracking-widest text-[#b9b9b9] uppercase">
                    {t("company")}
                  </span>
                </div>
                <ul className="mt-6 flex flex-col gap-5">
                  {otherPages.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        onClick={onClose}
                        className="inline-flex items-baseline gap-2 text-2xl lg:text-4xl font-medium hover:text-white/70 transition"
                      >
                        <span className="text-white/40 text-lg lg:text-2xl">
                          ↳
                        </span>
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
