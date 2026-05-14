"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { resolveMediaUrl } from "@/constant/constant";
import { ClipLoader } from "react-spinners";
import { useRouter } from "@/i18n/navigation";

type NewsCardProps = {
  id: string;
  image: string;
  title: string;
  text: string;
  dateLabel: string;
  isoDate: string;
  onNavigate?: () => void;
  light?: boolean;
};

function stripHtmlTags(value: string | undefined | null): string {
  if (value == null) return "";
  return String(value)
    .replace(/<[^>]*>/g, "")
    .trim();
}

export default function NewsCard({
  id,
  image,
  title,
  text,
  dateLabel,
  isoDate,
  onNavigate,
  light = false,
}: NewsCardProps) {
  const tPage = useTranslations("Newsroom");
  const imageSrc = resolveMediaUrl(image);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const cleanTitle = useMemo(() => stripHtmlTags(title), [title]);
  const cleanText = useMemo(() => stripHtmlTags(text), [text]);

  const router = useRouter();
  return (
    <article
      className={`flex flex-col gap-3 px-2 py-4 hover:shadow-sm transition duration-300 hover:cursor-pointer group ${
        light ? "text-white" : "text-[#1E2124] hover:scale-105"
      }`}
      onClick={() => {
        onNavigate?.();
        router.push(`/newsroom/${id}`);
      }}
    >
      <time
        className={`text-xs font-light uppercase tracking-wide ${
          light ? "text-white/70" : "text-[#767676]"
        }`}
        dateTime={isoDate}
      >
        {dateLabel}
      </time>
      <div className="relative w-full overflow-hidden h-42 sm:h-48">
        {isImageLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/70">
            <ClipLoader color="#0043d8" size={25} />
          </div>
        )}
        <Image
          src={imageSrc}
          alt={cleanTitle}
          fill
          className="object-cover h-full w-full"
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
        />
      </div>
      <h3 className="text-sm font-bold leading-snug tracking-tight md:text-xl line-clamp-2">
        {cleanTitle}
      </h3>
      <p className="font-medium line-clamp-4 flex-1 text-sm leading-relaxed">
        {cleanText}
      </p>
      <Link
        href={`/newsroom/${id}`}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate?.();
        }}
        className={`link-underline-slide capitalize mt-2 text-base font-light ${
          light
            ? "text-white/70 hover:text-white"
            : "text-[#767676] hover:text-black"
        }`}
      >
        {tPage("watchHere")}
      </Link>
    </article>
  );
}
