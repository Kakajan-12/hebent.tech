"use client";

import { notFound, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useGetProjectDetailByIdQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import {
  Gallery,
  ProjectDetail,
  ProjectDetailItem,
} from "@/app/Interfaces/interfaces";
import { resolveMediaUrl } from "@/constant/constant";
import RichText from "@/components/ui/Richtext";
import TypingText from "@/components/ui/TypingText";
import { motion } from "motion/react";

type ProjectDetailResponse = ProjectDetail & {
  title_tk?: string;
  title_en?: string;
  title_ru?: string;
  text_tk?: string;
  text_en?: string;
  text_ru?: string;
  costumer_tk?: string;
  costumer_en?: string;
  costumer_ru?: string;
};

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

export default function ProjectPage() {
  const params = useParams<{ lang: string; id: string }>();
  const id = params.id;
  const locale = useAppLocale();
  const tPage = useTranslations("Projects");
  const [isImageLoading, setIsImageLoading] = useState(true);

  const {
    data: detailData,
    error: detailError,
    isLoading: detailLoading,
  } = useGetProjectDetailByIdQuery({ endpoint: "api/projects", id: id });
  console.log(detailData);

  if (detailLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#0043d8" size={50} />
      </main>
    );
  }

  if (detailError || !detailData) {
    notFound();
  }

  const detail = detailData as ProjectDetailResponse;
  const gallery: Gallery[] = Array.isArray(detail.gallery)
    ? detail.gallery
    : [];
  const details: ProjectDetailItem[] = Array.isArray(detail.details)
    ? detail.details
    : [];

  const title = stripHtmlTags(detail[`title_${locale}`] ?? "");
  const customer = stripHtmlTags(detail[`costumer_${locale}`] ?? "");
  const website = stripHtmlTags(detail.website ?? "");
  const coverImageSrc = resolveMediaUrl(detail.image);

  // console.log(detail);
  return (
    <main className="relative flex-col flex gap-10 min-h-screen">
      <div className="-mt-42 relative h-90 sm:h-110 lg:h-140 xl:h-176 2xl:h-190 w-full flex items-end justify-end overflow-hidden">
        <div className="absolute inset-0 w-ful h-full z-10">
          {isImageLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/70">
              <ClipLoader color="#0043d8" size={50} />
            </div>
          )}
          <Image
            src={coverImageSrc}
            alt={title}
            width={1000}
            height={1000}
            priority
            className="object-contain w-full h-full"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 header-info text-white flex flex-col items-end gap-2 lg:gap-14 z-20 mb-7 lg:mb-13">
          <TypingText
            as="h2"
            text={title}
            speed={60}
            animateOn="mount"
            className="text-3xl lg:text-4xl xl:text-6xl font-bold"
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm lg:text-xl xl:text-2xl font-light text-left">
              <span className="font-bold">{tPage("customer")}:</span> {customer}
            </p>
            <a
              href={detail.website}
              target="_blank"
              rel="noreferrer"
              className="text-sm lg:text-xl xl:text-2xl font-light text-left"
            >
              <span className="font-bold">{tPage("webSite")}:</span> {website}
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 flex flex-col gap-10">
        {details ? (
          <div className="flex flex-col gap-12 lg:gap-20">
            {details.map((item, index) => (
              <section
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
              >
                <div className="flex flex-col items-start gap-3">
                  <div className="flex w-full items-center gap-3 text-xs font-light lg:text-sm">
                    {details.map((_, i) => {
                      const isActive = i === index;
                      const isLast = i === details.length - 1;
                      const lastIsActive = index === details.length - 1;
                      const lineIsActive =
                        isActive || (lastIsActive && i === details.length - 2);
                      return (
                        <Fragment key={i}>
                          <span
                            className={
                              isActive ? "text-black" : "text-black/40"
                            }
                          >
                            [0.{i + 1}]
                          </span>
                          {!isLast && (
                            <span
                              className={`h-px ${
                                lineIsActive
                                  ? "flex-1 bg-black/60"
                                  : "w-6 bg-black/20"
                              }`}
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                  <TypingText
                    as="h3"
                    text={stripHtmlTags(item[`title_${locale}`] ?? "")}
                    speed={40}
                    animateOn="view"
                    className="text-3xl font-light lg:text-5xl xl:text-6xl"
                  />
                </div>

                <RichText
                  htmlContent={item[`text_${locale}`] ?? ""}
                  className="font-vox text-sm font-normal lg:text-base [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc"
                />
              </section>
            ))}
          </div>
        ) : null}
        {gallery.length > 0 && (
          <TypingText
            as="h3"
            text={tPage("gallery")}
            speed={50}
            animateOn="view"
            className="text-3xl lg:text-4xl xl:text-6xl font-light"
          />
        )}
      </div>

      {gallery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {gallery.map((g) => (
            <GalleryImage
              key={g.id}
              src={resolveMediaUrl(g.image)}
              alt={title}
            />
          ))}
        </motion.div>
      )}
    </main>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative w-full h-26 lg:h-68 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/70">
          <ClipLoader color="#0043d8" size={50} />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
