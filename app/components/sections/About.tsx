"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
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
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 flex flex-col gap-4 lg:gap-8 items-center justify-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="block text-center text-lg md:text-xl font-vox leading-none lg:leading-relaxed"
      >
        {tAbout("body")}
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
        }}
        className="grid justify-items-center gap-2 md:gap-8 grid-cols-4 w-full"
      >
        {statistics.map((s) => (
          <motion.div
            key={s.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            className="w-full h-full"
          >
            <StatCard
              value={stripHtmlTags(s.count.toString())}
              label={stripHtmlTags(s[`title_${locale}`])}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
