"use client";

import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import { useGetTestimonialsQuery } from "@/app/api/api";
import { Testimonial } from "@/app/Interfaces/interfaces";
import { ClipLoader } from "react-spinners";

const stripHtmlTags = (text: string) => {
  return text.replace(/<[^>]*>?/g, "");
};

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const { data, error, isLoading } = useGetTestimonialsQuery();
  const testimonials: Testimonial[] = Array.isArray(data) ? data : [];
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

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
    <section className="py-16">
      <div className="container mx-auto mb-10 max-w-7xl px-5 lg:px-10 xl:px-0">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
      </div>

      <div
        className="embla overflow-hidden px-5 lg:px-10 xl:px-0"
        ref={emblaRef}
      >
        <div className="embla__container flex -ml-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="embla__slide min-h-90 flex-[0_0_100%] pl-5 sm:flex-[0_0_42%] lg:flex-[0_0_25%] xl:flex-[0_0_18%] 2xl:flex-[0_0_14%]"
            >
              <figure className="group testimonial-clip flex h-full flex-col items-start justify-between rounded bg-white p-8 hover:text-black">
                <figcaption className="relative z-10 mb-6 text-sm font-black uppercase tracking-widest text-gray-400 transition-colors group-hover:text-black">
                  {stripHtmlTags(item.company)}
                </figcaption>

                <div className="relative z-10 flex flex-col gap-2">
                  <blockquote className="text-base font-medium leading-relaxed text-gray-400 transition-colors group-hover:text-black">
                    {stripHtmlTags(item.text)}
                  </blockquote>

                  <div
                    className="mt-6 max-h-0 translate-y-2 overflow-hidden opacity-0 transition-all duration-300 ease-out
                             group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <p className="text-sm font-bold">
                      {stripHtmlTags(item.name)}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400 transition-colors group-hover:text-black">
                      {stripHtmlTags(item.job_title)}
                    </p>
                  </div>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
