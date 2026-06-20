"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoText from "@/public/logos/Hebent.svg";
import DecryptedText from "@/components/DecryptedText";

const logos = ["log", "gov", "fin", "med", "travel", "event", "cyber"];

function Logo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-end justify-start gap-1 lg:gap-3 md:pr-5 lg:pr-10 xl:pr-25">
      <Image
        src={logoText}
        alt="logo text"
        width={logoText.width}
        height={logoText.height}
        className="shrink-0 w-[100px] md:w-[150px] lg:w-[180px] xl:w-[220px] h-auto"
      />

      <div className="flex items-end -mr-1">
        <DecryptedText
          key={index}
          text={logos[index]}
          animateOn="view"
          sequential
          speed={100}
          revealDirection="start"
          parentClassName="shrink-0 whitespace-nowrap text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase text-[#0044E1] tracking-widest"
        />
        <span className="shrink-0 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase text-[#0044E1] tracking-widest">
          tech
        </span>
      </div>
    </div>
  );
}

export default Logo;
