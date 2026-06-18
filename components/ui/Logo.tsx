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
    <div className="flex items-end justify-start md:pr-5 lg:pr-10 xl:pr-25">
      {/* <div className="col-span-2 row-span-2"> */}
      <RotatingLogo logos={logos} />
      <Image
        src={logoText}
        alt="logo text"
        width={logoText.width}
        height={logoText.height}
        className="w-[100px] md:w-[150px] lg:w-[180px] xl:w-[220px] h-auto"
      />
      {/* </div> */}
    </div>
  );
}

export default Logo;
