import React from "react";
import Image from "next/image";
import logo from "@/public/logoIcon.svg";
import logoText from "@/public/logos/Hebent.svg";
import logtech from "@/public/logos/LOGTECH.svg";
import govtech from "@/public/logos/GOVTECH.svg";
import fintech from "@/public/logos/FINTECH.svg";
import medtech from "@/public/logos/MEDTECH.svg";
import traveltech from "@/public/logos/TRAVELTECH.svg";
import eventtech from "@/public/logos/EVENTTECH.svg";
import cybertech from "@/public/logos/CYBERTECH.svg";
import RotatingLogo from "@/app/components/RotatingLogo";

function Logo() {
  const logos = [
    logtech,
    govtech,
    fintech,
    medtech,
    traveltech,
    eventtech,
    cybertech,
  ];

  return (
    <div className="flex items-center justify-start gap-2">
      <Image
        src={logo}
        alt="logo"
        width={logo.width}
        height={logo.height}
        className="col-span-1 row-span-2 w-[60px] lg:w-[90px] h-auto"
      />
      <div className="col-span-2 row-span-2">
        <Image
          src={logoText}
          alt="logo text"
          width={logoText.width}
          height={logoText.height}
          className="col-span-2 row-span-1 w-[50px] lg:w-[70px] h-auto pb-2"
        />
        <RotatingLogo logos={logos} />
      </div>
    </div>
  );
}

export default Logo;
