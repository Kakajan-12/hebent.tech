"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/content";
import "./project.css";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("Projects.items");

  return (
    <article className="group relative aspect-4/3 overflow-hidden bg-slate-200 shadow-sm cut-card">
      <Image
        src={project.imageSrc}
        alt=""
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black opacity-0 transition duration-300 group-hover:opacity-60" />
      <div className="absolute inset-0 flex flex-col justify-center items-center p-5 opacity-0 transition duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-semibold leading-snug text-white text-center">
          {t(`${project.sourceId}.title`)}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/85 text-center">
          {t(`${project.sourceId}.description`)}
        </p>
      </div>
    </article>
  );
}
