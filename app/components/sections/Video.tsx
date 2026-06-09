"use client";

import { useState } from "react";
import type { Video } from "@/app/Interfaces/interfaces";
import { useGetVideosQuery } from "@/app/api/api";
import { resolveMediaUrl } from "@/constant/constant";
import Loading from "@/components/ui/Loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function Video() {
  const { data, error, isLoading } = useGetVideosQuery();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videos: Video[] = Array.isArray(data) ? data : [];
  const lastVideo = videos.length > 0 ? videos[videos.length - 1] : null;
  const videoSrc = lastVideo?.video ? resolveMediaUrl(lastVideo.video) : "";

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-lg leading-relaxed md:text-xl h-screen flex items-center justify-center">
        Error loading video
      </div>
    );
  }
  if (!videoSrc) {
    return (
      <div className="text-center text-lg leading-relaxed md:text-xl h-screen flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <section className="absolute top-0 left-0 right-0 h-screen">
      {!isVideoReady && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white">
          <Loading />
        </div>
      )}
      <video
        className="relative h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setIsVideoReady(true)}
      />
    </section>
  );
}
