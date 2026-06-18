"use client";

import { useTranslations } from "next-intl";
import JobListing from "@/app/components/careers/JobListing";
import { useGetVacanciesQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { Vacancy } from "@/app/Interfaces/interfaces";
import Loading from "@/components/ui/Loading";
import { motion } from "motion/react";
import Heading from "@/components/Heading";

export default function CareersPage() {
  const t = useTranslations("Careers");
  const locale = useAppLocale();
  const { data, error, isLoading } = useGetVacanciesQuery();

  const jobs: Vacancy[] = Array.isArray(data) ? data : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-5 container mx-auto px-5 lg:px-10"
    >
      <Heading
        title={t.rich("title", { br: () => <br /> })}
        description={t("text")}
      />
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mt-10 lg:mt-15 font-vox text-xl font-bold md:text-4xl lg:text-5xl text-left "
      >
        {t("vacancies")}
      </motion.h3>

      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mt-6 border-t border-black pt-0"
      >
        {isLoading && (
          <li className="flex justify-center items-center py-6 font-vox text-sm md:text-base">
            <Loading size="sm" />
          </li>
        )}
        {error && !isLoading && (
          <li className="flex justify-center items-center py-6 font-vox text-sm md:text-base text-red-700">
            Failed to load vacancies.
          </li>
        )}
        {!isLoading && !error && jobs.length === 0 && (
          <li className="flex justify-center items-center py-6 font-vox text-sm md:text-base">
            No vacancies available right now.
          </li>
        )}
        {[...jobs].reverse().map((job) => (
          <JobListing
            key={job.id}
            id={job.id}
            title={job[`title_${locale}`]}
            text={job[`text_${locale}`]}
          />
        ))}
      </motion.ul>
    </motion.section>
  );
}
