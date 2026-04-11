import React from "react";
import { useTranslations } from "next-intl";
const TravelTechPage = () => {
  const t = useTranslations("Nav");

  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t("travel")}
        </h2>
      </div>
    </section>
  );
};

export default TravelTechPage;
