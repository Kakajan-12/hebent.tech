"use client";

import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import Pagination from "@/app/components/Pagination";
import { useGetProjectsQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { Project } from "@/app/Interfaces/interfaces";
import { resolveMediaUrl } from "@/constant/constant";
import { useRouter } from "@/i18n/navigation";
import "@/app/components/Projects/project.css";

const PAGE_SIZE = 9;
const LG = "(min-width: 1024px)";
const DOUBLE_TAP_MS = 320;
function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

type SortKey = "single" | "title";

const SORT_OPTIONS: SortKey[] = ["single", "title"];

export default function ProjectsClient() {
  const t = useTranslations("ProjectsPage");
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
    single: t("sortSingle"),
    title: t("sortTitle"),
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
    return list;
  }, [projects, query, sort, locale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <main className="flex-1 mt-30 lg:mt-50 container mx-auto min-h-screen">
      <div className="mx-auto px-5 sm:px-10 lg:px-12 2xl:px-0 pb-8 xl:pb-48">
        <p className="max-w-5xl text-left text-xl lg:text-3xl leading-relaxed lg:leading-snug">
          {t("heroBefore")}{" "}
          <span className="font-semibold text-brand">{t("designed")}</span>{" "}
          {t("and")}{" "}
          <span className="font-semibold text-brand">{t("built")}</span>{" "}
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
          <div
            ref={sortRef}
            className="sort-by relative shrink-0 w-full md:w-auto"
          >
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((o) => !o)}
              className="flex w-full md:w-80 items-center justify-between gap-4 rounded-full border-2 border-[#ABB7C2] text-[#7E7E7E] px-6 py-3 text-sm lg:text-base font-light shadow-sm outline-none transition focus:border-slate-400"
            >
              <span>
                {t("sortBy")}
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
                className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border-2 border-[#ABB7C2] bg-white shadow-lg"
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
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectsLoading && (
            <div className="col-span-full py-6 flex justify-center">
              <ClipLoader color="#000" size={20} />
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
            <ProjectApiCard
              key={project.id}
              project={project}
              title={stripHtmlTags(project[`title_${locale}`])}
              text={stripHtmlTags(project[`text_${locale}`])}
            />
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

type ProjectApiCardProps = {
  project: Project;
  title: string;
  text: string;
};

function ProjectApiCard({ project, title, text }: ProjectApiCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLElement>(null);
  const lastTapRef = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = resolveMediaUrl(project.image);

  useEffect(() => {
    const mql = window.matchMedia(LG);
    const onChange = () => {
      if (mql.matches) {
        setIsOpen(false);
        lastTapRef.current = 0;
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia(LG).matches || !isOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (cardRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
      lastTapRef.current = 0;
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [isOpen]);

  const goToProject = () => {
    router.push(`/project/${project.id}`);
  };

  const handleCardClick = () => {
    if (window.matchMedia(LG).matches) {
      goToProject();
      return;
    }
    const now = Date.now();
    const delta = now - lastTapRef.current;
    if (lastTapRef.current > 0 && delta < DOUBLE_TAP_MS) {
      lastTapRef.current = 0;
      goToProject();
      return;
    }
    lastTapRef.current = now;
    setIsOpen((open) => !open);
  };

  return (
    <article
      ref={cardRef}
      className="group relative aspect-square overflow-hidden shadow-sm cut-card max-lg:cursor-pointer lg:cursor-pointer"
      onClick={handleCardClick}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="pointer-events-none object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div
        className={`absolute inset-0 bg-black opacity-0 transition duration-300 lg:group-hover:opacity-60 ${
          isOpen ? "max-lg:opacity-60" : "max-lg:opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col justify-center items-center p-5 opacity-0 transition duration-300 lg:group-hover:opacity-100 ${
          isOpen ? "max-lg:opacity-100" : "max-lg:opacity-0"
        }`}
      >
        <h3 className="text-lg font-semibold leading-snug text-white text-center">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/85 text-center">
          {text}
        </p>
      </div>
    </article>
  );
}
