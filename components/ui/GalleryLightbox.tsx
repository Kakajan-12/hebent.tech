"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { HiOutlineXMark } from "react-icons/hi2";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

type GalleryLightboxProps = {
  images: string[];
  /** Index of the slide to open at, or `null`/`-1` to keep the lightbox closed. */
  index: number | null;
  onClose: () => void;
  alt?: string;
};

/**
 * Reusable fullscreen image viewer with swipe, prev/next arrows, dot
 * indicators and keyboard navigation. Shared by project & news galleries.
 */
export default function GalleryLightbox({
  images,
  index,
  onClose,
  alt = "",
}: GalleryLightboxProps) {
  const isOpen = index !== null && index >= 0 && images.length > 0;

  if (!isOpen) return null;

  return (
    <LightboxContent
      images={images}
      startIndex={index}
      onClose={onClose}
      alt={alt}
    />
  );
}

function LightboxContent({
  images,
  startIndex,
  onClose,
  alt,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
  alt: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex,
    loop: images.length > 1,
  });
  const [selected, setSelected] = useState(startIndex);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Keyboard navigation + lock background scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") scrollPrev();
      else if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, scrollPrev, scrollNext]);

  const multiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {multiple && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            scrollPrev();
          }}
          className="absolute left-1 sm:left-6 z-20 flex items-center justify-center text-white transition hover:bg-white/20"
        >
          <HiArrowSmallLeft className="size-6 lg:size-7" />
        </button>
      )}

      {multiple && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            scrollNext();
          }}
          className="absolute right-1 sm:right-6 z-20 flex items-center justify-center text-white transition hover:bg-white/20"
        >
          <HiArrowSmallRight className="size-6 lg:size-7" />
        </button>
      )}

      <div
        className="relative w-full max-w-[80vw] lg:max-w-[70vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute -top-10 sm:-top-6 -right-5 sm:-right-3 md:-right-10 lg:-right-12 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <HiOutlineXMark className="size-6" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative min-w-0 flex-[0_0_100%]"
              >
                <div className="relative flex h-[60vh] items-center justify-center">
                  <Image
                    src={src}
                    alt={alt}
                    width={1600}
                    height={1600}
                    className="object-contain h-auto w-auto max-h-[70vh] max-w-full"
                    priority={i === selected}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {multiple && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollTo(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === selected ? "w-6 bg-brand-dark" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
