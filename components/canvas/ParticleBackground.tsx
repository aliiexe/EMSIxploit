"use client";

/**
 * Minimal background: soft radial gradient for depth.
 * No particles, no circuit lines — pro clean look.
 */
export function ParticleBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(36, 233, 46, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(36, 233, 46, 0.04) 0%, transparent 40%),
          var(--bg-primary)
        `,
      }}
    />
  );
}
