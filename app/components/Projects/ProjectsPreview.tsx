"use client";

import { useTranslations } from "next-intl";
import ProjectCard from "@/app/components/Projects/ProjectCard";
import { motion } from "motion/react";
import { useGetProjectsQuery } from "@/app/api/api";
import { Project } from "@/app/Interfaces/interfaces";
import Loading from "@/components/ui/Loading";

export default function ProjectsPreview() {
  const t = useTranslations("ProjectsPreview");
  const { data, error, isLoading } = useGetProjectsQuery();
  const projects: Project[] = Array.isArray(data) ? data : [];
  const slice = projects.slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-wrap items-end justify-between gap-4 "
        >
          <h2 className="text-3xl font-vox font-bold tracking-tight text-slate-900 md:text-4xl">
            {t("title")}
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {isLoading && (
            <div className="col-span-full flex justify-center py-6">
              <Loading size="sm" />
            </div>
          )}
          {error && !isLoading && (
            <div className="col-span-full py-6 text-center text-sm text-red-700 md:text-base">
              Failed to load projects.
            </div>
          )}
          {!isLoading && !error && slice.length === 0 && (
            <div className="col-span-full py-6 text-center text-sm md:text-base">
              No projects available right now.
            </div>
          )}
          {slice.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
