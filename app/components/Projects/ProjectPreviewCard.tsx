"use client";

import Image from "next/image";

type ProjectPreviewCardProps = {
  image: string;
  title: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
};

/** Card geometry from the design (184×220). Keep in sync with `aspect-184/220`. */
const W = 184;
const H = 220;
/** Folded corner: from (W - FOLD_X, 0) to (W, FOLD_Y). */
const FOLD_X = 23;
const FOLD_Y = 25.7547;

export default function ProjectPreviewCard({
  image,
  title,
  active,
  onClick,
  onMouseEnter,
}: ProjectPreviewCardProps) {
  const stroke = active ? "#7f9bd6" : "#BFBFBF";

  return (
    <article
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`relative aspect-184/220 ${active ? "z-10" : "z-0"}`}
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        {/* Card body (without the folded corner) */}
        <polygon
          points={`0,0 ${W - FOLD_X},0 ${W},${FOLD_Y} ${W},${H} 0,${H}`}
          className="transition-[fill] duration-300"
          fill={active ? "#dce4f2" : "transparent"}
        />
        {/* Frame */}
        <rect
          x="0"
          y="0"
          width={W}
          height={H}
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          className="transition-[stroke] duration-300"
        />
        {/* Fold line */}
        <line
          x1={W - FOLD_X}
          y1="0"
          x2={W}
          y2={FOLD_Y}
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          className="transition-[stroke] duration-300"
        />
      </svg>

      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1023px) 33vw, 15vw"
        className={`object-contain p-5 transition duration-500 ${
          active ? "grayscale-0 opacity-100" : "lg:grayscale lg:opacity-50"
        }`}
      />
    </article>
  );
}
