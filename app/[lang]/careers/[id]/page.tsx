"use client";
import ApplicationForm from "@/app/components/careers/ApplicationForm";
import { useGetVacanciesQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import type { Vacancy } from "@/app/Interfaces/interfaces";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";

export default function CareerPage() {
  const t = useTranslations("Careers");
  const locale = useAppLocale();
  const params = useParams<{ id: string }>();
  const vacancyId = Number(params?.id);
  const { data, error, isLoading } = useGetVacanciesQuery();

  const vacancies: Vacancy[] = Array.isArray(data) ? data : [];
  const vacancy = vacancies.find((item) => item.id === vacancyId);

  return (
    <motion.main
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen container mx-auto px-5 sm:px-7 lg:px-10 xl:px-20 2xl:px-36"
    >
      {isLoading && (
        <div className="py-10 flex justify-center">
          <ClipLoader color="#0043d8" size={50} />
        </div>
      )}

      {!isLoading && error && (
        <p className="font-vox text-base text-red-700">
          Failed to load vacancy.
        </p>
      )}

      {!isLoading && !error && !vacancy && (
        <p className="font-vox text-base">Vacancy not found.</p>
      )}

      {!isLoading && !error && vacancy && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-5 lg:gap-10"
          >
            <h2 className="text-xl lg:text-5xl font-bold">
              {vacancy[`title_${locale}`]}
            </h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl lg:text-3xl font-bold">
                {t("whatYoullDo")}
              </h3>
              <div
                className="font-vox text-sm lg:text-2xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: vacancy[`text_${locale}`] }}
              />
            </div>
          </motion.div>

          <hr className="border-gray-100 mt-10 lg:mt-16" />
          <ApplicationForm />
        </>
      )}
    </motion.main>
  );
}
