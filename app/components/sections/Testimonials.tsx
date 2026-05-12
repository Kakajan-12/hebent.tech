"use client";

import { useTranslations } from "next-intl";
import { useGetTestimonialsQuery } from "@/app/api/api";
import { Testimonial } from "@/app/Interfaces/interfaces";
import { ClipLoader } from "react-spinners";
import { TestimonialsMarquee } from "./TestimonialsMarquee";

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
    <section className="pt-16">
      <div className="container mx-auto mb-10 px-5 lg:px-10">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
      </div>

      <div className="px-5 lg:px-10">
        <TestimonialsMarquee items={testimonials} />
      </div>
    </section>
  );
}
