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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <ClipLoader color="#0043d8" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg md:text-xl">
        Error loading statistics
      </div>
    );
  }

  if (!statistics.length) {
    return (
      <div className="text-center text-lg md:text-xl">No statistics found</div>
    );
  }

  return (
    <section className="container mx-auto px-5 lg:px-10 flex flex-col gap-4 lg:gap-8 items-center justify-center">
      {/* <div className="flex flex-col gap-4 lg:gap-8 items-center justify-center px-5 lg:px-10 w-full"> */}
      <p className="block text-center text-lg md:text-xl font-vox leading-none">
        {tAbout("body")}
      </p>
      <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-4 w-full">
        {statistics.map((s) => (
          <StatCard
            key={s.id}
            value={stripHtmlTags(s.count.toString())}
            label={stripHtmlTags(s[`title_${locale}`])}
          />
        ))}
        {/* </div> */}
      </div>
    </section>
  );
}
