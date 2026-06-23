"use client";

import Image from "next/image";
import type { Project } from "@/app/Interfaces/interfaces";
import { useRouter } from "@/i18n/navigation";
import { resolveMediaUrl } from "@/constant/constant";
import useAppLocale from "@/app/Hooks/GetLocale";
import { stripHtmlTags } from "@/lib/utils";
import pattern from "../../../public/pattern.svg";

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

  const goToProject = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <article
      className="group relative cut-card bg-brand aspect-square flex justify-center items-center hover:bg-white"
      onClick={goToProject}
    >
      <div
        className="absolute inset-0 opacity-100 transition duration-300 group-hover:opacity-0"
        style={{
          backgroundImage: `url(${pattern.src})`,
          backgroundSize: "700px",
          backgroundRepeat: "repeat",
        }}
        aria-hidden
      >
        {/* <div className="absolute inset-0 bg-white opacity-0 transition duration-300 lg:group-hover:opacity-100" /> */}
      </div>
      <Image
        src={resolveMediaUrl(project.image)}
        alt={title}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        className={`object-contain transition duration-500 opacity-0  group-hover:opacity-100 ${
          small
            ? "scale-75 group-hover:scale-80 "
            : "scale-80 group-hover:scale-85"
        }`}
      />

      <h3 className="relative z-20 px-4 font-vox text-5xl md:text-4xl xl:text-5xl font-medium leading-snug text-white text-center opacity-100 group-hover:opacity-0 transition duration-300">
        {title}
      </h3>
      {/* <p className="line-clamp-3 text-sm font-semibold text-black text-center pointer-events-none absolute inset-0 flex flex-col justify-center items-center p-5 opacity-100 transition duration-300 md:opacity-0">
        {text}
      </p> */}
    </article>
  );
}
