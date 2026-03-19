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
  return [...slots].sort((a, b) => {
    const diff = CTF_RANK_TIER[b.rank] - CTF_RANK_TIER[a.rank];
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });
}

export interface CtfRosterSlot {
  name: string;
  rank: CtfPlayerRank;
  /** e.g. web, pwn, crypto, forensics, misc */
  focus?: string;
}

/** Starting five — main competition lineup */
export const ctfRosterPrimary: CtfRosterSlot[] = [
  { name: "Youssef Dirgham", rank:"elite", focus: "Lead — all lanes" },
  { name: "Moncef Diraa", rank: "veteran", focus: "Forensics, Crypto" },
  { name: "Younes Tarik", rank: "rookie", focus: "Web security, AI" },
  { name: "Ali Bourak", rank: "rookie", focus: "Web security, AI" },
  { name: "Oussama Erremich", rank: "veteran", focus: "Steganography, Forensics" },
];

/** Reserves — alternates & emergency subs */
export const ctfRosterReserves: CtfRosterSlot[] = [
  { name: "Player F", rank: "noob", focus: "null" },
  { name: "Player G", rank: "noob", focus: "null" },
  { name: "Player H", rank: "noob", focus: "null" },
  { name: "Player I", rank: "noob", focus: "null" },
  { name: "Player J", rank: "noob", focus: "null" },
];
