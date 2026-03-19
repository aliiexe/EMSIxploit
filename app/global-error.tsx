"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#060e0a] px-6 text-center antialiased">
        <p className="font-mono text-xs uppercase tracking-widest text-[#24E92E]">Error</p>
        <h1 className="mt-3 text-2xl font-bold text-[#f0faf4] sm:text-3xl">Something broke</h1>
        <p className="mt-3 max-w-md text-sm text-[#6b8f76]">
          The app hit a critical error. Reload the page or try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-full bg-[#24E92E] px-8 py-3 text-sm font-semibold text-[#040a06] hover:opacity-90"
        >
          Try again
        </button>
        <a
          href="/"
          className="mt-4 text-sm text-[#6b8f76] underline decoration-[#24E92E]/40 underline-offset-4 hover:text-[#24E92E]"
        >
          emsixploit home
        </a>
      </body>
    </html>
  );
}
