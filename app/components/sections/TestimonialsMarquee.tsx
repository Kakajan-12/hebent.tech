"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Testimonial } from "@/app/Interfaces/interfaces";

const stripHtmlTags = (text: string) => text.replace(/<[^>]*>?/g, "");

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
              <figure className="group testimonial-clip flex h-full min-h-90 flex-col items-start justify-between bg-white p-4 lg:p-8 hover:text-black cursor-pointer">
                <figcaption className="relative z-10 mb-6 text-sm font-black uppercase tracking-widest text-gray-400 transition-colors group-hover:text-black">
                  {stripHtmlTags(item.company)}
                </figcaption>

                <div className="relative z-10 flex flex-col gap-2">
                  <blockquote className="text-base font-medium leading-relaxed text-gray-400 transition-colors group-hover:text-black">
                    {stripHtmlTags(item.text)}
                  </blockquote>

                  <div className="mt-6 max-h-0 translate-y-2 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-bold">
                      {stripHtmlTags(item.name)}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400 transition-colors group-hover:text-black">
                      {stripHtmlTags(item.job_title)}
                    </p>
                  </div>
                </div>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
