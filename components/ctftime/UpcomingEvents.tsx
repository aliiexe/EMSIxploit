import { Calendar, ExternalLink } from "lucide-react";
import { getUpcomingEvents, type CtftimeEvent } from "@/lib/ctftime";
import { currentLiveCtf } from "@/data/live";

function parseEventTs(value: string): number {
  const ts = new Date(value).getTime();
  if (Number.isFinite(ts)) return ts;
  // Fallback for rare non-ISO formats from external APIs.
  const normalized = value.replace(" ", "T");
  const ts2 = new Date(normalized).getTime();
  return Number.isFinite(ts2) ? ts2 : NaN;
}

function formatEventDate(start: string, finish: string): string {
  const s = new Date(start);
  const f = new Date(finish);
  const sameDay = s.toDateString() === f.toDateString();
  const opts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  if (sameDay) return s.toLocaleDateString("en-US", opts);
  return `${s.toLocaleDateString("en-US", opts)} – ${f.toLocaleDateString("en-US", opts)}`;
}

/** Server component: list of upcoming CTFs from CTFtime, with "Live" badge for ongoing events. Pass events to skip fetch. */
export async function UpcomingEvents({
  limit = 8,
  events: eventsProp,
}: {
  limit?: number;
  events?: CtftimeEvent[];
}) {
  const events = eventsProp ?? (await getUpcomingEvents(limit));
  const now = Date.now();
  const liveEventIds = new Set(
    events
      .filter((e) => {
        const s = parseEventTs(e.start);
        const f = parseEventTs(e.finish);
        if (!Number.isFinite(s) || !Number.isFinite(f)) return false;
        // Small safety margin prevents "live" a few minutes too early
        // if provider clocks/feeds are slightly ahead.
        return now >= s + 60_000 && now <= f;
      })
      .map((e) => e.id)
  );
  const upcomingOnly = events.filter((e) => {
    const f = parseEventTs(e.finish);
    return Number.isFinite(f) && f >= now;
  });
  const sorted = [...upcomingOnly].sort((a, b) => {
    const aLive = liveEventIds.has(a.id);
    const bLive = liveEventIds.has(b.id);
    if (aLive !== bLive) return aLive ? -1 : 1;
    return parseEventTs(a.start) - parseEventTs(b.start);
  });
  const visibleEvents = sorted.slice(0, limit);

  // Fallback: if CTFtime API didn't return a live event but currentLiveCtf is set manually, show it.
  const shouldShowManualLive = Boolean(currentLiveCtf) && liveEventIds.size === 0;

  if (visibleEvents.length === 0 && !shouldShowManualLive) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        No upcoming events at the moment. Check{" "}
        <a
          href="https://ctftime.org/calendar/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] hover:underline"
        >
          CTFtime calendar
        </a>
        .
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {shouldShowManualLive && currentLiveCtf && (
        <li className="flex flex-col gap-1 rounded-xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 p-4 transition-colors hover:border-[var(--accent)]/70">
          <div className="flex items-start justify-between gap-3">
            <a
              href={currentLiveCtf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]"
            >
              {currentLiveCtf.name}
            </a>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/20 px-2 py-0.5 font-mono text-xs font-medium text-[var(--accent)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
                Live
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Live now (manual override)</p>
        </li>
      )}
      {visibleEvents.map((event) => {
        const live = liveEventIds.has(event.id);
        return (
          <li
            key={event.id}
            className={`flex flex-col gap-1 rounded-xl border p-4 transition-colors ${
              live
                ? "border-[var(--accent)]/50 bg-[var(--accent)]/5 hover:border-[var(--accent)]/70"
                : "border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--accent)]/20"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <a
                href={event.ctftime_url || event.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]"
              >
                {event.title}
              </a>
              <div className="flex items-center gap-2">
                {live && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/20 px-2 py-0.5 font-mono text-xs font-medium text-[var(--accent)]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    </span>
                    Live
                  </span>
                )}
                <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
              </div>
            </div>
            <p className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <Calendar className="h-3.5 w-3.5" />
              {formatEventDate(event.start, event.finish)}
              {event.format && (
                <>
                  <span className="text-[var(--glass-border)]">·</span>
                  <span>{event.format}</span>
                </>
              )}
            </p>
            {event.organizers?.length > 0 && (
              <p className="text-xs text-[var(--text-muted)]">
                {event.organizers.map((o) => o.name).join(", ")}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
