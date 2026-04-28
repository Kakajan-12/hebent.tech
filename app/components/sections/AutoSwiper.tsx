"use client";
import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import iotImage from "@/public/IOT.jpeg";
import aiImage from "@/public/ai.webp";
import consultingImage from "@/public/it.webp";
import developmentImage from "@/public/itdevelop.webp";
import databaseImage from "@/public/database.jpg";

type ServiceKey = "iot" | "ai" | "consulting" | "development" | "database";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

const SERVICE_KEYS: ServiceKey[] = [
  "iot",
  "ai",
  "consulting",
  "development",
  "database",
];

const SERVICE_IMAGES: Record<ServiceKey, StaticImageData> = {
  iot: iotImage,
  ai: aiImage,
  consulting: consultingImage,
  development: developmentImage,
  database: databaseImage,
};

const AUTOPLAY_DELAY = 5000;

export const AutoSwiper: React.FC = () => {
  const t = useTranslations("Services");
  const services = useMemo<ServiceItem[]>(
    () =>
      SERVICE_KEYS.map((key, index) => ({
        id: index + 1,
        title: t(`${key}.label`),
        description: t(`${key}.description`),
        image: SERVICE_IMAGES[key],
      })),
    [t]
  );
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    swiper?.slideToLoop(index);
  };

  return (
    <div className="mx-auto w-full mb-10 md:mb-20 lg:mb-30">
      {/* Навигационная панель */}
      <div className="flex gap-2 mb-6 container mx-auto mt-30 overflow-x-auto scrollbar-hide whitespace-nowrap px-5 lg:px-0">
        {services.map((service, index) => (
          <button
            key={service.id}
            onClick={() => handleTabClick(index)}
            className="relative px-6 py-2 w-fit bg-white hover:bg-gray-200 transition-colors text-xs lg:text-sm font-semibold uppercase tracking-wider"
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
              {service.title}
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
              <div className="relative flex min-h-[min(70vw,480px)] items-start overflow-hidden rounded-2xl bg-[#0f172a] p-8 shadow-xl sm:min-h-[520px] sm:p-12 md:min-h-[600px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="relative z-10 flex w-full max-w-lg flex-col items-start gap-2 rounded-sm bg-[#D9D9D933] border border-white/40  p-2.5 backdrop-blur-sm">
                  <p className="text-[8px] lg:text-sm xl:text-xl font-bold uppercase text-white">
                    {service.title}
                  </p>
                  <h2 className="text-sm lg:text-base xl:text-2xl font-medium leading-tight text-white wrap-break-word">
                    {service.description}
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
    </div>
  );
};
