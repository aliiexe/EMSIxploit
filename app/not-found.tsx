import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found — EMSIxploit",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center sm:px-8">
      <p className="font-mono text-sm uppercase tracking-[0.35em] text-[var(--accent)]">404</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-[var(--text-muted)] leading-[1.7]">
        This URL doesn&apos;t exist or was moved. Check the address, use search, or head back home.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-dim)] px-6 py-3 text-sm font-semibold text-[#040a06] transition-opacity hover:opacity-90"
        >
          <Home className="h-4 w-4" />
          Back to home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Contact
        </Link>
      </div>
      <p className="mt-12 text-xs text-[var(--text-muted)]">
        Tip: open the search icon in the nav to find pages quickly.
        <Search className="ml-1 inline h-3.5 w-3.5 align-middle opacity-60" aria-hidden />
      </p>
    </div>
  );
}
