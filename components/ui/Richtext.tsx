"use client";

import DOMPurify from "dompurify";
import { useMemo } from "react";
import { rewriteRichTextImgSrc } from "@/constant/constant";

interface Props {
  htmlContent: string;
  className?: string;
}

export default function RichText({ htmlContent, className }: Props) {
  const sanitizedHtml = useMemo(
    () => rewriteRichTextImgSrc(DOMPurify.sanitize(htmlContent)),
    [htmlContent],
  );

  return (
    <div
      className={`rich-text${className ? ` ${className}` : ""}`}
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml,
      }}
    />
  );
}
