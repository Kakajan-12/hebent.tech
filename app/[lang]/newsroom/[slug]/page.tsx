import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NEWS_ITEMS } from "@/lib/newsroom";
import Image from "next/image";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export default async function NewsArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  setRequestLocale(lang);

  const exists = NEWS_ITEMS.some((n) => n.id === slug);
  if (!exists) notFound();

  const t = await getTranslations("Newsroom.items");
  const tPage = await getTranslations("Newsroom");

  return (
    <main className="relative">
      <div className="absolute top-0 left-0 h-90 sm:h-112 lg:h-140 xl:h-160 w-full z-10">
        <Image
          src={NEWS_ITEMS.find((n) => n.id === slug)?.imageSrc || ""}
          alt=""
          width={1000}
          height={1000}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="header-info absolute top-44 sm:top-60 lg:top-80 right-0 text-white flex flex-col gap-2 z-20">
        <h1 className="max-w-sm sm:max-w-none font-nexa text-3xl lg:text-4xl xl:text-6xl font-bold leading-7 lg:leading-12 tracking-tight text-right mr-7 lg:mr-20 xl:mr-40">
          {t(`${slug}.title`)}
        </h1>
        <div className="flex flex-col gap-2 ml-auto mr-7 lg:mr-20 xl:mr-40">
          <time
            className="font-nexa text-sm lg:text-xl xl:text-2xl font-light tracking-wide text-left mt-8"
            dateTime={NEWS_ITEMS.find((n) => n.id === slug)?.date}
          >
            <span className="font-bold">{tPage("date")}:</span>{" "}
            {NEWS_ITEMS.find((n) => n.id === slug)?.date}
          </time>
          <p className="font-nexa text-sm lg:text-xl xl:text-2xl font-light text-left">
            <span className="font-bold">{tPage("category")}:</span>{" "}
            {t(`${slug}.categoryLabel`)}
          </p>
        </div>
      </div>
      <div className="body-content container mx-auto mt-96 sm:mt-120 lg:mt-150 xl:mt-170 px-5 sm:px-10 xl:px-5 pb-40 md:pb-30">
        <p className="font-vox text-sm lg:text-xl leading-relaxed ">
          {t(`${slug}.body`)}
        </p>
      </div>
    </main>
  );
}
