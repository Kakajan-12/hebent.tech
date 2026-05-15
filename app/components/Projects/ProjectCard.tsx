"use client";

import Image from "next/image";
import type { Project } from "@/app/Interfaces/interfaces";
import { useRouter } from "@/i18n/navigation";
import { resolveMediaUrl } from "@/constant/constant";
import useAppLocale from "@/app/Hooks/GetLocale";
type ProjectCardProps = {
  project: Project;
};

function stripHtmlTags(value?: string): string {
  return (value ?? "").replace(/<[^>]*>/g, "").trim();
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const locale = useAppLocale();
  const title = stripHtmlTags(project[`title_${locale}`]);
  const text = stripHtmlTags(project[`text_${locale}`]);

  const goToProject = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <div className="cut-card bg-brand p-px">
      <article
        className="group relative aspect-square cut-card bg-background-main"
        onClick={goToProject}
      >
        <Image
          src={resolveMediaUrl(project.image)}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-contain transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-60 transition duration-300 lg:opacity-0 lg:group-hover:opacity-60" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center items-center p-5 opacity-100 transition duration-300 lg:opacity-0 lg:group-hover:opacity-100">
          <h3 className="text-lg font-semibold leading-snug text-white text-center">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-white/85 text-center">
            {text}
          </p>
        </div>
      </article>
    </div>
  );
}
