"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// Описываем интерфейс для данных слайда
interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    id: 0,
    title: "IOT Services",
    description:
      "We deliver smart, end-to-end IoT solutions that connect devices and drive intelligent operations.",
  },
  {
    id: 1,
    title: "AI Services",
    description: "Artificial intelligence for your business...",
  },
  {
    id: 2,
    title: "IT Consulting",
    description: "Expert advice on your technology stack...",
  },
  {
    id: 3,
    title: "IT Development",
    description: "Full-cycle software development...",
  },
  {
    id: 4,
    title: "Database",
    description: "High-performance data management...",
  },
];

const AUTOPLAY_DELAY = 5000;

export const AutoSwiper: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    swiper?.slideToLoop(index);
  };

  return (
    <div className="mx-auto w-full mb-40">
      {/* Навигационная панель */}
      <div className="flex flex-wrap gap-2 mb-6 container mx-auto mt-30">
        {services.map((service, index) => (
          <button
            key={service.id}
            onClick={() => handleTabClick(index)}
            className="relative px-6 py-2 bg-white hover:bg-gray-200 transition-colors text-sm font-semibold uppercase tracking-wider overflow-hidden"
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
              className={`relative z-10 ${
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
              <div className="relative flex min-h-[min(70vw,480px)] items-start overflow-hidden rounded-2xl bg-[#0f172a] p-8 shadow-xl sm:min-h-[520px] sm:p-12 md:min-h-[560px]">
                <div className="relative z-10 flex w-full max-w-lg flex-col items-start gap-2 rounded-sm bg-[#D9D9D933] p-2.5 backdrop-blur-sm">
                  <p className="text-base font-bold uppercase text-white">
                    {service.title}
                  </p>
                  <h2 className="text-2xl font-medium leading-tight text-white wrap-break-word">
                    {service.description}
                  </h2>
                </div>

                <div className="absolute right-[-10%] top-1/2 flex h-[600px] w-[600px] -translate-y-1/2 items-center justify-center rounded-full border border-blue-500/30 opacity-40">
                  <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/50" />
                  <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
