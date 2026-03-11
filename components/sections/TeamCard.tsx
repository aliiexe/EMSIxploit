"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Member } from "@/data/members";

const ROLE_LABELS: Record<Member["role"], string> = {
  leadership: "Leadership",
  red_team: "Red Team",
  blue_team: "Blue Team",
  research: "Research",
  alumni: "Alumni",
  staff: "Staff",
};

type TeamCardProps = {
  member: Member;
  delay?: number;
};

export function TeamCard({ member, delay = 0 }: TeamCardProps) {
  const title = member.keyRole ?? ROLE_LABELS[member.role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className="group"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1rem] bg-[var(--glass-bg)]">
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
      </div>
      <div className="mt-4 text-left">
        <h3 className="font-semibold text-[var(--text-primary)]">{member.name}</h3>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          {title}
        </p>
      </div>
    </motion.div>
  );
}
