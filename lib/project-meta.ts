/** Client-safe types and constants for projects. Do not import fs/path here. */

export type ProjectCategory = "ctf" | "tools" | "research" | "poc";
export type ProjectDifficulty = "easy" | "medium" | "hard" | "insane";

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  authors: string[];
  category: ProjectCategory;
  tags: string[];
  difficulty: ProjectDifficulty;
  excerpt: string;
  coverImage?: string;
}

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  ctf: "CTF Write-up",
  tools: "Tool",
  research: "Research Paper",
  poc: "Proof of Concept",
};
const DIFFICULTY_LABELS: Record<ProjectDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  insane: "Insane",
};

export function getCategoryLabel(cat: ProjectCategory): string {
  return CATEGORY_LABELS[cat];
}

export function getDifficultyLabel(d: ProjectDifficulty): string {
  return DIFFICULTY_LABELS[d];
}

export const PROJECT_TAGS = [
  "Web",
  "Forensics",
  "Pwn",
  "Crypto",
  "Reverse",
  "OSINT",
  "Malware",
  "Network",
] as const;
