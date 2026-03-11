"use client";

import Link from "next/link";

export default function CompetitionsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 md:px-10" data-animated-section>
      <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          We couldn&apos;t load the competitions data. You can try again or go back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[var(--accent-dim)] px-5 py-2.5 text-sm font-semibold text-[#040a06] transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-[var(--glass-border)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-opacity hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
