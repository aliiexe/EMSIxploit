/**
 * CTF competition lineup — independent from club members (data/members.ts).
 * 5 starters + 5 reserves. Edit names, ranks, and focus here.
 */

export type CtfPlayerRank = "noob" | "rookie" | "veteran" | "elite" | "h4xor";

export const CTF_RANK_LABELS: Record<CtfPlayerRank, string> = {
  noob: "Noob",
  rookie: "Rookie",
  veteran: "Veteran",
  elite: "Elite",
  h4xor: "h4xor",
};

export const CTF_RANK_ORDER: CtfPlayerRank[] = ["noob", "rookie", "veteran", "elite", "h4xor"];

/** Numeric tier for display & sort (1 = lowest, 4 = highest) */
export const CTF_RANK_TIER: Record<CtfPlayerRank, number> = {
  noob: 1,
  rookie: 2,
  veteran: 3,
  elite: 4,
  h4xor: 5,
};

/** Sort roster by grade: highest rank first (h4xor → elite → rookie → noob), then by name. */
export function sortRosterByRankDesc(slots: CtfRosterSlot[]): CtfRosterSlot[] {
  return slots
    .map((slot, index) => ({ slot, index }))
    .sort((a, b) => {
      const diff = CTF_RANK_TIER[b.slot.rank] - CTF_RANK_TIER[a.slot.rank];
      if (diff !== 0) return diff;
      return a.index - b.index;
    })
    .map(({ slot }) => slot);
}

export interface CtfRosterSlot {
  name: string;
  rank: CtfPlayerRank;
  /** e.g. web, pwn, crypto, forensics, misc */
  focus?: string;
}

/** Starting five — main competition lineup */
export const ctfRosterPrimary: CtfRosterSlot[] = [
  { name: "Youssef Dirgham", rank: "elite", focus: "Lead — All Lanes" },
  { name: "Elias Chakroun", rank: "rookie", focus: "Generalist" },
  { name: "Salmane El Hjouji", rank: "rookie", focus: "Generalist" },
  { name: "Saad El Hadaoui", rank: "rookie", focus: "Generalist" },
  { name: "Hajar Rezzad", rank: "rookie", focus: "Generalist" },
];

/** Reserves — alternates & emergency subs */
export const ctfRosterReserves: CtfRosterSlot[] = [
  { name: "Nissrine Dahhak", rank: "rookie", focus: "Generalist" },
  { name: "Khadija Kari", rank: "rookie", focus: "Generalist" },
  { name: "Younes El Borj", rank: "rookie", focus: "Generalist" },
  { name: "Moncef Diraa", rank: "rookie", focus: "Generalist" },
  { name: "Oussama Erremich", rank: "rookie", focus: "Generalist" },
];
