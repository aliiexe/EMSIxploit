export type ResourceType = "Guide" | "Video" | "Tool" | "Book" | "Platform" | "Cheatsheet";
export type ResourceLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  level: ResourceLevel;
  description: string;
  url: string;
}

export const RESOURCE_LEVELS: ResourceLevel[] = ["Beginner", "Intermediate", "Advanced"];

export const resources: Resource[] = [
  {
    id: "1",
    title: "HackTheBox",
    type: "Platform",
    level: "Beginner",
    description: "Hands-on labs and challenges for penetration testing.",
    url: "https://www.hackthebox.com",
  },
  {
    id: "2",
    title: "TryHackMe",
    type: "Platform",
    level: "Beginner",
    description: "Structured learning paths and guided rooms.",
    url: "https://tryhackme.com",
  },
  {
    id: "3",
    title: "PicoCTF",
    type: "Platform",
    level: "Beginner",
    description: "Beginner-friendly CTF from CMU.",
    url: "https://picoctf.org",
  },
  {
    id: "4",
    title: "PortSwigger Web Security Academy",
    type: "Guide",
    level: "Intermediate",
    description: "Free web security training and labs.",
    url: "https://portswigger.net/web-security",
  },
  {
    id: "5",
    title: "Pwn.College",
    type: "Platform",
    level: "Intermediate",
    description: "Systems security and exploitation practice.",
    url: "https://pwn.college",
  },
  {
    id: "6",
    title: "OWASP Top 10",
    type: "Cheatsheet",
    level: "Beginner",
    description: "Essential web vulnerability reference.",
    url: "https://owasp.org/www-project-top-ten/",
  },
  {
    id: "7",
    title: "GTFOBins",
    type: "Cheatsheet",
    level: "Intermediate",
    description: "Unix binaries and privilege escalation.",
    url: "https://gtfobins.github.io",
  },
];

export function getResourcesByLevel(level: ResourceLevel): Resource[] {
  return resources.filter((r) => r.level === level);
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return resources.filter((r) => r.type === type);
}
