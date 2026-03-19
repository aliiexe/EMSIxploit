"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center sm:px-8">
      <div className="rounded-2xl border border-red-500/25 bg-red-500/5 p-6 sm:p-8">
        <AlertTriangle className="mx-auto h-10 w-10 text-red-400/90" aria-hidden />
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--text-muted)]">
          An unexpected error occurred. Try again, or return home if the problem persists.
        </p>
        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="mt-4 max-h-32 overflow-auto rounded-lg bg-black/40 p-3 text-left font-mono text-xs text-red-300/90">
            {error.message}
          </pre>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-dim)] px-6 py-3 text-sm font-semibold text-[#040a06] transition-opacity hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/40"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
