import React from "react";
import { useTranslations } from "next-intl";
const EventTechPage = () => {
  const t = useTranslations("Nav");

  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-5 sm:px-7 lg:px-10 flex flex-col gap-5 justify-center items-center">
        <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
          {t("events")}
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

export default EventTechPage;
