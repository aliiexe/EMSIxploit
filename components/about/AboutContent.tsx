"use client";

import {
  Shield,
  Search,
  Users,
  Handshake,
  Scale,
  TrendingUp,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/ui/CountUp";
import {
  getTeamStatsAbout,
  ABOUT_VALUES,
  ABOUT_MISSION,
  ABOUT_VISION,
  ABOUT_OUR_STORY,
  ABOUT_AFFILIATES,
} from "@/data/team";
import { TeamMediaSlider } from "@/components/team/TeamMediaSlider";

const VALUES_ICONS = [Shield, Search, Users, Handshake, Scale, TrendingUp] as const;

export function AboutContent({ ctfEventsCount }: { ctfEventsCount: number }) {
  const teamStatsAbout = getTeamStatsAbout(ctfEventsCount);

  return (
    <>
      <section className="px-6 py-[8rem] sm:px-8 md:px-10" data-animated-section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl md:text-6xl">
            We Secure. We Hack.{" "}
            <span className="text-[var(--accent)]">We Grow.</span>
          </h1>
          <p className="mt-6 text-lg leading-[1.7] text-[var(--text-muted)]">
            A student-run cybersecurity club building skills through CTFs, research, and community.
          </p>
        </div>
      </section>

      <TeamMediaSlider />

      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-20 sm:px-8 md:px-10" data-animated-section>
        <div className="grid gap-8 md:grid-cols-2" style={{ gap: "2rem" }}>
          <GlassCard variant="lg" index={0}>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Mission</h2>
            <p className="mt-3 leading-[1.7] text-[var(--text-muted)]">
              {ABOUT_MISSION}
            </p>
          </GlassCard>
          <GlassCard variant="lg" index={1}>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Vision</h2>
            <p className="mt-3 leading-[1.7] text-[var(--text-muted)]">
              {ABOUT_VISION}
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 sm:px-8 md:px-10" data-animated-section>
        <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">Our story</h2>
        <p className="mt-4 leading-[1.7] text-[var(--text-muted)]">
          {ABOUT_OUR_STORY}
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 sm:px-8 md:px-10" data-animated-section>
        <h2 className="mb-10 text-2xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">What we value</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "2rem" }}>
          {ABOUT_VALUES.map((item, i) => {
            const Icon = VALUES_ICONS[i] ?? Shield;
            return (
              <GlassCard key={item.title} variant="md" index={i}>
                <Icon className="h-8 w-8 text-[var(--accent)]" />
                <h3 className="mt-3 font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-1 text-sm leading-[1.7] text-[var(--text-muted)]">{item.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[var(--glass-border)] py-[8rem]" data-animated-section>
        <div className="mx-auto max-w-4xl px-6 sm:px-8 md:px-10">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
            Who we are
          </h2>
          <div className="grid grid-cols-3 gap-8 text-center">
            {teamStatsAbout.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={1.5} />
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 md:px-10" data-animated-section>
        <p className="text-center text-sm uppercase tracking-wider text-[var(--text-muted)]">
          Communities & events we&apos;ve joined
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
          {ABOUT_AFFILIATES.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-[var(--text-muted)]"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
