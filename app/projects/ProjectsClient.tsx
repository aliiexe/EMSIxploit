"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { ProjectMeta } from "@/lib/project-meta";
import { PROJECT_TAGS } from "@/lib/project-meta";
import { ProjectCard } from "@/components/sections/ProjectCard";

const CATEGORIES: { value: ProjectMeta["category"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ctf", label: "CTF Write-ups" },
  { value: "tools", label: "Tools" },
  { value: "research", label: "Research Papers" },
  { value: "poc", label: "Proof of Concepts" },
];

type Props = { projects: ProjectMeta[] };

export function ProjectsClient({ projects }: Props) {
  const [category, setCategory] = useState<ProjectMeta["category"] | "all">("all");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = projects;
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (selectedTags.size > 0) {
      list = list.filter((p) => p.tags.some((t) => selectedTags.has(t)));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.authors.some((a) => a.toLowerCase().includes(q))
      );
    }
    return list;
  }, [projects, category, selectedTags, search]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-dim)]" />
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[0.75rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] py-3 pl-11 pr-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] backdrop-blur-[20px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:shadow-[0_0_0_2px_rgba(36,233,46,0.5)]"
            aria-label="Search projects"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setCategory(c.value)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-[0.4s] ${
              category === c.value
                ? "border-[var(--accent-dim)] bg-[var(--accent-dim)]/10 text-[var(--accent)]"
                : "border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {PROJECT_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`rounded-full border px-3.5 py-2 font-mono text-xs font-medium transition-colors duration-[0.4s] ${
              selectedTags.has(tag)
                ? "border-[var(--accent-dim)] bg-[var(--accent-dim)]/10 text-[var(--accent)]"
                : "border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={i * 0.05} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-[var(--color-text-dim)]">No projects match your filters.</p>
      )}
    </>
  );
}
