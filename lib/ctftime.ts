/**
 * CTFtime.org API integration.
 * - Top teams by country (national ranking)
 * - Upcoming / past events
 * Fetches are server-side only; use in Server Components or API routes.
 */

import { unstable_cache } from "next/cache";

const CTFTIME_API = "https://ctftime.org/api/v1";
const OUR_TEAM_ID = 414843;
const COUNTRY_CODE = "ma"; // Morocco

export interface CtftimeCountryTeam {
  country_place: number;
  team_id: number;
  points: number;
  team_country: string;
  place: number;
  team_name: string;
  events: number;
}

export interface CtftimeEvent {
  id: number;
  title: string;
  description: string;
  url: string;
  start: string;
  finish: string;
  format: string;
  ctftime_url: string;
  participants: number;
  organizers: { id: number; name: string }[];
  logo?: string;
  weight?: number;
}

/** Results API: year -> event_id -> { title, scores[] } */
export interface CtftimeResultsYear {
  [eventId: string]: {
    title: string;
    scores: { team_id: number; points: string; place: number }[];
  };
}

const FETCH_OPTIONS: RequestInit = {
  next: { revalidate: 3600 },
  headers: {
    Accept: "application/json",
    "User-Agent": "emsixploit-website (CTFtime integration)",
  },
};

/** Fetch top teams by country. Returns our rank or null. */
export async function getNationalRank(): Promise<{
  countryPlace: number;
  totalPoints: number;
  globalPlace: number;
  eventsCount: number;
  countryCode: string;
} | null> {
  try {
    const res = await fetch(`${CTFTIME_API}/top-by-country/${COUNTRY_CODE}/`, FETCH_OPTIONS);
    if (!res.ok) return null;
    const data = (await res.json()) as CtftimeCountryTeam[];
    const us = data.find((t) => t.team_id === OUR_TEAM_ID);
    if (!us) return null;
    return {
      countryPlace: us.country_place,
      totalPoints: us.points,
      globalPlace: us.place,
      eventsCount: us.events,
      countryCode: us.team_country,
    };
  } catch {
    return null;
  }
}

/** Fetch upcoming events. start/finish are Unix timestamps. Includes events that started recently so ongoing ("live") events appear. */
export async function getUpcomingEvents(
  limit = 10,
  start?: number,
  finish?: number
): Promise<CtftimeEvent[]> {
  const now = Math.floor(Date.now() / 1000);
  const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).getTime() / 1000;
  const threeDaysAgo = now - 3 * 24 * 3600;
  const startTs = start ?? threeDaysAgo;
  const finishTs = finish ?? endOfYear;
  try {
    const url = `${CTFTIME_API}/events/?limit=${limit}&start=${startTs}&finish=${finishTs}`;
    const res = await fetch(url, { ...FETCH_OPTIONS, next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const data = (await res.json()) as CtftimeEvent[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Participation entry from CTFtime results (before event detail enrichment). */
export interface CtftimeParticipationRaw {
  eventId: string;
  title: string;
  place: number;
  points: number;
  totalTeams: number;
}

/** Fetches results for a single year and returns our team's participations. */
async function fetchTeamResultsForYear(year: number): Promise<CtftimeParticipationRaw[]> {
  try {
    const res = await fetch(`${CTFTIME_API}/results/${year}/`, FETCH_OPTIONS);
    if (!res.ok) return [];
    const data = (await res.json()) as CtftimeResultsYear;
    const out: CtftimeParticipationRaw[] = [];
    for (const [eventId, event] of Object.entries(data)) {
      const ourScore = event.scores.find((s) => s.team_id === OUR_TEAM_ID);
      if (!ourScore) continue;
      out.push({
        eventId,
        title: event.title,
        place: ourScore.place,
        points: parseFloat(ourScore.points) || 0,
        totalTeams: event.scores.length,
      });
    }
    return out;
  } catch {
    return [];
  }
}

/** Fetches a single event's details (date, organizers, url). */
async function fetchEventDetails(eventId: string): Promise<{
  start: string;
  finish: string;
  organizers: string;
  ctftime_url: string;
} | null> {
  try {
    const res = await fetch(`${CTFTIME_API}/events/${eventId}/`, FETCH_OPTIONS);
    if (!res.ok) return null;
    const event = (await res.json()) as CtftimeEvent;
    const organizers =
      event.organizers?.map((o) => o.name).join(", ") || "";
    return {
      start: event.start,
      finish: event.finish,
      organizers,
      ctftime_url: event.ctftime_url || `https://ctftime.org/event/${eventId}`,
    };
  } catch {
    return null;
  }
}

/** Normalize event start to YYYY-MM-DD for sorting/display. */
function eventDateToIso(start: string): string {
  const d = new Date(start);
  return d.toISOString().slice(0, 10);
}

export interface CtftimeParticipation {
  id: string;
  name: string;
  organizer: string;
  date: string;
  place: number;
  totalTeams: number;
  points: number;
  teamSize?: number;
  ctfTimeUrl: string;
  source: "ctftime";
  eventStart?: string;
  eventFinish?: string;
}

/** Internal: fetches participations without cache (used by cached wrapper). Never throws. */
async function getTeamParticipationsUncached(): Promise<CtftimeParticipation[]> {
  try {
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1]; // 2 years to reduce API calls
    const rawByYear = await Promise.all(
      years.map((y) => fetchTeamResultsForYear(y))
    );
    const raw: CtftimeParticipationRaw[] = rawByYear.flat();
    const byEventId = new Map<string, CtftimeParticipationRaw>();
    for (const r of raw) {
      if (!byEventId.has(r.eventId)) byEventId.set(r.eventId, r);
    }
    const participations = Array.from(byEventId.values());
    const enriched = await Promise.all(
      participations.map(async (p) => {
        const details = await fetchEventDetails(p.eventId);
        const date = details
          ? eventDateToIso(details.start)
          : new Date().toISOString().slice(0, 10);
        const organizer = details?.organizers ?? "";
        const ctftime_url =
          details?.ctftime_url ?? `https://ctftime.org/event/${p.eventId}`;
        return {
          id: `ctftime-${p.eventId}`,
          name: p.title,
          organizer,
          date,
          place: p.place,
          totalTeams: p.totalTeams,
          points: Math.round(p.points),
          teamSize: 4,
          ctfTimeUrl: ctftime_url,
          source: "ctftime" as const,
          eventStart: details?.start,
          eventFinish: details?.finish,
        };
      })
    );
    return enriched;
  } catch {
    return [];
  }
}

/**
 * Fetches all CTFtime events our team participated in (from results API),
 * enriched with event date and organizers. Cached for 1 hour.
 */
export const getTeamParticipations = unstable_cache(
  getTeamParticipationsUncached,
  ["ctftime-team-participations"],
  { revalidate: 3600, tags: ["ctftime"] }
);

export { OUR_TEAM_ID, COUNTRY_CODE };
