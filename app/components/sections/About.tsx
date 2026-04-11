import { getTranslations } from "next-intl/server";
import StatCard from "@/app/components/StatCard";
import { STATS_VALUES } from "@/lib/content";

export default async function AboutSection() {
  const tAbout = await getTranslations("About");
  const tStats = await getTranslations("Stats");

  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="hidden lg:block mx-auto font-vox text-center text-lg leading-relaxed md:text-xl">
          {tAbout("body")}
        </p>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 mx-0 md:mx-26 lg:mx-0">
          {STATS_VALUES.map((s) => (
            <StatCard
              key={s.labelKey}
              value={s.value}
              label={tStats(s.labelKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
