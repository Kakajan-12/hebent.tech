"use client";

import { useTranslations } from "next-intl";
import { HiArrowUpRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/app/Interfaces/interfaces";
import useAppLocale from "@/app/Hooks/GetLocale";
import { stripHtmlTags } from "@/lib/utils";

export default function ProjectRow({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const locale = useAppLocale();
  const title = stripHtmlTags(project[`title_${locale}`] ?? "");
  const text = stripHtmlTags(project[`text_${locale}`] ?? "");

  return (
    <li className="border-b border-[#0A0A0A]">
      <Link
        href={`/project/${project.id}`}
        className="group grid grid-cols-1 items-center gap-3 py-6 md:grid-cols-3 md:gap-10 lg:py-10"
      >
        <h3 className="font-play text-2xl font-bold tracking-tight text-[#0A0A0A] transition-transform duration-500 group-hover:translate-x-2 lg:text-4xl">
          {title}
        </h3>
        <div className="col-span-2 flex flex-col gap-5 md:gap-10 pl-24 md:pl-0 md:flex-row">
          <p className="line-clamp-3 md:max-w-sm lg:max-w-md text-sm font-normal leading-snug lg:text-lg">
            {text}
          </p>
          <span className="flex w-full shrink-0 self-center md:ml-auto md:w-36 items-center justify-between gap-2 font-bold text-[#717182] border-b border-[#717182] pb-1 text-xs lg:w-50 lg:text-sm">
            {t("learnMore")}
            <HiArrowUpRight
              aria-hidden
              className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:size-4"
            />
          </span>
        </div>
      </Link>
    </li>
  );
}
