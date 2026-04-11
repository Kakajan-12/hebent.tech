import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import JobListing from "@/app/components/careers/JobListing";

type CareerJob = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function CareersPage({ params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations("Careers");
  const messages = await getMessages();
  const jobs = (messages.Careers as { jobs: CareerJob[] }).jobs;

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
          {jobs.map((job, index) => (
            <JobListing
              key={`${job.title}-${index}`}
              id={job.id}
              title={job.title}
              description={job.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
