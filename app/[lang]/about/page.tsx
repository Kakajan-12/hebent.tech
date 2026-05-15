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
      className="min-h-screen flex flex-col gap-3 lg:gap-12"
    >
      <h2 className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 text-5xl md:text-6xl font-bold text-left">
        {t("title")}
      </h2>
      <AboutSection showLogo />
      <AboutAccordion />
    </motion.main>
  );
}
