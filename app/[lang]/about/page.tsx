import { useTranslations } from "next-intl";
import AboutAccordion from "@/app/components/about/AboutAccordion";
import AboutSection from "@/app/components/sections/About";

const ACCORDION_IDS = [
  "mission",
  "vision",
  "process",
  "culture",
  "technologies",
  "values",
] as const;

export default function AboutPage() {
  // const tNav = await getTranslations("Nav");
  const t = useTranslations("About");

  const items = ACCORDION_IDS.map((id) => ({
    id,
    title: t(`accordion.${id}.title`),
    content: t(`accordion.${id}.content`),
  }));

  return (
    <section className="min-h-screen mb-5 flex flex-col gap-6 md:gap-12 container mx-auto px-5">
      <h2 className="container mx-auto text-5xl md:text-6xl font-bold text-left">
        {t("title")}
      </h2>
      <div className="mx-auto">
        <p className="block lg:hidden container mx-auto font-vox text-sm lg:text-xl leading-relaxed px-6 md:px-20 lg:px-8">
          {t("body")}
        </p>
        <AboutSection />
        <AboutAccordion items={items} />
      </div>
    </section>
  );
}
