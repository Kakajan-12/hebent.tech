"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import NewsCard from "@/app/components/Newsroom/NewsCard";
import { useGetNewsQuery, useGetNewsCategoryQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { NewsItem, NewsCategory } from "@/app/Interfaces/interfaces";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";

function formatNewsDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function NewsroomPage() {
  const t = useTranslations("Newsroom");
  const locale = useAppLocale();
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");

  const {
    data: newsData,
    error: newsError,
    isLoading: newsLoading,
  } = useGetNewsQuery();
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetNewsCategoryQuery();

  const news: NewsItem[] = useMemo(
    () => (Array.isArray(newsData) ? newsData : []),
    [newsData],
  );
  const categories: NewsCategory[] = useMemo(
    () => (Array.isArray(categoryData) ? categoryData : []),
    [categoryData],
  );

  const filtered = useMemo(() => {
    if (activeCategory === "all") return news;
    return news.filter((n) => n.category_id === activeCategory);
  }, [activeCategory, news]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto min-h-screen px-5 lg:px-10 xl:px-20 2xl:px-36"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-4"
      >
        <h2 className="font-video text-3xl font-medium tracking-tight lg:text-5xl">
          {t("title")}
        </h2>
        <p className="font-video text-sm lg:text-xl xl:text-3xl">
          {t("description")}
        </p>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="mt-8 lg:mt-16"
        aria-label={t("categoriesAria")}
      >
        <ul className="flex gap-x-4 gap-y-3 text-sm md:text-xl text-[#1E2124] md:gap-x-8 overflow-x-auto scrollbar-hide">
          <li>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={
                activeCategory === "all"
                  ? "font-bold text-[#1E2124] whitespace-nowrap"
                  : "font-normal text-slate-600 transition hover:text-[#1E2124] whitespace-nowrap"
              }
            >
              {t("categories.all")}
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={
                  activeCategory === category.id
                    ? "font-bold text-[#1E2124] whitespace-nowrap"
                    : "font-normal text-slate-600 transition hover:text-[#1E2124] whitespace-nowrap"
                }
              >
                {category[`category_${locale}`]}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:mt-8 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6"
      >
        {(newsLoading || categoriesLoading) && (
          <div className="col-span-full py-6 flex justify-center">
            <ClipLoader color="#0043d8" size={50} />
          </div>
        )}
        {newsError && !newsLoading && (
          <div className="col-span-full py-6 font-vox text-sm md:text-base text-red-700 text-center">
            Failed to load news.
          </div>
        )}
        {!newsLoading && !newsError && filtered.length === 0 && (
          <div className="col-span-full py-6 font-vox text-sm md:text-base text-center">
            No news available right now.
          </div>
        )}
        {filtered.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item[`title_${locale}`]}
            text={item[`text_${locale}`]}
            dateLabel={formatNewsDate(item.created_at, locale)}
            isoDate={item.created_at}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
