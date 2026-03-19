import type { CSSProperties } from "react";
import { Shield, Users } from "lucide-react";
import {
  type CtfPlayerRank,
  type CtfRosterSlot,
  CTF_RANK_LABELS,
  CTF_RANK_ORDER,
  ctfRosterPrimary,
  ctfRosterReserves,
  sortRosterByRankDesc,
} from "@/data/ctf-roster";

function rankStyles(rank: CtfPlayerRank): string {
  switch (rank) {
    case "noob":
      return "border-neutral-500/50 bg-neutral-900/50 text-neutral-300 ring-1 ring-neutral-500/30";
    case "rookie":
      return "border-sky-500/50 bg-sky-950/40 text-sky-200 ring-1 ring-sky-500/25";
    case "elite":
      return "border-amber-500/60 bg-amber-950/35 text-amber-300 ring-1 ring-amber-500/35 ctf-rank-badge-elite";
    case "h4xor":
      return "border-[var(--accent)]/70 bg-[var(--accent)]/20 text-[var(--accent)] ring-2 ring-[var(--accent)]/40 font-mono font-bold tracking-wider ctf-rank-badge-h4xor sm:px-2.5 sm:py-1.5";
    default:
      return "border-[var(--glass-border)] text-[var(--text-muted)]";
  }
}

/** Row chrome: left stripe + background so each grade reads clearly vs others */
function rowStyles(rank: CtfPlayerRank): string {
  switch (rank) {
    case "h4xor":
      return "border-l-[5px] border-l-[var(--accent)] bg-gradient-to-r from-[var(--accent)]/[0.12] to-transparent pl-3 shadow-[inset_0_0_0_1px_rgba(36,233,46,0.06)]";
    case "elite":
      return "border-l-[5px] border-l-amber-500 bg-gradient-to-r from-amber-500/[0.1] to-transparent pl-3";
    case "rookie":
      return "border-l-[5px] border-l-sky-500 bg-gradient-to-r from-sky-500/[0.08] to-transparent pl-3";
    case "noob":
      return "border-l-[5px] border-l-neutral-600 bg-gradient-to-r from-neutral-800/40 to-transparent pl-3 opacity-95";
    default:
      return "border-l-[5px] border-l-[var(--glass-border)] pl-3";
  }
}

function RankBadge({
  rank,
  shineDelaySec,
  className = "",
}: {
  rank: CtfPlayerRank;
  shineDelaySec?: number;
  className?: string;
}) {
  return (
    <span
      className={`ctf-rank-badge shrink-0 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition-transform duration-300 hover:scale-105 sm:text-xs ${rankStyles(rank)} ${className}`}
      style={
        shineDelaySec != null
          ? ({ "--ctf-shine-delay": `${shineDelaySec}s` } as CSSProperties)
          : undefined
      }
    >
      <span className="ctf-rank-badge-label">{CTF_RANK_LABELS[rank]}</span>
    </span>
  );
}

function RosterRow({ slot, displayIndex }: { slot: CtfRosterSlot; displayIndex: number }) {
  const shineDelay = (displayIndex % 5) * 0.35 + (slot.rank === "h4xor" ? 0 : displayIndex * 0.06);

  return (
    <div
      className={`group/row flex items-center gap-3 rounded-xl border border-[var(--glass-border)]/80 py-3 pr-4 transition-[box-shadow] duration-300 hover:shadow-[0_0_24px_rgba(0,0,0,0.35)] sm:gap-4 ${rowStyles(slot.rank)}`}
    >
      <span className="w-8 shrink-0 text-center font-mono text-xs text-[var(--text-muted)] sm:w-9">
        {displayIndex + 1}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-[var(--text-primary)]">{slot.name}</p>
        {slot.focus && slot.focus !== "null" && (
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">{slot.focus}</p>
        )}
      </div>
      <RankBadge rank={slot.rank} shineDelaySec={shineDelay} />
    </div>
  );
}

export function CtfTeamRankings() {
  const starters = sortRosterByRankDesc(ctfRosterPrimary);
  const reserves = sortRosterByRankDesc(ctfRosterReserves);

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-8 md:px-10" data-animated-section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
            CTF team
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Grades</span>
          <div className="flex flex-wrap justify-end gap-2">
            {[...CTF_RANK_ORDER].reverse().map((r, i) => (
              <RankBadge key={r} rank={r} shineDelaySec={i * 0.45} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-[var(--accent)] motion-safe:animate-pulse" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Starters</h3>
            <span className="text-xs text-[var(--text-muted)]">Main five</span>
          </div>
          <div className="space-y-2.5">
            {starters.map((slot, i) => (
              <RosterRow key={`p-${slot.name}`} slot={slot} displayIndex={i} />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-[var(--text-muted)]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Reserves</h3>
            <span className="text-xs text-[var(--text-muted)]">Alternates</span>
          </div>
          <div className="space-y-2.5">
            {reserves.map((slot, i) => (
              <RosterRow key={`r-${slot.name}`} slot={slot} displayIndex={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
