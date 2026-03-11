"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { Member } from "@/data/members";

const ROLE_STYLES: Record<Member["role"], string> = {
  leadership: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/30",
  red_team: "bg-red-500/20 text-red-400 border-red-500/30",
  blue_team: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  research: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  alumni: "bg-[var(--color-text-dim)]/20 text-[var(--color-text-dim)] border-[var(--color-text-dim)]/30",
  staff: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/30",
};

const ROLE_LABELS: Record<Member["role"], string> = {
  leadership: "Leadership",
  red_team: "Red Team",
  blue_team: "Blue Team",
  research: "Research",
  alumni: "Alumni",
  staff: "Staff",
};

type MemberCardProps = {
  member: Member;
  delay?: number;
};

export function MemberCard({ member, delay = 0 }: MemberCardProps) {
  const links = member.links ? Object.entries(member.links).filter(([, url]) => url) : [];
  const iconMap = { github: Github, linkedin: Linkedin, twitter: Twitter, website: Globe };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className="group rounded-xl border border-[var(--border-default)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--border-strong)]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--color-surface-elevated)] font-mono text-lg font-semibold text-[var(--color-primary)]">
          {member.avatar ? (
            <img src={member.avatar} alt="" className="h-full w-full rounded-full object-cover" />
          ) : (
            member.name.split(" ").map((n) => n[0]).join("")
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[var(--color-text)]">{member.name}</h3>
          <span
            className={`mt-1 inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${ROLE_STYLES[member.role]}`}
          >
            {member.keyRole ?? ROLE_LABELS[member.role]}
          </span>
          <p className="mt-2 text-sm text-[var(--color-text-dim)] line-clamp-2">{member.bio}</p>
          {member.achievement && (
            <p className="mt-2 text-xs text-[var(--color-primary-muted)]">{member.achievement}</p>
          )}
          {links.length > 0 && (
            <div className="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              {links.map(([key, url]) => {
                const Icon = iconMap[key as keyof typeof iconMap];
                if (!Icon || !url) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-1.5 text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-primary)]"
                    aria-label={`${member.name} — ${key}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
