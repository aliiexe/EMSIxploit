import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { ProjectMeta } from "./project-meta";
import { sanitizeSlug } from "./sanitize";

export type { ProjectCategory, ProjectDifficulty, ProjectMeta } from "./project-meta";
export { getCategoryLabel, getDifficultyLabel, PROJECT_TAGS } from "./project-meta";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export async function getProjectSlugs(): Promise<string[]> {
  const dir = await fs.readdir(CONTENT_DIR).catch(() => []);
  return dir
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export async function getProjectBySlug(slug: string): Promise<{ meta: ProjectMeta; content: string } | null> {
  const safeSlug = sanitizeSlug(slug);
  if (!safeSlug) return null;
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(CONTENT_DIR, `${safeSlug}${ext}`);
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(raw);
      const meta: ProjectMeta = {
        slug: safeSlug,
        title: data.title ?? safeSlug,
        date: data.date ?? "",
        authors: Array.isArray(data.authors) ? data.authors : [data.author].filter(Boolean),
        category: data.category ?? "ctf",
        tags: Array.isArray(data.tags) ? data.tags : [],
        difficulty: data.difficulty ?? "medium",
        excerpt: data.excerpt ?? "",
        coverImage: data.coverImage,
      };
      return { meta, content };
    } catch {
      continue;
    }
  }
  return null;
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const slugs = await getProjectSlugs();
  const projects: ProjectMeta[] = [];
  for (const slug of slugs) {
    const p = await getProjectBySlug(slug);
    if (p) projects.push(p.meta);
  }
  return projects.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}
