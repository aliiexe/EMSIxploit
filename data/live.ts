/**
 * Set this when the team is currently playing a CTF to show a "We're live" banner.
 * Clear (set to null) when the CTF ends.
 */
export const currentLiveCtf: { name: string; url: string } | null = null;

// Example when you're live:
// export const currentLiveCtf = { name: "Hack the Box Uni CTF 2025", url: "https://ctftime.org/event/1234" };
