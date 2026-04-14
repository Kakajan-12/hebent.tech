"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/content";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import "./project.css";

type ProjectCardProps = {
  project: Project;
};

const LG = "(min-width: 1024px)";
const DOUBLE_TAP_MS = 320;

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Projects.items");
  const router = useRouter();
  const lastTapRef = useRef(0);
  const cardRef = useRef<HTMLElement>(null);

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
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [isOpen]);

  const goToProject = () => {
    router.push(`/project/${project.sourceId}`);
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
      className="group relative aspect-square overflow-hidden shadow-sm cut-card max-lg:cursor-pointer lg:cursor-pointer"
      onClick={handleCardClick}
    >
      <Image
        src={project.imageSrc}
        alt=""
        fill
        className="pointer-events-none object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div
        className={`absolute inset-0 bg-black opacity-0 transition duration-300 lg:group-hover:opacity-60 ${isOpen ? "max-lg:opacity-60" : "max-lg:opacity-0"}`}
      />
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col justify-center items-center p-5 opacity-0 transition duration-300 lg:group-hover:opacity-100 ${isOpen ? "max-lg:opacity-100" : "max-lg:opacity-0"}`}
      >
        <h3 className="text-lg font-semibold leading-snug text-white text-center">
          {t(`${project.sourceId}.title`)}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/85 text-center">
          {t(`${project.sourceId}.description`)}
        </p>
      </div>
    </article>
  );
}
