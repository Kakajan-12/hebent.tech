"use client";

import { useParams, notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Loading from "@/components/ui/Loading";
import { useGetNewsDetailByIdQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { NewsDetail, NewsDetailGallery } from "@/app/Interfaces/interfaces";
import { resolveMediaUrl } from "@/constant/constant";
import { stripHtmlTags } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import GalleryLightbox from "@/components/ui/GalleryLightbox";

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

  const [loadedCoverSrc, setLoadedCoverSrc] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const detail = detailData as NewsDetail | undefined;

  if (detailError) {
    notFound();
  }

  if (!detailLoading && !detail) {
    notFound();
  }

  // Спиннер на всю загрузку данных — картинки сюда не входят, у них свой скелетон.
  if (detailLoading || !detail) {
    return (
      <main className="relative flex min-h-screen items-center justify-center">
        <Loading size="md" />
      </main>
    );
  }

  const coverImageSrc = resolveMediaUrl(detail.image);
  const isCoverImageLoading =
    Boolean(coverImageSrc) && loadedCoverSrc !== coverImageSrc;

  const gallery: NewsDetailGallery[] = Array.isArray(detail.gallery)
    ? detail.gallery
    : [];

  const title = stripHtmlTags(detail[`title_${locale}`]);
  const textHtml = detail[`text_${locale}`] ?? "";
  const category = stripHtmlTags(detail[`category_${locale}`]);

  return (
    <main className="relative flex-col flex gap-10 min-h-screen">
      <div className="-mt-42 relative h-90 sm:h-110 lg:h-140 xl:h-176 2xl:h-190 aspect-video w-full flex items-end justify-end overflow-hidden">
        <Link
          href={`/${locale}/newsroom`}
          aria-label={t("back")}
          className="absolute bottom-7 left-5 lg:left-10 z-30 flex h-7.5 w-7.5 lg:h-9.5 lg:w-9.5 items-center justify-center border border-black transition-colors bg-white"
        >
          <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
        </Link>
        <div className="absolute inset-0 w-ful h-full z-10">
          {isCoverImageLoading && (
            <Skeleton className="absolute inset-0 z-10 h-full w-full rounded-none" />
          )}
          {coverImageSrc && (
            <Image
              src={coverImageSrc}
              alt={title}
              width={1000}
              height={1000}
              priority
              className="object-cover w-full h-full"
              onLoad={() => setLoadedCoverSrc(coverImageSrc)}
              onError={() => setLoadedCoverSrc(coverImageSrc)}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-tl from-black/55 via-black/35 to-transparent z-10" />
        </div>

        <div className="container px-5 lg:px-10 header-info text-white flex flex-col items-end gap-2 lg:gap-14 z-20 mb-7 lg:mb-13">
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-right max-w-md lg:max-w-2xl 2xl:max-w-3xl pt-10">
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
        className="container mx-auto px-5 lg:px-10 flex flex-col gap-10"
      >
        <div
          className="rich-text text-sm lg:text-xl"
          dangerouslySetInnerHTML={{ __html: textHtml }}
        />

        {gallery.length > 0 && (
          <>
            <h3 className="text-3xl lg:text-5xl xl:text-6xl font-bold font-vox">
              {t("gallery")}
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="flex flex-wrap gap-1"
            >
              {gallery.map((g, i) => (
                <GalleryImage
                  key={g.id}
                  src={resolveMediaUrl(g.image)}
                  alt={title}
                  onClick={() => setLightboxIndex(i)}
                />
              ))}
            </motion.div>
          </>
        )}
      </motion.div>

      <GalleryLightbox
        images={gallery.map((g) => resolveMediaUrl(g.image))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        alt={title}
      />
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
        className="object-cover h-full w-full cursor-pointer"
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        onClick={onClick}
      />
    </div>
  );
}
