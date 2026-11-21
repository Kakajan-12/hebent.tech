"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ProjectPreviewCard from "@/app/components/Projects/ProjectPreviewCard";
import { motion } from "motion/react";
import { useGetProjectsQuery } from "@/app/api/api";
import { Project } from "@/app/Interfaces/interfaces";
import { useRouter } from "@/i18n/navigation";
import { resolveMediaUrl } from "@/constant/constant";
import useAppLocale from "@/app/Hooks/GetLocale";
import { stripHtmlTags } from "@/lib/utils";
import Loading from "@/components/ui/Loading";

const MAX_PROJECTS = 9;

export default function ProjectsPreview() {
  const t = useTranslations("ProjectsPreview");
  const locale = useAppLocale();
  const router = useRouter();
  const { data, error, isLoading } = useGetProjectsQuery();
  const projects: Project[] = Array.isArray(data)
    ? data.slice(0, MAX_PROJECTS)
    : [];
  const [activeId, setActiveId] = useState<number | null>(null);

  const titleOf = (project: Project) =>
    stripHtmlTags(project[`title_${locale}`]);
  const open = (project: Project) => router.push(`/project/${project.id}`);

  return (
    <section className="py-6 lg:py-24">
      <div className="container mx-auto px-5 lg:px-10">
        <h2 className="text-3xl font-play font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>

        {isLoading && (
          <div className="flex justify-center py-6">
            <Loading size="sm" />
          </div>
        )}
        {error && !isLoading && (
          <div className="py-6 text-center text-sm text-red-700 md:text-base">
            Failed to load projects.
          </div>
        )}
        {!isLoading && !error && projects.length === 0 && (
          <div className="py-6 text-center text-sm md:text-base">
            No projects available right now.
          </div>
        )}

        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:gap-24"
            onMouseLeave={() => setActiveId(null)}
          >
            {/* Logo grid */}
            <div className="grid grid-cols-3">
              {projects.map((project) => (
                <ProjectPreviewCard
                  key={project.id}
                  image={resolveMediaUrl(project.image)}
                  title={titleOf(project)}
                  active={activeId === project.id}
                  onClick={() => open(project)}
                  onMouseEnter={() => setActiveId(project.id)}
                />
              ))}
            </div>

            {/* Titles list */}
            <ol className="flex flex-col border-t border-[#BFBFBF]">
              {projects.map((project, index) => {
                const active = activeId === project.id;
                return (
                  <li
                    key={project.id}
                    onClick={() => open(project)}
                    onMouseEnter={() => setActiveId(project.id)}
                    className="flex cursor-pointer items-start gap-4 border-b border-[#BFBFBF] py-4 md:gap-6 md:py-5"
                  >
                    <span
                      className={`font-play font-bold text-xs lg:text-base transition-colors duration-300 ${
                        active ? "text-black" : "text-[#717182]"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`pt-2 font-play font-bold text-base transition-all duration-300 md:text-xl ${
                        active ? "translate-x-2  text-black" : "text-[#616161]"
                      }`}
                    >
                      {titleOf(project)}
                    </span>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        )}
      </div>
    </section>
  );
}
