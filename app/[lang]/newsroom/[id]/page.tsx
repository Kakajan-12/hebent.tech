"use client";

import { useParams, notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Loading from "@/components/ui/Loading";
import { useGetNewsDetailByIdQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { NewsDetail, NewsDetailGallery } from "@/app/Interfaces/interfaces";
import { resolveMediaUrl } from "@/constant/constant";
import { stripHtmlTags } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";

function formatNewsDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}
export default function NewsArticlePage() {
  const params = useParams<{ lang: string; id: string }>();
  const id = params.id;
  const locale = useAppLocale();
  const t = useTranslations("Newsroom");

  const {
    data: detailData,
    error: detailError,
    isLoading: detailLoading,
  } = useGetNewsDetailByIdQuery({ endpoint: "api/news", id: id });

  const [isImageLoading, setIsImageLoading] = useState(true);

  if (detailLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loading size="sm" />
      </main>
    );
  }

  if (detailError || !detailData) {
    notFound();
  }

  const detail = detailData as NewsDetail;
  const gallery: NewsDetailGallery[] = Array.isArray(detail.gallery)
    ? detail.gallery
    : [];

  const title = stripHtmlTags(detail[`title_${locale}`]);
  const textHtml = detail[`text_${locale}`] ?? "";
  const category = stripHtmlTags(detail[`category_${locale}`]);
  const coverImageSrc = resolveMediaUrl(detail.image);

  return (
    <main className="relative flex-col flex gap-10 min-h-screen">
      <div className="-mt-42 relative h-90 sm:h-110 lg:h-140 xl:h-176 2xl:h-190 w-full flex items-end justify-end overflow-hidden">
        <div className="absolute inset-0 w-ful h-full z-10">
          {isImageLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/70">
              <Loading size="sm" />
            </div>
          )}
          <Image
            src={coverImageSrc}
            alt={title}
            width={1000}
            height={1000}
            priority
            className="object-cover w-full h-full"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 header-info text-white flex flex-col items-end gap-2 lg:gap-14 z-20 mb-7 lg:mb-13">
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-right">
            {title}
          </h2>
          <div className="flex flex-col gap-2">
            <time
              className="text-sm lg:text-xl xl:text-2xl font-light tracking-wide text-left"
              dateTime={detail.created_at}
            >
              <span className="font-bold">{t("date")}:</span>{" "}
              {formatNewsDate(detail.created_at, locale)}
            </time>
            <p className="text-sm lg:text-xl xl:text-2xl font-light text-left">
              <span className="font-bold">{t("category")}:</span> {category}
            </p>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-5 lg:px-10 xl:px-20 2xl:px-36 flex flex-col gap-10"
      >
        <div
          className="rich-text text-sm lg:text-xl"
          dangerouslySetInnerHTML={{ __html: textHtml }}
        />

        {gallery.length > 0 && (
          <>
            <h3 className="text-3xl lg:text-4xl xl:text-6xl font-light">
              {t("gallery")}
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            >
              {gallery.map((g) => (
                <GalleryImage
                  key={g.id}
                  src={resolveMediaUrl(g.image)}
                  alt={title}
                />
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </main>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative w-full h-26 lg:h-68 overflow-hidden aspect-square">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/70">
          <Loading size="sm" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={1000}
        height={1000}
        className="object-cover"
        // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
