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
  const params = useParams<{ lang: string; id: string }>();
  const id = params.id;
  const locale = useAppLocale();
  const tPage = useTranslations("ProjectsPage");
  const [isImageLoading, setIsImageLoading] = useState(true);

  const {
    data: detailData,
    error: detailError,
    isLoading: detailLoading,
  } = useGetProjectDetailByIdQuery({ endpoint: "api/projects", id: id });
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
    <main className="relative flex-col flex gap-10">
      <div className="-mt-42 relative h-90 sm:h-110 lg:h-140 xl:h-176 2xl:h-190 w-full flex items-end justify-end overflow-hidden">
        <div className="absolute inset-0 w-ful h-full z-10">
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
        <div className="header-info text-white bg-black/10 backdrop-blur-sm p-4 rounded-l-lg flex flex-col items-start gap-2 lg:gap-8 z-20 mb-7">
          <h2 className="text-3xl lg:text-4xl xl:text-6xl font-bold text-right ">
            {title}
          </h2>
          <div className="flex flex-col gap-2 ml-auto">
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
      <div className="container mx-auto px-5 lg:px-10 flex flex-col gap-10">
        {details.length > 0 && (
          <div className="flex flex-col gap-10">
            {details.map((item, index) => (
              <section key={item.id} className="flex flex-col gap-4">
                <RichText
                  htmlContent={item[`text_${locale}`] ?? ""}
                  className="max-w-2xl font-vox text-sm font-semibold leading-relaxed text-black lg:text-base [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc"
                />
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
        // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
