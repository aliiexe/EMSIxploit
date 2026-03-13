"use client";

import React from "react";

export function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-transparent text-white">
      <div className="hero-glow-wrap absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-70%",
            transform: "translateX(-50%)",
            width: "2200px",
            height: "1400px",
            borderRadius: "9999px",
            background:
              "radial-gradient(ellipse at center, rgba(0,255,110,0.18) 0%, rgba(0,255,110,0.10) 22%, rgba(0,255,110,0.05) 42%, rgba(0,255,110,0.02) 58%, rgba(0,255,110,0) 78%)",
            filter: "blur(140px)",
            opacity: 0.9,
            animation: "heroPulse 9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-60%",
            transform: "translateX(-50%)",
            width: "1700px",
            height: "1100px",
            borderRadius: "9999px",
            background:
              "radial-gradient(ellipse at center, rgba(0,255,110,0.18) 0%, rgba(0,255,110,0.12) 24%, rgba(0,255,110,0.07) 44%, rgba(0,255,110,0.03) 60%, rgba(0,255,110,0) 80%)",
            filter: "blur(110px)",
            opacity: 0.95,
            animation: "heroPulseSoft 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-48%",
            transform: "translateX(-50%)",
            width: "1150px",
            height: "760px",
            borderRadius: "9999px",
            background:
              "radial-gradient(ellipse at center, rgba(100,255,150,0.14) 0%, rgba(100,255,150,0.08) 30%, rgba(100,255,150,0.035) 52%, rgba(100,255,150,0) 76%)",
            filter: "blur(80px)",
            opacity: 0.85,
            animation: "heroPulseSoft 11s ease-in-out infinite",
          }}
        />
      </div>
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pt-24">{children}</div>
    </div>
  );
}
