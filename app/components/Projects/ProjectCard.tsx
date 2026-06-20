"use client";

import Image from "next/image";
import type { Project } from "@/app/Interfaces/interfaces";
import { useRouter } from "@/i18n/navigation";
import { resolveMediaUrl } from "@/constant/constant";
import useAppLocale from "@/app/Hooks/GetLocale";
import { stripHtmlTags } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  small?: boolean;
};

export default function ProjectCard({
  project,
  small = false,
}: ProjectCardProps) {
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
        className="group relative cut-card aspect-square  bg-linear-to-tr  from-[#233086] via-[#1348BD] to-[#0063FE] flex justify-center items-center "
        onClick={goToProject}
      >
        <div className="absolute inset-0 bg-white opacity-0 transition duration-300 lg:group-hover:opacity-100" />
        <Image
          src={resolveMediaUrl(project.image)}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className={`object-contain transition duration-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 ${
            small ? "scale-85 group-hover:scale-90 " : "group-hover:scale-100"
          }`}
        />

        <h3 className="font-vox text-xl md:text-4xl lg:text-5xl font-semibold leading-snug text-white text-center opacity-100 group-hover:opacity-0 transition duration-300">
          {title}
        </h3>
        <p className="line-clamp-3 text-sm font-semibold text-black text-center pointer-events-none absolute inset-0 flex flex-col justify-center items-center p-5 opacity-100 transition duration-300 lg:opacity-0">
          {text}
        </p>
      </article>
    </div>
  );
}
