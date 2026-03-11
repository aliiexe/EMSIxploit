"use client";

import { type HTMLAttributes } from "react";

const paddingMap = {
  sm: "p-5",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
  feature: "p-8 sm:p-10",
} as const;

type Variant = keyof typeof paddingMap;

export type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  delay?: number;
  /** For stagger: set on child to use animation-delay: calc(var(--i) * 0.1s) */
  index?: number;
};

export function GlassCard({
  variant = "md",
  delay: _delay = 0,
  index,
  className = "",
  children,
  style,
  ...props
}: GlassCardProps) {
  const padding = paddingMap[variant];
  return (
    <div
      data-animated-section
      className={`glass-card ${padding} ${className}`.trim()}
      style={index != null ? { ...style, ["--i" as string]: index } : style}
      {...props}
    >
      {children}
    </div>
  );
}
