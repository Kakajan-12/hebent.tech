"use client";

import { useEffect, useRef } from "react";
import part1 from "@/public/loading/1.svg";
import part2 from "@/public/loading/2.svg";
import part3 from "@/public/loading/3.svg";
import part4 from "@/public/loading/4.svg";
import part5 from "@/public/loading/5.svg";
import part6 from "@/public/loading/6.svg";
import part7 from "@/public/loading/7.svg";
import part8 from "@/public/loading/8.svg";
import part9 from "@/public/loading/9.svg";
import "./loading.css";

type LogoPart = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  center?: boolean;
  leftOfCenter?: boolean;
};
const LOGO_PARTS: LogoPart[] = [
  { src: part1.src, x: 35.32, y: 0.85, w: 23.41, h: 27.76 },
  { src: part2.src, x: 55.34, y: 13.51, w: 27.02, h: 18.02 },
  { src: part3.src, x: 66.41, y: 35.35, w: 27.73, h: 23.43 },
  { src: part4.src, x: 63.4, y: 55.31, w: 18.01, h: 27.04 },
  { src: part5.src, x: 36.17, y: 66.39, w: 23.41, h: 27.76 },
  { src: part6.src, x: 12.62, y: 63.47, w: 27.02, h: 18.02 },
  { src: part7.src, x: 0.85, y: 36.21, w: 27.73, h: 23.43, leftOfCenter: true },
  { src: part8.src, x: 13.48, y: 12.65, w: 18.01, h: 27.04 },
  { src: part9.src, x: 38.44, y: 38.48, w: 18.03, h: 18.03, center: true },
];

function applyPulseAnimation(loader: HTMLElement) {
  const dur =
    parseFloat(getComputedStyle(loader).getPropertyValue("--dur")) || 1.8;
  const ring = loader.querySelectorAll<SVGElement>(".block.ring");
  ring.forEach((el, i) => {
    const delay = -((ring.length - i) / ring.length) * dur;
    el.style.animationDelay = `${delay.toFixed(2)}s`;
  });
  const center = loader.querySelector<SVGElement>(".block.center");
  if (center) center.style.animationDelay = "0s";
}

type LoadingProps = {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

function Loading({ size = "md", className = "" }: LoadingProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;
    applyPulseAnimation(loader);
  }, []);

  return (
    <div
      ref={loaderRef}
      className={`logo-loader pulse ${size} ${className}`.trim()}
      aria-label="Loading"
      role="status"
    >
      <svg
        viewBox="0 0 95 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {LOGO_PARTS.map((part, index) => (
          <image
            key={index}
            className={`block${part.center ? " center" : " ring"}${part.leftOfCenter ? " ring-left" : ""}`}
            href={part.src}
            x={part.x}
            y={part.y}
            width={part.w}
            height={part.h}
            preserveAspectRatio="none"
          />
        ))}
      </svg>
    </div>
  );
}

export default Loading;
