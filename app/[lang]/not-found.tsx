"use client";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Heading from "@/components/Heading";
import LetterGlitch from "@/components/LetterGlitch";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section
      data-not-found
      className="relative w-full flex-1 min-h-screen overflow-hidden flex flex-col items-center justify-center  -mt-32 lg:-mt-42"
    >
      <div className="absolute inset-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth
          speed={10}
          colors={["#ffffff"]}
          showCenterVignette
          showOuterVignette={false}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <div className="font-vox font-bold text-7xl md:text-8xl xl:text-9xl text-white leading-none bg-white/10 backdrop-blur-xs px-9 py-5">
          404
        </div>

        <div className=" text-white leading-none bg-white/10 backdrop-blur-xs px-6 py-4 lg:px-22 lg:py-8 flex flex-col items-center justify-center  gap-4 lg:gap-8">
          <h3 className="font-vox text-white text-2xl md:text-3xl xl:text-4xl font-bold">
            {t("title")}
          </h3>
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 bg-white px-6 py-3 text-sm lg:text-base font-medium text-black transition-colors hover:bg-brand-dark hover:text-white"
          >
            {/* <ArrowLeft className="h-5 w-5" /> */}
            {t("home")}
          </Link>
        </div>
      </div>
      {/* <span className="font-vox font-bold text-7xl md:text-8xl xl:text-9xl text-brand leading-none">
        404
      </span>

      <Heading title={t("title")} description={t("description")} />

      <Link
        href="/"
        className="inline-flex w-fit items-center gap-3 rounded-sm bg-brand px-6 py-3 text-sm lg:text-base font-medium text-white transition-colors hover:bg-brand-dark"
      >
        <ArrowLeft className="h-5 w-5" />
        {t("home")}
      </Link> */}
    </section>
  );
}
