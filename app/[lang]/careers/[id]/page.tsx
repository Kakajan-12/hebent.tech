"use client";
import ApplicationForm from "@/app/components/careers/ApplicationForm";
import { useGetVacanciesQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import type { Vacancy } from "@/app/Interfaces/interfaces";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Loading from "@/components/ui/Loading";
import { motion } from "motion/react";
import { stripHtmlTags } from "@/lib/utils";

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
      className="container mx-auto px-5 sm:px-7 lg:px-10"
    >
      {isLoading && (
        <div className="py-10 flex justify-center">
          <Loading size="sm" />
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
            {/* <h2 className="text-xl lg:text-5xl font-bold">
              {stripHtmlTags(vacancy[`title_${locale}`])}
            </h2> */}

            <div className="flex flex-col gap-2">
              <h3 className="text-3xl lg:text-5xl font-bold tracking-tight font-vox">
                {t("role")}
              </h3>
              <div
                className="text-sm lg:text-2xl leading-relaxed text-left rich-text self-end justify-self-end lg:w-[60%] xl:w-2/3"
                dangerouslySetInnerHTML={{ __html: vacancy[`title_${locale}`] }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-3xl lg:text-5xl font-bold tracking-tight font-vox">
                {t("whatYoullDo")}
              </h3>
              <div
                className="text-sm lg:text-2xl leading-relaxed text-left rich-text self-end justify-self-end lg:w-[60%] xl:w-2/3"
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
