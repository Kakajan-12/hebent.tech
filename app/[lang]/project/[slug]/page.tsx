import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { expandProjects } from "@/lib/content";
import Image from "next/image";
import { InfoSection } from "@/app/components/Projects/InfoSection";

const PROJECTS_ITEMS = expandProjects();

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  setRequestLocale(lang);

  const project = PROJECTS_ITEMS.find((p) => p.sourceId === slug);
  if (!project) notFound();

  const t = await getTranslations("Projects.items");
  const tPage = await getTranslations("ProjectsPage");

  const title = t(`${slug}.title`);

  return (
    <main className="relative min-h-screen">
      <div className="absolute top-0 left-0 h-90 sm:h-112 lg:h-140 xl:h-160 w-full z-10">
        <Image
          src={project.imageSrc}
          alt={title}
          fill
          className="object-cover w-full h-full"
          sizes="100vw"
          priority
        />
      </div>
      <div className="header-info absolute top-36 sm:top-60 lg:top-80 right-0 text-white flex flex-col gap-2 z-20">
        <h1 className="max-w-sm sm:max-w-4xl font-nexa text-3xl lg:text-4xl xl:text-6xl font-bold leading-7 lg:leading-12 tracking-tight text-right mr-7 lg:mr-20 xl:mr-40">
          {title}
        </h1>
        <div className="flex flex-col gap-2 ml-auto mr-7 lg:mr-20 xl:mr-40">
          <p className="font-nexa text-sm lg:text-xl xl:text-2xl font-light tracking-wide text-left mt-8">
            <span className="font-bold">{tPage("customer")}:</span>{" "}
            {t(`${slug}.customer`)}
          </p>
          <a
            href={project.webSite}
            className="font-nexa text-sm lg:text-xl xl:text-2xl font-light text-left"
          >
            <span className="font-bold">{tPage("webSite")}:</span>{" "}
            {t(`${slug}.webSite`)}
          </a>
        </div>
      </div>
      <InfoSection />
    </main>
  );
}
