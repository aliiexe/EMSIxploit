"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { TEAM_SLIDER_MEDIA } from "@/data/team-slider";

const SLIDE_WIDTH = 320;
const SLIDE_GAP = 24;
const ANIMATION_DURATION = 40; // seconds for one full cycle

function VideoSlide({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden
    />
  );
}

export function TeamMediaSlider() {
  if (TEAM_SLIDER_MEDIA.length === 0) return null;

  const slides = [...TEAM_SLIDER_MEDIA, ...TEAM_SLIDER_MEDIA];
  const totalWidth = slides.length * (SLIDE_WIDTH + SLIDE_GAP) - SLIDE_GAP;

  return (
    <section
      className="relative w-full overflow-hidden py-8"
      aria-label="Club photos and videos"
    >
      {/* Left gradient: transparent → solid (content fades in from the left) */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 flex-shrink-0 bg-gradient-to-r from-[var(--bg-primary)] to-transparent sm:w-40"
        aria-hidden
      />
      {/* Right gradient: solid → transparent (content fades out to the right) */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 flex-shrink-0 bg-gradient-to-l from-[var(--bg-primary)] to-transparent sm:w-40"
        aria-hidden
      />

      <div className="relative flex w-full overflow-hidden">
        <div
          className="flex flex-shrink-0 animate-team-slider gap-6"
          style={{
            width: totalWidth,
            animationDuration: `${ANIMATION_DURATION}s`,
          }}
        >
          {slides.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="relative flex-shrink-0 overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]"
              style={{ width: SLIDE_WIDTH }}
            >
              <div className="relative aspect-[4/3] w-full bg-[var(--glass-bg)]">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="320px"
                    unoptimized={item.src.startsWith("/team-slider/")}
                  />
                ) : (
                  <VideoSlide src={item.src} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
