import React from "react";

interface HeadingProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export default function Heading({
  title,
  description,
  className = "",
}: HeadingProps) {
  return (
    <header
      className={` grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-34 items-start  ${className}`}
    >
      <h2 className="font-vox font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-left whitespace-nowrap">
        {title}
      </h2>

      {description && (
        <p className=" font-medium text-sm md:text-2xl lg:text-4xl text-left">
          {description}
        </p>
      )}
    </header>
  );
}
