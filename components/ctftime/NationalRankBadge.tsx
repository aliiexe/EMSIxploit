import Link from "next/link";
import { getNationalRank } from "@/lib/ctftime";

const FLAG_MA = "🇲🇦";

export type NationalRankData = Awaited<ReturnType<typeof getNationalRank>>;

/** Server component: shows CTFtime national ranking when available. Pass rank to skip fetch. */
export async function NationalRankBadge({
  variant = "default",
  className = "",
  rank: rankProp,
}: {
  variant?: "default" | "compact" | "footer";
  className?: string;
  rank?: NationalRankData;
}) {
  const rank = rankProp ?? (await getNationalRank());
  if (!rank) return null;

  const label =
    rank.countryCode === "MA"
      ? "Morocco"
      : rank.countryCode;

  if (variant === "footer") {
    return (
      <a
        href="https://ctftime.org/team/414843"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 font-mono text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] ${className}`}
      >
        <span aria-hidden className="text-lg leading-none">{FLAG_MA}</span>
        <span>#{rank.countryPlace} in {label}</span>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href="https://ctftime.org/team/414843"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1.5 font-mono text-xs text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/30 hover:text-[var(--accent)] ${className}`}
      >
        <span aria-hidden className="text-base leading-none">{FLAG_MA}</span>
        <span>#{rank.countryPlace} in {label}</span>
      </Link>
    );
  }

  return (
    <Link
      href="https://ctftime.org/team/414843"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2.5 font-mono text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/30 hover:text-[var(--accent)] ${className}`}
    >
      <span aria-hidden className="text-2xl leading-none">{FLAG_MA}</span>
      <span>
        <strong className="text-[var(--accent)]">#{rank.countryPlace}</strong>
        {" "}in {label}
        {" "}
        <span className="text-[var(--text-muted)]">· CTFtime</span>
      </span>
    </Link>
  );
}
