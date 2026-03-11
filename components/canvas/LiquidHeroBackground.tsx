"use client";

import { useEffect, useRef, useState } from "react";

const GREEN = "36, 233, 46"; // #24E92E
const DARK = "10, 10, 10";

export function LiquidHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Base dark
      ctx.fillStyle = `rgb(${DARK})`;
      ctx.fillRect(0, 0, w, h);

      const speed = 0.00035;
      t += 1;

      // Overlapping soft blobs with slow, organic motion (liquid / warp feel)
      const blobs = [
        { phaseX: 0, phaseY: 0.3, radius: 0.85, intensity: 0.14 },
        { phaseX: 0.5, phaseY: 0.8, radius: 0.6, intensity: 0.1 },
        { phaseX: 0.2, phaseY: 0.6, radius: 0.7, intensity: 0.08 },
        { phaseX: 0.7, phaseY: 0.1, radius: 0.5, intensity: 0.06 },
        { phaseX: 0.4, phaseY: 0.5, radius: 0.45, intensity: 0.05 },
      ];

      const maxR = Math.max(w, h) * 1.1;

      for (const blob of blobs) {
        const x =
          cx +
          Math.sin(t * speed + blob.phaseX * Math.PI * 2) * w * 0.28 +
          Math.sin(t * speed * 0.6 + blob.phaseY * Math.PI * 2) * w * 0.12;
        const y =
          cy +
          Math.cos(t * speed * 0.85 + blob.phaseY * Math.PI * 2) * h * 0.22 +
          Math.cos(t * speed * 0.55 + blob.phaseX * Math.PI * 2) * h * 0.12;

        const r = maxR * blob.radius;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${GREEN}, ${blob.intensity})`);
        gradient.addColorStop(0.35, `rgba(${GREEN}, ${blob.intensity * 0.4})`);
        gradient.addColorStop(0.65, `rgba(${GREEN}, 0.02)`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 30%, rgba(${GREEN}, 0.08) 0%, transparent 55%),
            radial-gradient(ellipse 70% 80% at 80% 70%, rgba(${GREEN}, 0.04) 0%, transparent 50%),
            rgb(${DARK})
          `,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full overflow-hidden"
      aria-hidden
      style={{ background: `rgb(${DARK})` }}
    />
  );
}
