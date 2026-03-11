"use client";

import Image from "next/image";

const defaultImageClass = "w-[min(70vw,520px)] h-auto opacity-[0.05] -rotate-12 object-contain";

/** Faded, tilted logo for use as a background watermark. */
export function LogoWatermark({
  className = "",
  imageClassName = defaultImageClass,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <Image
        src="/logo.png"
        alt=""
        width={640}
        height={168}
        className={imageClassName}
      />
    </div>
  );
}
