import { getAllProjects } from "./projects";
import { members } from "@/data/members";
import { competitions } from "@/data/competitions";
import { resources } from "@/data/resources";
import { PROJECTS_PAGE_DESCRIPTION } from "@/data/team";

export type SearchCategory = "page" | "project" | "member" | "news" | "resource";

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  tags: string[];
  href: string;
  date?: string;
}

export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = [];

  // Static pages
  const pages: { href: string; title: string; description: string }[] = [
    { href: "/", title: "Home", description: "We secure. We hack. We grow." },
    { href: "/about", title: "About", description: "Club story, mission, and values." },
    { href: "/team", title: "Team", description: "The people behind the club." },
    // { href: "/projects", title: "Projects", description: PROJECTS_PAGE_DESCRIPTION },
    { href: "/competitions", title: "Competitions", description: "CTF and security competition results." },
    { href: "/news", title: "News & Events", description: "Meetups, workshops, and announcements." },
    { href: "/resources", title: "Resources", description: "Learning materials and guides." },
    { href: "/contact", title: "Contact", description: "Get in touch or join the club." },
  ];
  for (const p of pages) {
    entries.push({
      id: `page-${p.href}`,
      title: p.title,
      description: p.description,
      category: "page",
      tags: [],
      href: p.href,
    });
  }

  // Members
  for (const m of members) {
    entries.push({
      id: `member-${m.id}`,
      title: m.name,
      description: m.bio,
      category: "member",
      tags: [m.role, ...(m.keyRole ? [m.keyRole] : [])],
      href: "/team",
    });
  }

  // Projects (hidden for now)
  // const projects = await getAllProjects();
  // for (const p of projects) {
  //   entries.push({ id: `project-${p.slug}`, title: p.title, description: p.excerpt, category: "project", tags: p.tags, href: `/projects/${p.slug}`, date: p.date });
  // }

  // Competitions (each event searchable, links to competitions page)
  for (const c of competitions) {
    entries.push({
      id: `competition-${c.id}`,
      title: c.name,
      description: `${c.organizer} · ${c.place ? `Placed ${c.place}` : "Participated"}`,
      category: "page",
      tags: ["CTF", "Competition"],
      href: "/competitions",
      date: c.date,
    });
  }

  // Resources (each resource searchable)
  for (const r of resources) {
    entries.push({
      id: `resource-${r.id}`,
      title: r.title,
      description: r.description,
      category: "resource",
      tags: [r.type, r.level],
      href: "/resources",
    });
  }

  // News placeholder
  entries.push({
    id: "news-placeholder",
    title: "News & Events",
    description: "Workshops, CTF prep, and club announcements.",
    category: "news",
    tags: ["Announcements", "Workshops"],
    href: "/news",
  });

  return entries;
}
