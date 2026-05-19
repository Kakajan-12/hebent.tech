"use client";
import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { useGetServicesQuery } from "@/app/api/api";
import { Service } from "@/app/Interfaces/interfaces";
import { resolveMediaUrl } from "@/constant/constant";
import Loading from "@/components/ui/Loading";
import useAppLocale from "@/app/Hooks/GetLocale";
import { stripHtmlTags } from "@/lib/utils";

const AUTOPLAY_DELAY = 5000;

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
        <Loading size="sm" />
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
    <motion.section
      initial={{ opacity: 0, y: 110 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-10 lg:mb-20"
    >
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex gap-2 mb-6 container mx-auto overflow-x-auto scrollbar-hide px-5 lg:px-10 xl:px-20 2xl:px-36"
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          centeredSlides={true}
          slidesPerView={1.1}
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
              <div className="relative flex aspect-video items-start overflow-hidden rounded p-4 lg:p-8 shadow-xl">
                <Image
                  loading="eager"
                  src={resolveMediaUrl(service.image)}
                  alt={service[`title_${locale}`]}
                  fill
                  className="object-cover lg:object-fill"
                  sizes="(max-width: 768px) 88vw, 75vw"
                />
                <div className="relative z-10 flex min-w-20 lg:min-w-60 flex-col items-start gap-1 lg:gap-2 rounded-sm border border-white/30 p-1 lg:p-2.5 backdrop-blur-sm">
                  <h3 className="text-[8px] lg:text-sm xl:text-xl font-bold uppercase text-white">
                    {stripHtmlTags(service[`title_${locale}`])}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base xl:text-2xl font-medium leading-tight text-white wrap-break-word">
                    {stripHtmlTags(service[`text_${locale}`])}
                  </p>
                  <div className="w-full h-full bg-black/20 absolute inset-0" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.section>
  );
};
