"use client";

import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import { TESTIMONIAL_IDS, type TestimonialId } from "../../../lib/content";

function parseAuthor(raw: string): { name: string; meta: string } {
  const idx = raw.indexOf(",");
  if (idx === -1) return { name: raw, meta: "" };
  return { name: raw.slice(0, idx).trim(), meta: raw.slice(idx + 1).trim() };
}

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 xl:px-0 mb-10 container">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
      </div>

      <div
        className="embla overflow-hidden px-5 lg:px-10 xl:px-0"
        ref={emblaRef}
      >
        {/* Убрали grid, добавили flex и отрицательный margin, чтобы компенсировать отступы */}
        <div className="embla__container flex -ml-5">
          {TESTIMONIAL_IDS.map((id: TestimonialId) => {
            const brand = t(`items.${id}.brand`);
            const quote = t(`items.${id}.quote`);
            const { name, meta } = parseAuthor(t(`items.${id}.author`));
            return (
              <div
                key={id}
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] pl-5 min-h-96"
              >
                <figure className="group testimonial-clip rounded-4xl p-8 flex flex-col items-start justify-center bg-white h-full border border-slate-200">
                  <figcaption className="text-sm font-black uppercase tracking-widest mb-6 text-brand-blue">
                    {brand}
                  </figcaption>

                  <blockquote className="text-base font-medium leading-relaxed">
                    {quote}
                  </blockquote>

                  <div
                    className="mt-6 overflow-hidden max-h-0 opacity-0 translate-y-2
                               group-hover:max-h-20 group-hover:opacity-100 group-hover:translate-y-0
                               transition-all duration-300 ease-out"
                  >
                    <p className="font-bold text-sm">{name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{meta}</p>
                  </div>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
