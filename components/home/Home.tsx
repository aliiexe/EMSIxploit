"use client";

import Link from "next/link";
import { ArrowRight, Flag, Trophy, BookOpen, Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/ui/CountUp";
import { AuroraBackground } from "@/components/ui/aurora-background";
import type { NationalRankPayload } from "@/components/ui/Navbar";
import { getTeamStatsHome, FEATURE_CARDS, TESTIMONIAL } from "@/data/team";
import { TerminalSection } from "@/components/home/TerminalSection";

const FEATURE_ICONS = [Flag, Trophy, BookOpen] as const;

export function Home({
  nationalRank,
  ctfEventsCount,
}: {
  nationalRank: NationalRankPayload;
  ctfEventsCount: number;
}) {
  const teamStatsHome = getTeamStatsHome(ctfEventsCount);
  const countryLabel = nationalRank?.countryCode === "MA" ? "Morocco" : nationalRank?.countryCode ?? "";

  return (
    <>
      <section className="relative -mt-24 overflow-hidden">
        <AuroraBackground>
          <div className="mx-auto w-full max-w-3xl px-8 text-center sm:px-10 md:px-12 lg:px-16">
            <div className="hero-entrance hero-badge">
              <span className="hero-badge-pill inline-flex items-center gap-2 rounded-full border border-[rgba(36,233,46,0.35)] bg-[rgba(36,233,46,0.12)] px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[#24E92E] backdrop-blur-[8px]">
                <span className="hero-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[#24E92E]" aria-hidden />
                Cybersecurity Club
              </span>
            </div>
            <h1 className="hero-entrance hero-headline mt-5 font-bold leading-[1.06] text-white" style={{ fontSize: "clamp(2.1rem, 4.8vw, 3.6rem)", letterSpacing: "-0.035em" }}>
              The smart way
              <br />
              to learn <span className="text-[#24E92E]">security</span>
              <br />
              and grow as a community.
            </h1>
            <p className="hero-entrance hero-subtitle mt-5 text-[0.98rem] text-[rgba(240,250,244,0.48)]">
              Where you become a security expert.
            </p>
            <div className="hero-entrance hero-buttons mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="hero-btn-primary group inline-flex items-center gap-2 rounded-full bg-[#24E92E] px-8 py-3 text-base font-semibold text-[#040a06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(36,233,46,0.4)]">
                Join the club
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/about" className="hero-btn-secondary inline-flex items-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-8 py-3 text-base font-medium text-white backdrop-blur-[10px] transition-all duration-300 hover:border-[rgba(36,233,46,0.4)]">
                About us
              </Link>
            </div>
          </div>
        </AuroraBackground>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-[#040a06]/0 via-[#040a06]/60 to-[var(--bg-primary)] sm:h-64"
          aria-hidden
        />
      </section>

      <section className="pt-20 pb-[8rem] sm:pt-28 md:pt-32" data-animated-section>
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 md:px-10">
          <div className="glass-card grid grid-cols-2 gap-8 sm:grid-cols-4 sm:divide-x sm:divide-[var(--glass-border)] py-8 sm:py-10">
            {teamStatsHome.map((stat) => (
              <div key={stat.label} className="text-center first:sm:pl-0 last:sm:pr-0 sm:px-8">
                <p className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={1.8} />
                </p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
          {nationalRank && (
            <div className="mt-6 flex justify-center">
              <a
                href="https://ctftime.org/team/414843"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2.5 font-mono text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
              >
                <span aria-hidden className="text-2xl leading-none" role="img">🇲🇦</span>
                <strong className="text-[var(--accent)]">#{nationalRank.countryPlace}</strong>
                {" "}in {countryLabel}
                {" "}
                <span className="text-[var(--text-muted)]">· CTFtime</span>
              </a>
            </div>
          )}
        </div>
      </section>

      <TerminalSection />

      <section className="mx-auto max-w-[1200px] px-6 py-[8rem] sm:px-8 md:px-10" data-animated-section>
        <h2 className="mb-16 text-center text-3xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
          Explore
        </h2>
        <div className="grid gap-8 sm:grid-cols-3" style={{ gap: "2rem" }}>
          {FEATURE_CARDS.map((card, i) => {
            const Icon = FEATURE_ICONS[i] ?? Flag;
            return (
              <Link key={card.href} href={card.href} className="block">
                <GlassCard variant="feature" index={i} className="h-full">
                  <Icon className="h-10 w-10 text-[var(--accent)]" />
                  <h3 className="mt-6 text-xl font-semibold text-[var(--text-primary)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 leading-[1.7] text-[var(--text-muted)]">
                    {card.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                    View
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-24 sm:px-8 md:px-10" data-animated-section>
        <div className="glass-card p-8 sm:p-10">
          <Quote className="mx-auto mb-4 h-10 w-10 text-[var(--accent)]/70" />
          <p className="text-lg italic leading-[1.7] text-[var(--text-primary)] sm:text-xl">
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] font-mono text-lg font-semibold text-[var(--accent)]">
              {TESTIMONIAL.authorInitial}
            </div>
            <div className="text-left">
              <p className="font-semibold text-[var(--text-primary)]">{TESTIMONIAL.authorTitle}</p>
              <p className="font-mono text-sm text-[var(--text-muted)]">{TESTIMONIAL.authorSubtitle}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
