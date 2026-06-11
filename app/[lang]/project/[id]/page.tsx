"use client";

import { notFound, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import Loading from "@/components/ui/Loading";
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
import { stripHtmlTags } from "@/lib/utils";
import { HiOutlineXMark } from "react-icons/hi2";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function ProjectPage() {
  const params = useParams<{ lang: string; id: string }>();
  const id = params.id;
  const locale = useAppLocale();
  const tPage = useTranslations("Projects");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const {
    data: detailData,
    error: detailError,
    isLoading: detailLoading,
  } = useGetProjectDetailByIdQuery({ endpoint: "api/projects", id: id });

  if (detailLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loading size="md" />
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

  return (
    <main className="relative flex-col flex gap-10 min-h-screen overflow-x-clip">
      <div className="-mt-42 relative h-90 sm:h-110 lg:h-140 xl:h-176 2xl:h-190 w-full flex items-end justify-end overflow-hidden">
        <div className="absolute inset-0 w-ful h-full z-10">
          {isImageLoading && (
            <Skeleton className="absolute inset-0 z-10 h-full w-full rounded-none" />
          )}
          {coverImageSrc && (
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
          )}
          <div className="absolute inset-0 bg-linear-to-tl from-black/75 via-black/60 to-transparent" />
        </div>
        <div className="container mx-auto px-5 lg:px-10 xl:px-20 header-info text-white flex flex-col items-end gap-2 lg:gap-14 z-20 mb-7 lg:mb-13">
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
      <div className="container mx-auto px-5 lg:px-10 xl:px-20 flex flex-col gap-10">
        {details ? (
          <div className="flex flex-col gap-12 lg:gap-20">
            {details.map((item) => (
              <section
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
              >
                <div className="flex flex-col items-start gap-3">
                  {/* <div className="flex w-full items-center gap-3 text-xs font-light lg:text-sm">
                    {details.map((_, i) => {
                      const isActive = i === index;
                      const isLast = i === details.length - 1;
                      const lastIsActive = index === details.length - 1;
                      const lineIsActive =
                        isActive || (lastIsActive && i === details.length - 2);
                      return (
                        // <Fragment key={i}>
                        //   <span
                        //     className={
                        //       isActive ? "text-black" : "text-black/40"
                        //     }
                        //   >
                        //     [0.{i + 1}]
                        //   </span>
                        //   {!isLast && (
                        //     <span
                        //       className={`h-px ${
                        //         lineIsActive
                        //           ? "flex-1 bg-black/60"
                        //           : "w-6 bg-black/20"
                        //       }`}
                        //     />
                        //   )}
                        // </Fragment>
                      );
                    })}
                  </div> */}
                  <TypingText
                    as="h3"
                    text={stripHtmlTags(item[`title_${locale}`] ?? "")}
                    speed={40}
                    animateOn="view"
                    className="text-3xl font-vox font-light lg:text-5xl"
                  />
                </div>

                <RichText
                  htmlContent={item[`text_${locale}`] ?? ""}
                  className="rich-text text-sm font-normal lg:text-xl [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc"
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
            className="text-3xl lg:text-4xl xl:text-5xl font-light"
          />
        )}
      </div>

      {gallery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="container mx-auto px-5 lg:px-10 xl:px-20 flex flex-wrap gap-1"
        >
          {gallery.map((g) => (
            <GalleryImage
              key={g.id}
              src={resolveMediaUrl(g.images)}
              alt={title}
              onClick={() => setFullscreenImage(resolveMediaUrl(g.images))}
            />
          ))}
        </motion.div>
      )}

      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="relative h-[60vh] w-[70vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fullscreenImage}
              alt={title}
              fill
              className="object-contain h-full w-full"
              sizes="(max-width: 768px) 80vw, 42rem"
              priority
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setFullscreenImage(null)}
              className="absolute top-26 sm:top-20 md:top-10 lg:top-0 -right-10 sm:-right-12 xl:-right-14 z-10 flex h-7 w-7 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-full bg-white/10 p-0 leading-none text-white transition hover:bg-white/20"
            >
              <HiOutlineXMark className="size-5 lg:size-6 shrink-0" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function GalleryImage({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative h-26 sm:h-40 md:h-52 lg:h-68 overflow-hidden aspect-square border border-black/10">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/70">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain h-full w-full cursor-pointer"
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        onClick={onClick}
      />
    </div>
  );
}
