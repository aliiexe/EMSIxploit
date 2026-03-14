/**
 * Central place for team and CTF static data.
 * Edit here to update stats, copy, and feature cards across the site.
 * Team count comes from data/members; CTF events count is passed from server (merged competitions).
 */

import { members } from "./members";

export interface StatItem {
  value: number;
  label: string;
  suffix: string;
}

/** Years active (manual; not derived from data). */
export const YEARS_ACTIVE = 1;

/** Default tools/write-ups when not derived from projects. */
const DEFAULT_TOOLS_BUILT = 0;
const DEFAULT_WRITEUPS = 0;

/**
 * Stats for the home page (hero strip). Team = members.length, CTF events = from getCompetitionsMerged().
 * Pass ctfEventsCount from the server (e.g. (await getCompetitionsMerged()).length).
 */
export function getTeamStatsHome(ctfEventsCount: number): StatItem[] {
  return [
    { value: members.length, label: "Team", suffix: "+" },
    { value: ctfEventsCount, label: "CTF events", suffix: "" },
    { value: DEFAULT_TOOLS_BUILT, label: "Tools built", suffix: "" },
    { value: DEFAULT_WRITEUPS, label: "Write-ups", suffix: "" },
  ];
}

/**
 * Stats for the about page ("Who we are"). Team = members.length, CTF events = from getCompetitionsMerged().
 * Pass ctfEventsCount from the server.
 */
export function getTeamStatsAbout(ctfEventsCount: number): StatItem[] {
  return [
    { value: YEARS_ACTIVE, label: "Years active", suffix: "+" },
    { value: members.length, label: "Team", suffix: "+" },
    { value: ctfEventsCount, label: "CTF events", suffix: "" },
  ];
}

/** Team size range for competition stats (e.g. "4–5" members per CTF). */
export const TEAM_SIZE_RANGE = "4–5";

export interface FeatureCard {
  title: string;
  description: string;
  href: string;
}

/** Home page "Explore" feature cards (Projects, Competitions, Resources). */
export const FEATURE_CARDS: FeatureCard[] = [
  // { title: "Projects", description: "CTF write-ups, security tools, and research.", href: "/projects" },
  {
    title: "Competitions",
    description: "Our track record and upcoming events.",
    href: "/competitions",
  },
  {
    title: "Resources",
    description: "Guides, platforms, and learning paths.",
    href: "/resources",
  },
];

export interface Testimonial {
  quote: string;
  authorInitial: string;
  authorTitle: string;
  authorSubtitle: string;
}

/** Home page testimonial quote. */
export const TESTIMONIAL: Testimonial = {
  quote:
    "EMSIxploit gave me the environment to go from zero to competing in CTFs. The team and the write-ups are what made the difference.",
  authorInitial: "M",
  authorTitle: "Anonymous member",
  authorSubtitle: "Security engineering student",
};

export interface ValueItem {
  title: string;
  description: string;
}

/** About page "What we value" items (icons are mapped in the page). */
export const ABOUT_VALUES: ValueItem[] = [
  { title: "Defence", description: "Build and understand defensive security." },
  { title: "Research", description: "Explore new threats and techniques." },
  { title: "Community", description: "Learn and grow together." },
  { title: "Collaboration", description: "Work with industry and peers." },
  { title: "Ethics", description: "Responsible disclosure and integrity." },
  { title: "Growth", description: "Continuous learning at every level." },
];

/** About page mission statement. */
export const ABOUT_MISSION =
  "To give students hands-on experience in offensive and defensive security through capture-the-flag competitions, tool building, and research, while building a supportive community that values ethics and continuous learning.";

/** About page vision statement. */
export const ABOUT_VISION =
  "To be the go-to club for anyone on campus interested in cybersecurity, from beginners taking their first steps to experienced members contributing write-ups, tools, and research to the wider community.";

/** About page "Our story" paragraph. */
export const ABOUT_OUR_STORY =
  "emsixploit started as a small group of students who wanted to practice real-world security skills beyond the classroom. We ran our first CTF together, wrote our first write-ups, and slowly grew into a full club. Today we run regular meetups, compete in national and international CTFs, and publish tools and research. We're still student-run and open to anyone who wants to learn; no prior experience required.";

/** About page "Trusted by" / affiliated names. */
export const ABOUT_AFFILIATES = ["HackTheBox", "TryHackMe", "PicoCTF", "CTFtime"];

/** Projects page subtitle. */
export const PROJECTS_PAGE_DESCRIPTION =
  "CTF write-ups, security tools, and research from the club.";

/** Resources page "More from the club" blurb and CTA. */
export const RESOURCES_CLUB_BLURB =
  "Our members publish write-ups and tools on the Projects page.";
export const RESOURCES_CTA_LABEL = "Browse write-ups →";
