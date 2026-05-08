"use client";

import { notFound, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
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
  const params = useParams<{ lang: string; slug: string }>();
  const slug = params.slug;
  const locale = useAppLocale();
  const tPage = useTranslations("ProjectsPage");
  const [isImageLoading, setIsImageLoading] = useState(true);

  const {
    data: detailData,
    error: detailError,
    isLoading: detailLoading,
  } = useGetProjectDetailByIdQuery({ endpoint: "api/projects", id: slug });
  console.log(detailData);

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
    <main className="relative min-h-screen">
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
      <div className="header-info absolute top-36 sm:top-60 lg:top-80 right-0 text-white bg-black/20 backdrop-blur-sm p-4 rounded-l-lg flex flex-col gap-2 z-20">
        <h1 className="max-w-sm sm:max-w-4xl font-nexa text-3xl lg:text-4xl xl:text-6xl font-bold leading-7 lg:leading-12 tracking-tight text-right mr-7 lg:mr-20 xl:mr-40">
          {title}
        </h1>
        <div className="flex flex-col gap-2 ml-auto mr-7 lg:mr-20 xl:mr-40">
          <p className="font-nexa text-sm lg:text-xl xl:text-2xl font-light tracking-wide text-left mt-8">
            <span className="font-bold">{tPage("customer")}:</span> {customer}
          </p>
          <a
            href={detail.website}
            target="_blank"
            rel="noreferrer"
            className="font-nexa text-sm lg:text-xl xl:text-2xl font-light text-left"
          >
            <span className="font-bold">{tPage("webSite")}:</span> {website}
          </a>
        </div>
      </div>
      <div className="body-content container mx-auto mt-96 sm:mt-120 lg:mt-150 xl:mt-170 px-5 sm:px-10 xl:px-5 pb-10 md:pb-20">
        {details.length > 0 && (
          <div className="mx-auto max-w-7xl space-y-16 lg:space-y-24">
            {details.map((item, index) => (
              <section
                key={item.id}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16"
              >
                <div className="border-t border-gray-300 pt-4 lg:col-span-5">
                  <span className="mb-5 block font-mono text-xs text-gray-400">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                  <h2 className="max-w-sm font-nexa text-4xl font-light leading-none tracking-tight text-black md:text-5xl lg:text-6xl">
                    {stripHtmlTags(item[`title_${locale}`] ?? "")}
                  </h2>
                </div>
                <div className=" pt-4 lg:col-span-7">
                  <RichText
                    htmlContent={item[`text_${locale}`] ?? ""}
                    className="max-w-2xl font-vox text-sm font-semibold leading-relaxed text-black lg:text-base [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc"
                  />
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      {gallery.length > 0 && (
        <div className="container mx-auto px-5 sm:px-10 xl:px-5 pb-20 md:pb-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="relative w-full h-60 lg:h-80 overflow-hidden">
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
