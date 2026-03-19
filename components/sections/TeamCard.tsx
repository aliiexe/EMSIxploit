"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { Member } from "@/data/members";

const ROLE_LABELS: Record<Member["role"], string> = {
  leadership: "Leadership",
  red_team: "Red Team",
  blue_team: "Blue Team",
  research: "Research",
  alumni: "Alumni",
  staff: "Staff",
};

const linkIconClass =
  "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[var(--accent)] hover:text-black";

type TeamCardProps = {
  member: Member;
  delay?: number;
};

export function TeamCard({ member, delay = 0 }: TeamCardProps) {
  const title = member.keyRole ?? ROLE_LABELS[member.role];
  const links = member.links;
  const hasLinks =
    links &&
    (links.github || links.linkedin || links.twitter || links.website);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className="group"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1rem] bg-[var(--glass-bg)]">
        {member.elite && (
          <span
            className="member-elite-badge absolute left-2 top-2 z-10 rounded-md bg-gradient-to-r from-amber-500/90 to-amber-600/90 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-black"
            style={
              { "--member-badge-shine-delay": `${(parseInt(member.id, 10) || 0) * 0.25}s` } as CSSProperties
            }
          >
            <span className="member-elite-badge-label">Elite</span>
          </span>
        )}
        {member.avatar ? (
          member.avatar.startsWith("/") ? (
            <Image
              src={member.avatar}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-[filter] duration-300 group-hover:grayscale-0 grayscale"
            />
          ) : (
            <img
              src={member.avatar}
              alt=""
              className="h-full w-full object-cover transition-[filter] duration-300 group-hover:grayscale-0 grayscale"
            />
          )
        ) : (
          <div
            className="flex h-full w-full items-center justify-center font-mono text-3xl font-semibold text-[var(--text-muted)] transition-colors duration-300 group-hover:bg-[var(--accent)]/20 group-hover:text-[var(--accent)]"
            aria-hidden
          >
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}
        {/* Black gradient overlay on hover */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        {/* Links on hover */}
        {hasLinks && (
          <div className="absolute inset-0 flex items-end justify-center gap-2 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={linkIconClass}
                aria-label={`${member.name} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {links.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={linkIconClass}
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {links.twitter && (
              <a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={linkIconClass}
                aria-label={`${member.name} on X (Twitter)`}
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {links.website && (
              <a
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                className={linkIconClass}
                aria-label={`${member.name} website`}
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 text-left">
        <h3 className="font-semibold text-[var(--text-primary)]">{member.name}</h3>
        <p
          className={`mt-0.5 text-xs font-medium uppercase tracking-wider ${
            member.elite ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
          }`}
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
}
