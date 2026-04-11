"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NewsItem } from "@/lib/newsroom";

type NewsCardProps = {
  item: NewsItem;
  dateLabel: string;
};

export default function NewsCard({ item, dateLabel }: NewsCardProps) {
  const t = useTranslations("Newsroom.items");
  const tPage = useTranslations("Newsroom");

  return (
    <article className="flex flex-col gap-3 px-2 py-4 text-[#1E2124] hover:shadow-sm transition duration-300 hover:scale-105 hover:cursor-pointer">
      <time
        className="font-nexa text-xs font-light uppercase tracking-wide text-[#767676]"
        dateTime={item.date}
      >
        {dateLabel}
      </time>
      <div className="relative w-full overflow-hidden h-42 sm:h-48">
        <Image
          src={item.imageSrc}
          alt=""
          fill
          className="object-cover h-full w-full"
        />
      </div>
      <h3 className="font-nexa text-sm font-bold leading-snug tracking-tight md:text-xl line-clamp-2">
        {t(`${item.id}.title`)}
      </h3>
      <p className="font-vox font-medium line-clamp-4 flex-1 text-sm leading-relaxed">
        {t(`${item.id}.description`)}
      </p>
      <Link
        href={`/newsroom/${item.id}`}
        className="capitalize font-nexa mt-2 inline-flex text-base font-light text-[#767676] underline-offset-4 transition hover:text-black underline"
      >
        {tPage("watchHere")}
      </Link>
    </article>
  );
}
