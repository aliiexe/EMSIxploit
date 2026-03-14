import { Suspense } from "react";
import { Trophy, Award, Users } from "lucide-react";
import {
  getCompetitionsMerged,
  getTopPlacementsFrom,
  manualCompetitions,
  type Competition,
} from "@/data/competitions";
import { TEAM_SIZE_RANGE } from "@/data/team";
import { GlassCard } from "@/components/ui/GlassCard";
import { NationalRankBadge } from "@/components/ctftime/NationalRankBadge";
import { UpcomingEvents } from "@/components/ctftime/UpcomingEvents";
import { getNationalRank, getUpcomingEvents } from "@/lib/ctftime";

const PLACE_SUFFIX = (n: number) =>
  n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function CompetitionsSkeleton() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-8 md:px-10" data-animated-section>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ gap: "2rem" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card h-[120px] animate-pulse rounded-xl" />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-[var(--glass-bg)]" />
      </div>
      <div className="mt-16 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-[var(--glass-bg)]" />
        ))}
      </div>
      <div className="mt-16 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-[var(--glass-bg)]" />
        ))}
      </div>
    </section>
  );
}

async function CompetitionsContent() {
  let sorted: Competition[];
  let nationalRank: Awaited<ReturnType<typeof getNationalRank>> = null;
  let upcomingEvents: Awaited<ReturnType<typeof getUpcomingEvents>> = [];
  try {
    const [merged, rank, events] = await Promise.all([
      getCompetitionsMerged(),
      getNationalRank().catch(() => null),
      getUpcomingEvents(8).catch(() => []),
    ]);
    sorted = merged;
    nationalRank = rank;
    upcomingEvents = events;
  } catch {
    sorted = [...manualCompetitions].sort((a, b) => b.date.localeCompare(a.date));
  }
  const topThree = getTopPlacementsFrom(sorted, 3);
  const totalEvents = sorted.length;
  const places = sorted.map((c) => c.place ?? 999).filter((p) => p < 999);
  const bestPlace = places.length ? Math.min(...places) : 0;
  const hasBest = bestPlace > 0 && sorted.some((c) => c.place === bestPlace);

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-8 md:px-10" data-animated-section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ gap: "2rem" }}>
          <div className="glass-card p-6 text-center">
            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalEvents}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Events</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {hasBest ? `${bestPlace}${PLACE_SUFFIX(bestPlace)}` : ""}
            </p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Best place</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-2xl font-bold text-[var(--text-primary)]">{TEAM_SIZE_RANGE}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Team size</p>
          </div>
          <div className="glass-card p-6 text-center">
            <a
              href="https://ctftime.org/team/414843"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold text-[var(--accent)] hover:underline"
            >
              CTFtime
            </a>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Profile</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <NationalRankBadge variant="default" rank={nationalRank} />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-8 md:px-10" data-animated-section>
        <h2 className="mb-6 text-xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
          Upcoming CTFs
        </h2>
        <UpcomingEvents limit={8} events={upcomingEvents} />
      </section>

      {topThree.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-8 md:px-10" data-animated-section>
          <h2 className="mb-6 text-xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
            Top placements
          </h2>
          <div className="grid gap-4 sm:grid-cols-3" style={{ gap: "2rem" }}>
            {topThree.map((c, i) => (
              <GlassCard key={c.id} variant="md" index={i}>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs ${i === 0 ? "bg-amber-500/20 text-amber-400" : i === 1 ? "bg-neutral-400/20 text-neutral-300" : "bg-amber-700/30 text-amber-600"}`}>
                    <Trophy className="h-3.5 w-3.5" />
                    {c.place}
                    {PLACE_SUFFIX(c.place ?? 0)} of {c.totalTeams ?? "?"}
                  </span>
                </div>
                <h3 className="mt-2 font-semibold text-[var(--text-primary)]">{c.name}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{c.organizer}</p>
                <p className="mt-2 font-mono text-xs text-[var(--accent)]">
                  {formatDate(c.date)}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-6 pb-24 sm:px-8 md:px-10" data-animated-section>
        <h2 className="mb-6 text-xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
          Competition timeline
        </h2>
        <div className="space-y-4 sm:space-y-5">
          {sorted.map((c, i) => (
            <CompetitionRow
              key={c.id}
              competition={c}
              isLast={i === sorted.length - 1}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="https://ctftime.org/team/414843"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-dim)] px-5 py-2.5 text-sm font-semibold text-[#040a06] transition-opacity duration-[0.4s] hover:opacity-90"
          >
            View us on CTFtime →
          </a>
        </div>
      </section>
    </>
  );
}

export default function CompetitionsPage() {
  return (
    <>
      <section className="px-6 py-[8rem] sm:px-8 md:px-10" data-animated-section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            We Compete. We Place. We Learn.
          </h1>
          <p className="mt-6 text-lg leading-[1.7] text-[var(--text-muted)]">
            Our track record in CTF and security competitions.
          </p>
        </div>
      </section>

      <Suspense fallback={<CompetitionsSkeleton />}>
        <CompetitionsContent />
      </Suspense>
    </>
  );
}

function isCompetitionLive(c: Competition): boolean {
  if (!c.eventStart || !c.eventFinish) return false;
  const now = Date.now();
  let start = new Date(c.eventStart).getTime();
  let finish = new Date(c.eventFinish).getTime();
  if (c.eventFinish.length <= 10) finish = new Date(c.eventFinish + "T23:59:59.999Z").getTime();
  if (c.eventStart.length <= 10) start = new Date(c.eventStart + "T00:00:00.000Z").getTime();
  return now >= start && now <= finish;
}

function CompetitionRow({
  competition,
  isLast,
}: {
  competition: Competition;
  isLast: boolean;
}) {
  const isCtftime = competition.source === "ctftime";
  const isLive = isCompetitionLive(competition);
  return (
    <div
      className={`flex gap-6 border-l-2 pl-6 ${
        isLast ? "" : "pb-2 sm:pb-3"
      } ${
        isLive
          ? "border-[var(--accent)]/70 -ml-px"
          : "border-[var(--glass-border)]/80 -ml-px"
      }`}
    >
      <div
        className={`flex-1 rounded-xl border px-4 py-4 sm:px-5 sm:py-5 transition-[border,background,transform,box-shadow] duration-[0.35s] ${
          isLive
            ? "border-[var(--accent)]/60 bg-[var(--accent)]/10 shadow-[0_0_28px_rgba(36,233,46,0.25)]"
            : "border-[var(--glass-border)] bg-[var(--glass-bg)] hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(0,0,0,0.45)]"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-xs text-[var(--text-muted)]">
            {formatDate(competition.date)}
          </p>
          {isLive && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/20 px-2 py-0.5 font-mono text-xs font-medium text-[var(--accent)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              Live
            </span>
          )}
          {isCtftime && competition.ctfTimeUrl && (
            <a
              href={competition.ctfTimeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--accent)] hover:underline"
            >
              CTFtime
            </a>
          )}
        </div>
        <h3 className="mt-1 font-semibold text-[var(--text-primary)]">
          {competition.name}
        </h3>
        <p className="text-sm leading-[1.7] text-[var(--text-muted)]">
          {competition.organizer}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 font-mono text-sm text-[var(--text-muted)]">
          {competition.place != null && (
            <span>
              <Award className="inline h-4 w-4 align-middle" /> {competition.place}
              {PLACE_SUFFIX(competition.place)}
              {competition.totalTeams != null && ` / ${competition.totalTeams}`}
            </span>
          )}
          <span>
            <Users className="inline h-4 w-4 align-middle" /> {competition.teamSize} members
          </span>
        </div>
        {competition.highlights && competition.highlights.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs text-[var(--text-muted)]">
            {competition.highlights.map((h, i) => (
              <li key={i}>
                {h.challenge} — {h.author}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
