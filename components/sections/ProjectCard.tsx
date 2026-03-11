"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectMeta } from "@/lib/project-meta";
import { getCategoryLabel, getDifficultyLabel } from "@/lib/project-meta";

const DIFFICULTY_CLASS: Record<ProjectMeta["difficulty"], string> = {
  easy: "text-[var(--accent-dim)] border-[var(--accent-dim)]/40",
  medium: "text-[var(--accent)] border-[var(--accent)]/40",
  hard: "text-[var(--text-muted)] border-[var(--glass-border)]",
  insane: "text-red-400 border-red-500/40",
};

type ProjectCardProps = {
  project: ProjectMeta;
  delay?: number;
};

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const dateStr = project.date
    ? new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block glass-card p-8 transition-[transform,box-shadow] duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(36,233,46,0.2)]"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent)]">
            {getCategoryLabel(project.category)}
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 font-mono text-xs font-medium ${DIFFICULTY_CLASS[project.difficulty]}`}
          >
            {getDifficultyLabel(project.difficulty)}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">{project.title}</h3>
        {project.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-[1.7] text-[var(--text-muted)]">{project.excerpt}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
          <span>{project.authors.join(", ")}</span>
          {dateStr && <span>{dateStr}</span>}
        </div>
        {project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-xs text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
