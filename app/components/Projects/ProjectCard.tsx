"use client";

import Image from "next/image";
import type { Project } from "@/app/Interfaces/interfaces";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import "./project.css";
import { resolveMediaUrl } from "@/constant/constant";
import useAppLocale from "@/app/Hooks/GetLocale";
type ProjectCardProps = {
  project: Project;
};

const LG = "(min-width: 1024px)";
const DOUBLE_TAP_MS = 320;

function stripHtmlTags(value?: string): string {
  return (value ?? "").replace(/<[^>]*>/g, "").trim();
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = useAppLocale();
  const lastTapRef = useRef(0);
  const cardRef = useRef<HTMLElement>(null);
  const title = stripHtmlTags(project[`title_${locale}`]);
  const text = stripHtmlTags(project[`text_${locale}`]);

  useEffect(() => {
    const mql = window.matchMedia(LG);
    const onChange = () => {
      if (mql.matches) {
        setIsOpen(false);
        lastTapRef.current = 0;
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia(LG).matches || !isOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (cardRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
      lastTapRef.current = 0;
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [isOpen]);

  const goToProject = () => {
    router.push(`/project/${project.id}`);
  };

  const handleCardClick = () => {
    if (window.matchMedia(LG).matches) {
      goToProject();
      return;
    }
    const now = Date.now();
    const delta = now - lastTapRef.current;
    if (lastTapRef.current > 0 && delta < DOUBLE_TAP_MS) {
      lastTapRef.current = 0;
      goToProject();
      return;
    }
    lastTapRef.current = now;
    setIsOpen((open) => !open);
  };

  return (
    <article
      ref={cardRef}
      className="group relative aspect-square shadow-sm cut-card"
      onClick={handleCardClick}
    >
      <Image
        src={resolveMediaUrl(project.image)}
        alt=""
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        className={`absolute inset-0 bg-black opacity-0 transition duration-300 lg:group-hover:opacity-60 ${isOpen ? "lg:opacity-60" : "lg:opacity-0"}`}
      />
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col justify-center items-center p-5 opacity-0 transition duration-300 lg:group-hover:opacity-100 ${isOpen ? "max-lg:opacity-100" : "max-lg:opacity-0"}`}
      >
        <h3 className="text-lg font-semibold leading-snug text-white text-center">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/85 text-center">
          {text}
        </p>
      </div>
    </article>
  );
}
