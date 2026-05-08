"use client";

import { useParams, notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { useGetNewsDetailByIdQuery } from "@/app/api/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import { NewsDetail, NewsDetailGallery } from "@/app/Interfaces/interfaces";
import { resolveMediaUrl } from "@/constant/constant";
import { useState } from "react";

function formatNewsDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}
function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}
export default function NewsArticlePage() {
  const params = useParams<{ lang: string; slug: string }>();
  const slug = params.slug;
  const locale = useAppLocale();
  const tPage = useTranslations("Newsroom");

  const {
    data: detailData,
    error: detailError,
    isLoading: detailLoading,
  } = useGetNewsDetailByIdQuery({ endpoint: "api/news", id: slug });

  const [isImageLoading, setIsImageLoading] = useState(true);

  if (detailLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#000" size={32} />
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
  const text = stripHtmlTags(detail[`text_${locale}`]);
  const category = stripHtmlTags(detail[`category_${locale}`]);
  const coverImageSrc = resolveMediaUrl(detail.image);

  return (
    <main className="relative">
      <div className="absolute top-0 left-0 h-90 sm:h-112 lg:h-140 xl:h-160 w-full z-10">
        {isImageLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/70">
            <ClipLoader size={24} color="#1E2124" />
          </div>
        )}
        <Image
          src={coverImageSrc}
          alt={title}
          width={1000}
          height={1000}
          className="object-cover w-full h-full"
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
      </div>
      <div className="header-info absolute top-44 sm:top-60 lg:top-80 right-0 text-white flex flex-col gap-2 z-20">
        <h1 className="max-w-sm sm:max-w-none font-nexa text-3xl lg:text-4xl xl:text-6xl font-bold leading-7 lg:leading-12 tracking-tight text-right mr-7 lg:mr-20 xl:mr-40">
          {title}
        </h1>
        <div className="flex flex-col gap-2 ml-auto mr-7 lg:mr-20 xl:mr-40">
          <time
            className="font-nexa text-sm lg:text-xl xl:text-2xl font-light tracking-wide text-left mt-8"
            dateTime={detail.created_at}
          >
            <span className="font-bold">{tPage("date")}:</span>{" "}
            {formatNewsDate(detail.created_at, locale)}
          </time>
          <p className="font-nexa text-sm lg:text-xl xl:text-2xl font-light text-left">
            <span className="font-bold">{tPage("category")}:</span> {category}
          </p>
        </div>
      </div>
      <div className="body-content container mx-auto mt-96 sm:mt-120 lg:mt-150 xl:mt-170 px-5 sm:px-10 xl:px-13 pb-10 md:pb-20">
        <p className="font-vox text-sm lg:text-xl leading-relaxed whitespace-pre-line">
          {text}
        </p>
      </div>
      {gallery.length > 0 && (
        <div className="container mx-auto px-5 sm:px-10 xl:px-5 pb-40 md:pb-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {gallery.map((g) => (
            <GalleryImage
              key={g.id}
              src={resolveMediaUrl(g.image)}
              alt={title}
            />
          ))}
        </div>
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
          <ClipLoader size={24} color="#1E2124" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
