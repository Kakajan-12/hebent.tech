"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import NewsCard from "@/app/components/Newsroom/NewsCard";
import {
  NEWS_CATEGORY_IDS,
  NEWS_ITEMS,
  type NewsCategoryId,
} from "@/lib/newsroom";

function formatNewsDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

export default function NewsroomPage() {
  const t = useTranslations("Newsroom");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<NewsCategoryId>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return NEWS_ITEMS;
    return NEWS_ITEMS.filter((n) => n.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="flex-1 container mx-auto min-h-screen">
      <section className="my-24 md:my-32 lg:my-48 px-5 sm:px-10 xl:px-0">
        <div className="flex flex-col lg:flex-row gap-4 text-[#1E2124] lg:items-start lg:gap-46 xl:gap-60 px-0 lg:px-10">
          <h2 className="font-vox text-3xl font-bold tracking-tight lg:text-5xl">
            {t("title")}
          </h2>
          <p className="font-vox text-sm lg:text-xl xl:text-3xl">
            {t("description")}
          </p>
        </div>

        <nav className="mt-8 lg:mt-16" aria-label={t("categoriesAria")}>
          <ul className="font-nexa flex gap-x-4 gap-y-3 text-sm md:text-xl text-[#1E2124] md:gap-x-8 overflow-x-auto scrollbar-hide">
            {NEWS_CATEGORY_IDS.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(id)}
                  className={
                    activeCategory === id
                      ? "font-bold text-[#1E2124] whitespace-nowrap"
                      : "font-normal text-slate-600 transition hover:text-[#1E2124] whitespace-nowrap"
                  }
                >
                  {t(`categories.${id}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:mt-8 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {filtered.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              dateLabel={formatNewsDate(item.date, locale)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
