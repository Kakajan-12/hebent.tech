import React from "react";

interface HeadingProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  isPrivasyPage?: boolean;
}

export default function Heading({
  title,
  description,
  isPrivasyPage = false,
  className = "",
}: HeadingProps) {
  return (
    <header
      className={` grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-34 items-start  ${className}`}
    >
      <h2
        className={`font-vox font-bold text-4xl leading-tight text-left ${isPrivasyPage ? "md:text-5xl xl:text-6xl 2xl:text-7xl" : "md:text-6xl lg:text-7xl xl:text-8xl"}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`font-medium text-sm md:text-2xl text-left ${isPrivasyPage ? "lg:text-3xl" : "lg:text-4xl"}`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
