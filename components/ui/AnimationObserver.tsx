"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function AnimationObserver() {
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      { rootMargin: "-40px 0px -40px 0px", threshold: 0 }
    );

    const observed = new Set<Element>();

    function observeAll() {
      const els = document.querySelectorAll("[data-animated-section]");
      els.forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          intersectionObserver.observe(el);
        }
      });
    }

    const rafId = requestAnimationFrame(() => {
      observeAll();
      // Re-scan after a delay so streamed content (e.g. Suspense on competitions) is picked up
      const timeoutId = setTimeout(observeAll, 600);
      let mutationScheduled = false;
      const mutation = new MutationObserver(() => {
        if (mutationScheduled) return;
        mutationScheduled = true;
        requestAnimationFrame(() => {
          observeAll();
          mutationScheduled = false;
        });
      });
      mutation.observe(document.body, { childList: true, subtree: true });

      cleanupRef.current = () => {
        clearTimeout(timeoutId);
        mutation.disconnect();
        observed.forEach((el) => intersectionObserver.unobserve(el));
        intersectionObserver.disconnect();
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [pathname]);

  return null;
}
