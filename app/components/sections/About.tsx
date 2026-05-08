"use client";

import { useTranslations } from "next-intl";
import StatCard from "@/app/components/StatCard";
import { ClipLoader } from "react-spinners";
import { Statistic } from "@/app/Interfaces/interfaces";
import useAppLocale from "@/app/Hooks/GetLocale";
import { useGetStatisticsQuery } from "@/app/api/api";

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

export default function AboutSection() {
  const tAbout = useTranslations("About");
  const locale = useAppLocale();
  const { data, error, isLoading } = useGetStatisticsQuery();

  const statistics: Statistic[] = Array.isArray(data) ? data : [];

  // if (isLoading) {
  //   return <ClipLoader color="#000" size={32} />;
  // }

  if (error) {
    return <div>Error loading statistics</div>;
  }

  if (!statistics.length) {
    return (
      <div className="text-center text-lg leading-relaxed md:text-xl">
        No statistics found
      </div>
    );
  }

  return (
    <section className="mb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="mx-auto font-nexa text-center text-lg leading-relaxed md:text-xl">
          {tAbout("body")}
        </p>
        <div className="mt-12 grid grid-cols-2 justify-items-center gap-4 lg:grid-cols-4 lg:gap-6 mx-0 md:mx-18 lg:mx-0">
          {isLoading ? (
            <ClipLoader color="#000" size={32} />
          ) : (
            statistics.map((s) => (
              <StatCard
                key={s.id}
                value={stripHtmlTags(s.count.toString())}
                label={stripHtmlTags(s[`title_${locale}`])}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
