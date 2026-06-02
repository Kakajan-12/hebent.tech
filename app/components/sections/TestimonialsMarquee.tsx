"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Testimonial } from "@/app/Interfaces/interfaces";
import { stripHtmlTags } from "@/lib/utils";

const TESTIMONIAL_TEXT_MAX = 250;

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
                <figure className="group testimonial-clip flex h-full min-h-90 flex-col items-start justify-between p-3 lg:p-4 bg-background-main hover:text-black cursor-pointer">
                  <figcaption className="relative z-10 text-sm font-black uppercase w-[200px] tracking-widest text-gray-400 transition-colors group-hover:text-black">
                    {stripHtmlTags(item.company)}
                  </figcaption>

                  <blockquote className="relative z-10 mt-auto text-base font-medium leading-tight text-gray-400 transition-colors group-hover:text-black lg:group-hover:mt-0">
                    {limitText(item.text)}
                  </blockquote>

                  <div className=" relative z-10 mt-5 lg:mt-0 max-h-20 translate-y-0 overflow-hidden opacity-100 transition-all duration-300 ease-out lg:max-h-0 lg:translate-y-2 lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <p className="text-sm font-bold">
                      {stripHtmlTags(item.name)}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400 transition-colors group-hover:text-black">
                      {stripHtmlTags(item.job_title)}
                    </p>
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
