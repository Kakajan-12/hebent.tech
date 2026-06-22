"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import StatCard from "@/app/components/StatCard";
import Loading from "@/components/ui/Loading";
import { Statistic } from "@/app/Interfaces/interfaces";
import useAppLocale from "@/app/Hooks/GetLocale";
import { useGetStatisticsQuery } from "@/app/api/api";
import Logo from "@/components/ui/Logo";
import { stripHtmlTags } from "@/lib/utils";

export default function AboutSection({
  showLogo = false,
  showTitle = true,
}: {
  showLogo?: boolean;
  showTitle?: boolean;
}) {
  const tAbout = useTranslations("About");
  const locale = useAppLocale();
  const { data, error, isLoading } = useGetStatisticsQuery();

  const statistics: Statistic[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loading size="sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg md:text-xl h-screen flex items-center justify-center">
        Error loading statistics
      </div>
    );
  }

  if (!statistics.length) {
    return (
      <div className="text-center text-lg md:text-xl h-screen flex items-center justify-center">
        No statistics found
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto px-5 lg:px-10 flex flex-col gap-4 md:gap-10 xl:gap-20 items-center justify-center"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          },
        }}
        className="flex flex-col lg:flex-row items-start lg:items-center w-full justify-center lg:justify-start gap-4"
      >
        {showLogo && (
          <div className="flex items-center justify-end w-full lg:w-1/2">
            <Logo />
          </div>
        )}
        {showTitle && (
          <h2 className="block lg:hidden capitalize font-vox font-bold text-2xl md:text-3xl leading-tight text-right whitespace-nowrap">
            {tAbout("title")}
          </h2>
        )}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className={`text-lg md:text-2xl lg:text-3xl font-medium  lg:w-1/2 ${showTitle ? "lg:w-1/2 text-left" : "lg:w-full text-center"}`}
        >
          {tAbout("body")}
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
          },
        }}
        className="grid justify-items-center gap-2 md:gap-8 grid-cols-2 md:grid-cols-4 w-full"
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
