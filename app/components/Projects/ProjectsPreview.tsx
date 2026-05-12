"use client";

import { useTranslations } from "next-intl";
import ProjectCard from "@/app/components/Projects/ProjectCard";
// import { Link } from "@/i18n/navigation";
import { useGetProjectsQuery } from "@/app/api/api";
import { Project } from "@/app/Interfaces/interfaces";
import { ClipLoader } from "react-spinners";

export default function ProjectsPreview() {
  const t = useTranslations("ProjectsPreview");
  const { data, error, isLoading } = useGetProjectsQuery();
  const projects: Project[] = Array.isArray(data) ? data : [];
  const slice = projects.slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 ">
          <h2 className="text-3xl font-vox font-bold tracking-tight text-slate-900 md:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <div className="col-span-full flex justify-center py-6">
              <ClipLoader color="#0043d8" size={20} />
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
        </div>
      </div>
    </section>
  );
}
