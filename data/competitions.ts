import { getTeamParticipations, type CtftimeParticipation } from "@/lib/ctftime";

export interface Competition {
  id: string;
  name: string;
  organizer: string;
  date: string;
  place?: number | null;
  totalTeams?: number | null;
  points?: number | null;
  teamSize: number;
  ctfTimeUrl?: string;
  highlights?: { challenge: string; author: string }[];
  /** When present, this row comes from CTFtime; otherwise it's manually added. */
  source?: "ctftime" | "manual";
  /**
   * Optional event window for "Live" badge. When both set and current time is between them,
   * the competition is shown as live. Use ISO or "YYYY-MM-DD" strings.
   * For manual entries, set these to the CTF's actual start/end.
   */
  eventStart?: string;
  eventFinish?: string;
}

/** Manually added competitions (always shown; you can add more here). */
export const manualCompetitions: Competition[] = [
  {
    id: "1",
    name: "Cyber Odyssey",
    organizer: "Akasec 1337",
    date: "2025-03-15",
    place: 10,
    totalTeams: 26,
    points: 3631,
    teamSize: 5,
    highlights: [
      // { challenge: "Web 500", author: "Alex Chen" },
      // { challenge: "Forensics 400", author: "Sam Rivera" },
    ],
    eventStart: "2025-12-03",
    eventFinish: "2025-12-07",
  },
  {
    id: "2",
    name: "MACC 2026",
    organizer: "DGSSI x SecDojo",
    date: "2026-03-12",
    place: 44,
    totalTeams: 1135,
    points: null,
    teamSize: 5,
    eventStart: "2026-03-12",
    eventFinish: "2026-03-19",
  },
].map((c) => ({ ...c, source: "manual" as const }));

/** All competitions (manual only). Use getCompetitionsMerged() for CTFtime + manual. */
export const competitions: Competition[] = manualCompetitions;

/** Merges manual competitions with CTFtime participations, sorted newest first. Never throws. */
export async function getCompetitionsMerged(): Promise<Competition[]> {
  let ctftimeList: CtftimeParticipation[] = [];
  try {
    const ctftime = await getTeamParticipations();
    ctftimeList = Array.isArray(ctftime) ? ctftime : [];
  } catch {
    // Use manual only if CTFtime fails
  }
  const manual = manualCompetitions;
  const ctftimeAsCompetition: Competition[] = ctftimeList.map((c) => ({
    id: c.id,
    name: c.name,
    organizer: c.organizer,
    date: c.date,
    place: c.place,
    totalTeams: c.totalTeams,
    points: c.points,
    teamSize: c.teamSize ?? 4,
    ctfTimeUrl: c.ctfTimeUrl,
    source: "ctftime",
    eventStart: c.eventStart,
    eventFinish: c.eventFinish,
  }));
  const merged = [...manual, ...ctftimeAsCompetition];
  const byKey = new Map<string, Competition>();
  for (const c of merged) {
    const key = c.source === "ctftime" ? c.id : `manual-${c.id}-${c.date}`;
    if (!byKey.has(key)) byKey.set(key, c);
  }
  return Array.from(byKey.values()).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

/** Sorted newest first (manual only). Prefer getCompetitionsMerged() for the page. */
export function getCompetitionsSorted(): Competition[] {
  return [...competitions].sort((a, b) => b.date.localeCompare(a.date));
}

/** Top N by place from the given list (e.g. from getCompetitionsMerged()). */
export function getTopPlacementsFrom(
  list: Competition[],
  count: number
): Competition[] {
  return [...list]
    .filter((c) => c.place != null)
    .sort((a, b) => (a.place ?? 999) - (b.place ?? 999))
    .slice(0, count);
}
