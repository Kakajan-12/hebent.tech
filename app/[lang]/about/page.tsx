import { getTranslations, setRequestLocale } from "next-intl/server";
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

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);

  // const tNav = await getTranslations("Nav");
  const t = await getTranslations("About");

  const items = ACCORDION_IDS.map((id) => ({
    id,
    title: t(`accordion.${id}.title`),
    content: t(`accordion.${id}.content`),
  }));

  return (
    <section className="min-h-screen mt-28 md:mt-36 lg:mt-48 mb-5">
      <h2 className="container mx-auto font-nexa text-5xl md:text-6xl font-bold tracking-tight mb-6 lg:mb-12 text-left px-6 md:px-20 lg:px-10">
        {t("title")}
      </h2>
      <div className="mx-auto">
        <p className="block lg:hidden container mx-auto font-vox text-sm lg:text-xl leading-relaxed px-6 md:px-20 lg:px-8">
          {t("body")}
        </p>
        <AboutSection />
        <AboutAccordion items={items} defaultOpenId="vision" />
      </div>
    </section>
  );
}
