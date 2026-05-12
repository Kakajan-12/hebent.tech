"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { resolveMediaUrl } from "@/constant/constant";
import { ClipLoader } from "react-spinners";

type NewsCardProps = {
  id: string;
  image: string;
  title: string;
  text: string;
  dateLabel: string;
  isoDate: string;
};

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

export default function NewsCard({
  id,
  image,
  title,
  text,
  dateLabel,
  isoDate,
}: NewsCardProps) {
  const tPage = useTranslations("Newsroom");
  const imageSrc = resolveMediaUrl(image);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const cleanTitle = useMemo(() => stripHtmlTags(title), [title]);
  const cleanText = useMemo(() => stripHtmlTags(text), [text]);

  return (
    <article className="flex flex-col gap-3 px-2 py-4 text-[#1E2124] hover:shadow-sm transition duration-300 hover:scale-105 hover:cursor-pointer">
      <time
        className="text-xs font-light uppercase tracking-wide text-[#767676]"
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
      <p className="font-vox font-medium line-clamp-4 flex-1 text-sm leading-relaxed">
        {cleanText}
      </p>
      <Link
        href={`/newsroom/${id}`}
        className="capitalize mt-2 inline-flex text-base font-light text-[#767676] underline-offset-4 transition hover:text-black underline"
      >
        {tPage("watchHere")}
      </Link>
    </article>
  );
}
