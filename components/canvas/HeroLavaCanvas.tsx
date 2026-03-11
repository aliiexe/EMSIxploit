"use client";

import { useRef, useEffect } from "react";

const BLOB_COLORS = ["#1ab320", "#1fc924", "#24E92E", "#2ef536", "#38ff3e", "#42ff46"] as const;

function drawBlob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  time: number,
  pulse = false
) {
  const r = pulse ? radius * (0.85 + 0.15 * Math.sin(time * 0.003)) : radius;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

export function HeroLavaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    let dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };

    const loop = () => {
      time += 16;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) {
        animationId = requestAnimationFrame(loop);
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#040a06";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "screen";

      const t = time * 0.001;
      const blobs: { x: number; y: number; radius: number; color: string; pulse?: boolean }[] = [
        { x: w * (0.2 + 0.12 * Math.sin(t * 0.7)), y: h * (0.7 + 0.15 * Math.cos(t * 0.5)), radius: w * 0.45, color: BLOB_COLORS[0] },
        { x: w * (0.75 + 0.1 * Math.cos(t * 0.6)), y: h * (0.25 + 0.12 * Math.sin(t * 0.4)), radius: w * 0.38, color: BLOB_COLORS[1] },
        { x: w * (0.5 + 0.2 * Math.sin(t * 0.3)), y: h * (0.5 + 0.2 * Math.cos(t * 0.35)), radius: w * 0.28, color: BLOB_COLORS[2] },
        { x: w * (0.35 + 0.15 * Math.cos(t * 0.45)), y: h * (0.6 + 0.1 * Math.sin(t * 0.5)), radius: w * 0.22, color: BLOB_COLORS[3] },
        { x: w * (0.48 + 0.08 * Math.sin(t * 0.8)), y: h * (0.72 + 0.06 * Math.cos(t * 0.7)), radius: w * 0.12, color: BLOB_COLORS[4], pulse: true },
        { x: w * (0.52 + 0.06 * Math.cos(t * 0.9)), y: h * (0.68 + 0.05 * Math.sin(t * 0.65)), radius: w * 0.08, color: BLOB_COLORS[5], pulse: true },
      ];

      blobs.forEach((b) => drawBlob(ctx, b.x, b.y, b.radius, b.color, time, b.pulse));

      ctx.globalCompositeOperation = "source-over";

      const vignetteH = h * 0.25;
      const topGrad = ctx.createLinearGradient(0, 0, 0, vignetteH);
      topGrad.addColorStop(0, "rgba(4,10,6,0.85)");
      topGrad.addColorStop(1, "transparent");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, vignetteH);

      const bottomGrad = ctx.createLinearGradient(0, h - vignetteH, 0, h);
      bottomGrad.addColorStop(0, "transparent");
      bottomGrad.addColorStop(1, "rgba(4,10,6,0.9)");
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, h - vignetteH, w, vignetteH);

      animationId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: "#040a06" }}
      aria-hidden
    />
  );
}
