"use client";

import { FiSearch } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import Loading from "@/components/ui/Loading";
import Pagination from "@/app/components/Pagination";
import ProjectCard from "@/app/components/Projects/ProjectCard";
import { useGetProjectsQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { Project } from "@/app/Interfaces/interfaces";
import { motion } from "motion/react";
import TypingText from "@/components/ui/TypingText";
import { stripHtmlTags } from "@/lib/utils";
import Heading from "@/components/Heading";

const PAGE_SIZE = 9;

function projectCreatedMs(p: Project): number | null {
  const raw = p.created_at;
  if (!raw) return null;
  const ms = Date.parse(raw);
  return Number.isNaN(ms) ? null : ms;
}

type SortKey = "single" | "title" | "date";

const SORT_OPTIONS: SortKey[] = ["single", "title", "date"];

export default function ProjectsClient() {
  const t = useTranslations("Projects");
  const locale = useAppLocale();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("single");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!sortOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (sortRef.current?.contains(e.target as Node)) return;
      setSortOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [sortOpen]);

  const sortLabel: Record<SortKey, string> = {
    single: t("sort-single"),
    title: t("sort-title"),
    date: t("sort-date"),
  };

  const {
    data: projectsData,
    error: projectsError,
    isLoading: projectsLoading,
  } = useGetProjectsQuery();

  const projects: Project[] = useMemo(
    () => (Array.isArray(projectsData) ? projectsData : []),
    [projectsData],
  );

  const filtered = useMemo(() => {
    let list = projects;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p[`title_${locale}`].toLowerCase().includes(q));
    }
    if (sort === "title") {
      list = [...list].sort((a, b) =>
        stripHtmlTags(a[`title_${locale}`]).localeCompare(
          stripHtmlTags(b[`title_${locale}`]),
          locale,
          { sensitivity: "base", numeric: true },
        ),
      );
    }
    if (sort === "date") {
      list = [...list].sort((a, b) => {
        const ta = projectCreatedMs(a);
        const tb = projectCreatedMs(b);
        if (ta != null && tb != null) return tb - ta;
        if (ta != null) return -1;
        if (tb != null) return 1;
        return b.id - a.id;
      });
    }
    return list;
  }, [projects, query, sort, locale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto px-5 lg:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="flex flex-col gap-5 lg:gap-15"
      >
        <Heading
          title={t("title")}
          description={
            <>
              {t("heroBefore")}{" "}
              <TypingText
                as="span"
                key={t("designed")}
                text={t("designed")}
                speed={120}
                animateOn="view"
                className="text-brand"
              />{" "}
              {t("and")}{" "}
              <TypingText
                as="span"
                key={t("built")}
                text={t("built")}
                speed={120}
                animateOn="view"
                className="text-brand"
              />
              {t("heroAfter")}
            </>
          }
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-5 md:flex-row items-center md:justify-between font-light text-xs lg:text-sm xl:text-base w-full"
        >
          <label
            htmlFor="search"
            className="relative flex h-10 w-full items-center justify-between rounded-sm border border-[#ABB7C2] px-3 shadow-sm md:w-102 cursor-pointer"
          >
            <input
              id="search"
              type="search"
              placeholder={t("search-placeholder")}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="h-full min-h-0 min-w-0 items-center flex-1 bg-transparent py-0 outline-none transition-all placeholder:text-[#ABB7C2] focus:border-slate-400 cursor-pointer"
            />
            <span
              className={`flex shrink-0 items-center transition-opacity duration-150 ${
                query.trim() ? "hidden" : ""
              }`}
            >
              <FiSearch className="size-5 text-[#ABB7C2]" aria-hidden />
            </span>
          </label>
          <div ref={sortRef} className="w-full md:w-102 relative z-20">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((o) => !o)}
              className="flex h-10 w-full items-center justify-between gap-4 rounded-sm border border-[#ABB7C2] px-3 text-[#7E7E7E] shadow-sm outline-none transition focus:border-slate-400"
            >
              <span>
                {t("sorted")}
                {sortLabel[sort]}
              </span>
              <FaChevronDown
                className={`size-3 transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {sortOpen && (
              <ul
                role="listbox"
                className="absolute top-0 rounded border border-[#ABB7C2] bg-white shadow-lg z-30 w-full"
              >
                {SORT_OPTIONS.map((key) => (
                  <li key={key} role="option" aria-selected={sort === key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSort(key);
                        setPage(1);
                        setSortOpen(false);
                      }}
                      className={`block w-full px-6 py-2.5 text-left text-sm lg:text-base font-light transition ${
                        sort === key
                          ? "bg-[#F2F4F7] text-[#1F1F1F]"
                          : "text-[#7E7E7E] hover:bg-[#F2F4F7]"
                      }`}
                    >
                      {sortLabel[key]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {projectsLoading && (
            <div className="col-span-full py-6 flex justify-center">
              <Loading size="sm" />
            </div>
          )}
          {projectsError && !projectsLoading && (
            <div className="col-span-full py-6 font-vox text-sm md:text-base text-red-700 text-center">
              Failed to load projects.
            </div>
          )}
          {!projectsLoading && !projectsError && slice.length === 0 && (
            <div className="col-span-full py-6 font-vox text-sm md:text-base text-center">
              No projects available right now.
            </div>
          )}
          {slice.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </motion.div>
    </motion.main>
  );
}
