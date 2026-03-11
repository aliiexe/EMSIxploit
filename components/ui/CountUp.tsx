"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

type CountUpProps = {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function CountUp({ end, duration = 2, suffix = "", prefix = "", className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 2;
      const current = Math.round(eased * end);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
