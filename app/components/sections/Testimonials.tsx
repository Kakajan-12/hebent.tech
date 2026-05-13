"use client";

import { useTranslations } from "next-intl";
import { useGetTestimonialsQuery } from "@/app/api/api";
import { Testimonial } from "@/app/Interfaces/interfaces";
import { ClipLoader } from "react-spinners";
import { TestimonialsMarquee } from "./TestimonialsMarquee";
import { motion } from "motion/react";

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const { data, error, isLoading } = useGetTestimonialsQuery();
  const testimonials: Testimonial[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="#0043d8" size={50} />
      </div>
    );
  }

  if (!testimonials.length) {
    return (
      <div className="text-center text-lg leading-relaxed md:text-xl">
        No testimonials found
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-lg leading-relaxed md:text-xl">
        Error loading testimonials
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="container mx-auto mb-10 px-5 lg:px-10 xl:px-20 2xl:px-36"
      >
        <h2 className="text-3xl font-bold font-vox">{t("title")}</h2>
      </motion.div>

      <div className="px-5 lg:px-10 xl:px-20 2xl:px-36">
        <TestimonialsMarquee items={testimonials} />
      </div>
    </motion.section>
  );
}
