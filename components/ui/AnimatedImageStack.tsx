"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface AnimatedImageStackProps {
  images: string[];
}

export default function AnimatedImageStack({ images }: AnimatedImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play the stack
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--bg-primary)] text-[var(--text-muted)]">
        <span className="text-sm">No image</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt="News Image"
        fill
        className="object-cover"
        sizes="(max-width: 639px) 100vw, 360px"
        priority
      />
    );
  }

  // Calculate the order of images to render so the current one is on top
  const visibleImages = [];
  for (let i = 0; i < Math.min(3, images.length); i++) {
    const index = (currentIndex + i) % images.length;
    visibleImages.push({ url: images[index], originalIndex: index, offset: i });
  }

  return (
    <div 
      className="relative h-full w-full cursor-pointer perspective-[1000px]" 
      onClick={handleNext}
      title="Click to view next image"
    >
      <AnimatePresence mode="popLayout">
        {visibleImages.reverse().map((img) => (
          <motion.div
            key={img.originalIndex}
            className="absolute inset-0 origin-bottom rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{
              opacity: 1 - img.offset * 0.3,
              scale: 1 - img.offset * 0.05,
              y: img.offset * 20,
              zIndex: 10 - img.offset,
            }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image
              src={img.url}
              alt={`News Image ${img.originalIndex + 1}`}
              fill
              className="rounded-xl object-cover"
              sizes="(max-width: 639px) 100vw, 360px"
              priority={img.offset === 0}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Dark gradient overlay for slider visibility */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-1/4 rounded-b-xl bg-gradient-to-t from-black/80 to-transparent" />

      {/* Pagination indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-4 bg-[var(--accent)]" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
