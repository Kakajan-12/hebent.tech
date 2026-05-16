"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Testimonial } from "@/app/Interfaces/interfaces";

const TESTIMONIAL_TEXT_MAX = 100;

const stripHtmlTags = (text: string) => text.replace(/<[^>]*>?/g, "");

function limitText(text: string, maxLength = TESTIMONIAL_TEXT_MAX): string {
  const clean = stripHtmlTags(text).trim();
  if (clean.length <= maxLength) return clean;

  const slice = clean.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.6) {
    return `${slice.slice(0, lastSpace)}…`;
  }

  return `${slice.trimEnd()}…`;
}

type TestimonialsMarqueeProps = {
  items: Testimonial[];
};

export function TestimonialsMarquee({ items }: TestimonialsMarqueeProps) {
  const plugins = React.useMemo(
    () => [
      AutoScroll({
        speed: 1,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
    [],
  );

  return (
    <div className="relative testimonials-marquee">
      <Carousel
        opts={{ align: "start", loop: true, dragFree: true }}
        plugins={plugins}
        className="w-full overflow-x-auto lg:overflow-x-hidden"
      >
        <CarouselContent className="-ml-5 py-3">
          {items.map((item) => (
            <CarouselItem key={item.id} className="w-[280px]">
              <div className="bg-brand testimonial-clip p-px">
                <figure className="group testimonial-clip flex h-full min-h-90 flex-col items-start justify-between p-3 lg:p-8 bg-background-main hover:text-black cursor-pointer">
                  <figcaption className="relative z-10 mb-6 text-sm font-black uppercase tracking-widest text-gray-400 transition-colors group-hover:text-black">
                    {stripHtmlTags(item.company)}
                  </figcaption>

                  <div className="relative z-10 flex flex-col gap-2">
                    <blockquote className="text-base font-medium leading-relaxed text-gray-400 transition-colors group-hover:text-black">
                      {limitText(item.text)}
                    </blockquote>

                    <div className="mt-6 max-h-20 translate-y-0 overflow-hidden opacity-100 transition-all duration-300 ease-out lg:max-h-0 lg:translate-y-2 lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
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
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
