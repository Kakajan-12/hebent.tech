"use client";

import { FiSearch } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import Pagination from "@/app/components/Pagination";
import ProjectCard from "@/app/components/Projects/ProjectCard";
import { expandProjects } from "@/lib/content";

const PAGE_SIZE = 9;
const ALL = expandProjects();

export default function ProjectsClient() {
  const t = useTranslations("ProjectsPage");
  const tItems = useTranslations("Projects.items");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"single" | "title">("title");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = ALL;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        tItems(`${p.sourceId}.title`).toLowerCase().includes(q),
      );
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
      className="flex-1 mt-30 lg:mt-50 xl:mt-60 container mx-auto min-h-screen
    "
    >
      <div className="mx-auto px-5 sm:px-10 lg:px-12 2xl:px-0 pb-8 xl:pb-48">
        <p className="max-w-5xl text-left text-xl lg:text-4xl xl:text-5xl leading-relaxed lg:leading-snug">
          {t("heroBefore")}{" "}
          <span className="font-semibold text-brand-blue">{t("designed")}</span>{" "}
          {t("and")}{" "}
          <span className="font-semibold text-brand-blue">{t("built")}</span>{" "}
          {t("heroAfter")}
        </p>
        <div className="mt-10 flex flex-col gap-5 md:flex-row items-end md:items-center md:justify-between">
          <label htmlFor="search" className="relative block w-full md:max-w-md">
            <input
              id="search"
              type="search"
              placeholder={t("searchPlaceholder")}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="font-nexa font-light w-full rounded-4xl border-2 border-[#ABB7C2] py-2 pl-6 pr-14 text-xs lg:text-sm xl:text-base shadow-sm outline-none transition-all placeholder:text-[#ABB7C2] focus:border-slate-400"
            />

            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <FiSearch className="size-4 text" />
            </div>
          </label>
          <div className="sort-by flex shrink-0 items-center gap-2">
            <select
              id="sort"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as "single" | "title");
                setPage(1);
              }}
              className="rounded-2xl border-2 border-[#ABB7C2] text-[#7E7E7E] px-4 py-2 text-xs lg:text-sm xl:text-base font-light shadow-sm outline-none focus:ring-1 focus:ring-brand/30"
            >
              <option value="single">{t("sortSingle")}</option>
              <option value="title">{t("sortTitle")}</option>
            </select>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
