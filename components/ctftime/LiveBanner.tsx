import Link from "next/link";
import { Radio } from "lucide-react";
import { currentLiveCtf } from "@/data/live";

/** Renders a "We're live" banner when currentLiveCtf is set in data/live.ts. */
export function LiveBanner() {
  if (!currentLiveCtf) return null;

  return (
    <Link
      href={currentLiveCtf.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 rounded-xl border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/70 hover:bg-[var(--accent)]/15"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
      </span>
      <Radio className="h-4 w-4 text-[var(--accent)]" />
      <span>
        We&apos;re live at <strong className="text-[var(--accent)]">{currentLiveCtf.name}</strong>
      </span>
    </Link>
  );
}
