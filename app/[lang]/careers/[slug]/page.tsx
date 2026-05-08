"use client";
import ApplicationForm from "@/app/components/careers/ApplicationForm";
import { useGetVacanciesQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import type { Vacancy } from "@/app/Interfaces/interfaces";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function CareerPage() {
  const t = useTranslations("Careers");
  const locale = useAppLocale();
  const params = useParams<{ slug: string }>();
  const vacancyId = Number(params?.slug);
  const { data, error, isLoading } = useGetVacanciesQuery();

  const vacancies: Vacancy[] = Array.isArray(data) ? data : [];
  const vacancy = vacancies.find((item) => item.id === vacancyId);

  return (
    <main className="min-h-screen container mx-auto px-7 sm:px-10 lg:px-12 mt-30 lg:mt-50 xl:mt-60 mb-20 lg:mb-30">
      {isLoading && (
        <div className="py-10 flex justify-center">
          <ClipLoader color="#000" size={28} />
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
          <div className="space-y-5 lg:space-y-16 xl:space-y-20">
            <h2 className="font-nexa text-xl lg:text-5xl font-bold tracking-tight">
              {vacancy[`title_${locale}`]}
            </h2>

            <h2 className="font-nexa text-xl lg:text-5xl font-bold tracking-tight">
              {t("whatYoullDo")}
            </h2>

            <div
              className="font-vox text-sm lg:text-2xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: vacancy[`text_${locale}`] }}
            />
          </div>

          <hr className="border-gray-100 mt-10 lg:mt-16" />
          <ApplicationForm />
        </>
      )}
    </main>
  );
}
