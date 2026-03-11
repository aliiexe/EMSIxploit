"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, BookOpen, Video, Wrench, BookMarked, Layout, FileText } from "lucide-react";
import {
  resources,
  RESOURCE_LEVELS,
  type Resource,
  type ResourceLevel,
} from "@/data/resources";
import { RESOURCES_CLUB_BLURB, RESOURCES_CTA_LABEL } from "@/data/team";
import { GlassCard } from "@/components/ui/GlassCard";

const TYPE_ICON: Record<Resource["type"], React.ComponentType<{ className?: string }>> = {
  Guide: BookOpen,
  Video: Video,
  Tool: Wrench,
  Book: BookMarked,
  Platform: Layout,
  Cheatsheet: FileText,
};

export default function ResourcesPage() {
  const [level, setLevel] = useState<ResourceLevel | "All">("All");

  const filtered =
    level === "All"
      ? resources
      : resources.filter((r) => r.level === level);

  return (
    <>
      <section className="px-6 py-[8rem] sm:px-8 md:px-10" data-animated-section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            Level Up Your Skills
          </h1>
          <p className="mt-6 text-lg leading-[1.7] text-[var(--text-muted)]">
            Curated guides, platforms, and learning paths.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-12 sm:px-8 md:px-10" data-animated-section>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setLevel("All")}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-[0.4s] ${
              level === "All"
                ? "border-[var(--accent-dim)] bg-[var(--accent-dim)]/10 text-[var(--accent)]"
                : "border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            All
          </button>
          {RESOURCE_LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-[0.4s] ${
                level === l
                  ? "border-[var(--accent-dim)] bg-[var(--accent-dim)]/10 text-[var(--accent)]"
                  : "border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 sm:px-8 md:px-10" data-animated-section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "2rem" }}>
          {filtered.map((r, i) => {
            const Icon = TYPE_ICON[r.type];
            return (
              <GlassCard key={r.id} variant="md" index={i}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start justify-between gap-2">
                    <Icon className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    {r.title}
                  </h3>
                  <span className="mt-1 inline-block font-mono text-xs text-[var(--text-muted)]">
                    {r.type} · {r.level}
                  </span>
                  <p className="mt-2 line-clamp-2 text-sm leading-[1.7] text-[var(--text-muted)]">
                    {r.description}
                  </p>
                </a>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 sm:px-8 md:px-10" data-animated-section>
        <div className="glass-card p-6">
          <h2 className="text-lg font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
            More from the club
          </h2>
          <p className="mt-2 text-sm leading-[1.7] text-[var(--text-muted)]">
            {RESOURCES_CLUB_BLURB}
          </p>
          <Link
            href="/projects"
            className="mt-4 inline-flex rounded-full bg-[var(--accent-dim)] px-5 py-2.5 text-sm font-semibold text-[#040a06] transition-opacity duration-[0.4s] hover:opacity-90"
          >
            {RESOURCES_CTA_LABEL}
          </Link>
        </div>
      </section>
    </>
  );
}
