"use client";

import { useTranslations } from "next-intl";
import JobListing from "@/app/components/careers/JobListing";
import { useGetVacanciesQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { Vacancy } from "@/app/Interfaces/interfaces";
import { ClipLoader } from "react-spinners";

export default function CareersPage() {
  const t = useTranslations("Careers");
  const locale = useAppLocale();
  const { data, error, isLoading } = useGetVacanciesQuery();

  const jobs: Vacancy[] = Array.isArray(data) ? data : [];

  return (
    <section className="mt-30 lg:mt-50 xl:mt-60 mb-10 lg:mb-20 min-h-screen">
      <div className="container mx-auto px-7 sm:px-10 lg:px-12">
        <header className="">
          <h2 className="font-nexa text-xl font-bold tracking-tight md:text-2xl text-left">
            {t("heroTitle")}
          </h2>
          <p className="mt-2 font-vox font-normal text-sm lg:text-xl leading-relaxed text-left">
            {t("heroBody")}
          </p>
        </header>

        <h3 className="mt-12 md:mt-10 lg:mt-20 font-nexa text-xl font-bold  md:text-2xl text-center">
          {t("vacanciesTitle")}
        </h3>

        <ul className="mt-6 border-t border-black pt-0">
          {isLoading && (
            <li className="py-6 font-vox text-sm md:text-base text-center">
              <ClipLoader color="#000" size={20} />
            </li>
          )}
          {error && !isLoading && (
            <li className="py-6 font-vox text-sm md:text-base text-red-700">
              Failed to load vacancies.
            </li>
          )}
          {!isLoading && !error && jobs.length === 0 && (
            <li className="py-6 font-vox text-sm md:text-base">
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
        </ul>
      </div>
    </section>
  );
}
