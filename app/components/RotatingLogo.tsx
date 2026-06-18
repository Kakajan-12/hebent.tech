"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image, { StaticImageData } from "next/image";

interface RotatingLogoProps {
  logos: StaticImageData[];
  /** How long each logo stays visible before flipping, in ms */
  interval?: number;
  className?: string;
}

export default function RotatingLogo({
  logos,
  className,
  interval = 2500,
}: RotatingLogoProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (logos.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, interval);
    return () => clearInterval(id);
  }, [logos.length, interval]);

  if (!logos.length) return null;

  const logo = logos[index];

  return (
    <div
      className={`flex items-center justify-center w-full h-full ${
        className ?? ""
      }`}
      style={{ perspective: 800 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={logo.src}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={logo}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className="h-6.5 md:h-10 lg:h-12 xl:h-14 w-auto max-w-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
