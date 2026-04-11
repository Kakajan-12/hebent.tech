import { getTranslations } from "next-intl/server";
import ProjectCard from "@/app/components/Projects/ProjectCard";
import { Link } from "@/i18n/navigation";
import { PROJECT_BASES } from "@/lib/content";

export default async function ProjectsPreview() {
  const t = await getTranslations("ProjectsPreview");
  const slice = PROJECT_BASES.slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slice.map((p) => (
            <ProjectCard
              key={p.id}
              project={{ id: p.id, sourceId: p.id, imageSrc: p.imageSrc }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
