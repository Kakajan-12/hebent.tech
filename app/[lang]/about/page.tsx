"use client";
import { useTranslations } from "next-intl";
import AboutAccordion from "@/app/components/about/AboutAccordion";
import AboutSection from "@/app/components/sections/About";
import { motion } from "motion/react";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <motion.main
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col gap-3 lg:gap-4"
    >
      <div className="hidden lg:grid lg:grid-cols-2 gap-4 container mx-auto px-5 lg:px-10">
        <p className=""></p>
        <h2 className=" uppercase font-vox font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-left whitespace-nowrap">
          {t("title")}
        </h2>
      </div>

      <AboutSection showLogo showTitle={true} />
      <AboutAccordion />
    </motion.main>
  );
}
