import React from "react";
import { useTranslations } from "next-intl";
const LogTechPage = () => {
  const t = useTranslations("Nav");

  return (
    <section className="py-16 md:py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-5 justify-center items-center">
        <h2 className="mt-50  text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t("logistics")}
        </h2>
        <p className="text-sm lg:text-3xl leading-relaxed flex flex-col gap-2 items-center">
          <span className="font-bold">We Are Building Something Great!</span>
          <span className="text-base">
            Our new digital experience is on its way. Stay tuned.
          </span>
        </p>
      </div>
    </section>
  );
};

export default LogTechPage;
