"use client";
import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

import { useGetServicesQuery } from "@/app/api/api";
import { Service } from "@/app/Interfaces/interfaces";
import { resolveMediaUrl } from "@/constant/constant";
import { ClipLoader } from "react-spinners";
import useAppLocale from "@/app/Hooks/GetLocale";

const AUTOPLAY_DELAY = 5000;

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

export const AutoSwiper: React.FC = () => {
  const { data, error, isLoading } = useGetServicesQuery();
  const services: Service[] = useMemo<Service[]>(
    () => (Array.isArray(data) ? data : []),
    [data],
  );
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const locale = useAppLocale();

  const handleTabClick = (index: number) => {
    swiper?.slideToLoop(index);
  };
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="#0043d8" size={50} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-lg leading-relaxed md:text-xl h-screen flex items-center justify-center">
        Error loading services
      </div>
    );
  }
  return (
    <section className="mb-10 lg:mb-20">
      {/* Навигационная панель */}
      <div className="flex gap-2 mb-6 container overflow-x-auto scrollbar-hide px-5 lg:px-10">
        {services.map((service, index) => (
          <button
            key={service.id}
            onClick={() => handleTabClick(index)}
            className="relative  px-6 py-2 w-fit bg-white hover:bg-gray-200 transition-colors text-xs lg:text-sm font-semibold uppercase tracking-wider"
          >
            {activeIndex === index && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-0 bg-[#DDDDDD]"
                style={{
                  animation: `progress-line ${AUTOPLAY_DELAY}ms linear forwards`,
                }}
              />
            )}
            <span
              className={`relative z-10 whitespace-nowrap font-vox ${
                activeIndex === index ? "text-black" : "text-[#B2B2B2]"
              }`}
            >
              {stripHtmlTags(service[`service_name_${locale}`])}
            </span>
          </button>
        ))}
      </div>

      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          centeredSlides={true}
          slidesPerView={1.2}
          spaceBetween={20}
          speed={800}
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          watchSlidesProgress={true}
          navigation
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="services-swiper pb-14"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <div className="relative flex min-h-[min(70vw,480px)] items-start overflow-hidden rounded bg-[#0f172a] p-4 lg:p-8 shadow-xl sm:min-h-[520px] md:min-h-[600px]">
                <Image
                  loading="eager"
                  src={resolveMediaUrl(service.image)}
                  alt={service[`title_${locale}`]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 88vw, 75vw"
                />
                <div className="relative z-10 flex w-fit flex-col items-start gap-2 rounded-sm bg-[#D9D9D933] border border-white/40  p-2.5 backdrop-blur-sm">
                  <p className="text-[8px] lg:text-sm xl:text-xl font-bold uppercase text-white">
                    {stripHtmlTags(service[`title_${locale}`])}
                  </p>
                  <h2 className="text-sm lg:text-base xl:text-2xl font-medium leading-tight text-white wrap-break-word">
                    {stripHtmlTags(service[`text_${locale}`])}
                  </h2>
                </div>

                <div className="absolute right-[-10%] top-1/2 flex h-[100px] w-[100px] -translate-y-1/2 items-center justify-center rounded-full border border-blue-500/30 opacity-40">
                  <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/50" />
                  <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
