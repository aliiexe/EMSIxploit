"use client";

import { TeamCard } from "@/components/sections/TeamCard";
import { CountUp } from "@/components/ui/CountUp";
import type { Member } from "@/data/members";

type TeamPageContentProps = {
  displayMembers: Member[];
  totalCount: number;
};

export function TeamPageContent({ displayMembers, totalCount }: TeamPageContentProps) {
  return (
    <>
      <section className="px-6 pt-[8rem] pb-8 sm:px-8 sm:pb-10 md:px-10" data-animated-section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl md:text-6xl">
            Our Team
          </h1>
          <p className="mt-4 leading-[1.7] text-[var(--text-muted)]">
            <CountUp end={totalCount} className="font-mono text-[var(--accent)]" />{" "}
            people building skills and community.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pt-4 pb-16 sm:px-8 sm:pt-6 md:px-10" data-animated-section>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4" style={{ gap: "2rem" }}>
          {displayMembers.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 0.04} />
          ))}
        </div>
      </section>
    </>
  );
}
