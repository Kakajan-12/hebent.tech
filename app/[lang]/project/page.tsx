"use client";

import { FiSearch } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import Pagination from "@/app/components/Pagination";
import ProjectCard from "@/app/components/Projects/ProjectCard";
import { expandProjects } from "@/lib/content";

const PAGE_SIZE = 9;
const ALL = expandProjects(90);

export default function ProjectsClient() {
  const t = useTranslations("ProjectsPage");
  const tItems = useTranslations("Projects.items");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"single" | "title">("single");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = ALL;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const title = tItems(`${p.sourceId}.title`).toLowerCase();
        const desc = tItems(`${p.sourceId}.description`).toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }
    if (sort === "title") {
      list = [...list].sort((a, b) =>
        tItems(`${a.sourceId}.title`).localeCompare(
          tItems(`${b.sourceId}.title`),
        ),
      );
    }
    return list;
  }, [query, sort, tItems]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <main
      className="flex-1 mt-30 lg:mt-60 container mx-auto min-h-screen
    "
    >
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <p className="max-w-4xl text-left text-xl lg:text-4xl leading-relaxed">
          {t("heroBefore")}{" "}
          <span className="font-semibold text-brand-blue">{t("designed")}</span>{" "}
          {t("and")}{" "}
          <span className="font-semibold text-brand-blue">{t("built")}</span>{" "}
          {t("heroAfter")}
        </p>
        {/* <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="relative block flex-1 md:max-w-xl">
            <span className="sr-only">{t("searchAria")}</span>
            <input
              aria-label={t("searchAria")}
              id="search"
              aria-labelledby="search"
              type="search"
              placeholder={t("searchPlaceholder")}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none ring-brand/30 placeholder:text-slate-400 focus:ring-2"
            />
            <FiSearch
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
          </label>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-sm text-slate-500">{t("sortBy")}</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as "single" | "title");
                setPage(1);
              }}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="single">{t("sortSingle")}</option>
              <option value="title">{t("sortTitle")}</option>
            </select>
          </div>
        </div> */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
          <label className="relative block w-full md:max-w-2xl">
            <span className="sr-only">{t("searchAria")}</span>

            <input
              type="search"
              placeholder="Search ..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              /* Ключевые изменения:
         - rounded-full для идеального овала
         - py-4 для большей высоты (как на макете)
         - border-[#d1d5db] или аналогичный мягкий цвет
         - pl-6 (текст начинается дальше)
      */
              className="w-full rounded-full border border-slate-300 bg-white py-4 pl-6 pr-14 text-lg text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-400"
            />

            {/* Иконка справа, как в Figma */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <FiSearch className="size-6 text-slate-900" />
            </div>
          </label>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slice.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </main>
  );
}
