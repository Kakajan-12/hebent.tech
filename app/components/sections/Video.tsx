"use client";

import { ClipLoader } from "react-spinners";
import type { Video } from "@/app/Interfaces/interfaces";
import { useGetVideosQuery } from "@/app/api/api";
import { resolveMediaUrl } from "@/constant/constant";

export default function Video() {
  const { data, error, isLoading } = useGetVideosQuery();
  const videos: Video[] = Array.isArray(data) ? data : [];
  const lastVideo = videos.length > 0 ? videos[videos.length - 1] : null;
  const videoSrc = lastVideo?.video ? resolveMediaUrl(lastVideo.video) : "";

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="#0043d8" size={50} />
      </div>
    );
  }
  if (!videoSrc) {
    return (
      <div className="text-center text-lg leading-relaxed md:text-xl h-screen flex items-center justify-center">
        No video found
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

  return (
    <section className="absolute top-0 left-0 right-0 h-screen">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <ClipLoader color="#0043d8" size={50} />
        </div>
      ) : (
        <video
          className="relative h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
        />
      )}
    </section>
  );
}
