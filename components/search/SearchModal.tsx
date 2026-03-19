"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  FileText,
  Users,
  Flag,
  Newspaper,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import type { SearchEntry, SearchCategory } from "@/lib/search-index";
import { sanitizeSearchQuery } from "@/lib/sanitize";
import { isSafeClientNavHref } from "@/lib/safe-href";

const CATEGORY_ICON: Record<SearchCategory, React.ComponentType<{ className?: string }>> = {
  page: FileText,
  member: Users,
  project: Flag,
  news: Newspaper,
  resource: BookOpen,
};

const CATEGORY_LABEL: Record<SearchCategory, string> = {
  page: "Pages",
  member: "Team",
  project: "Projects",
  news: "News",
  resource: "Resources",
};

type Props = { open: boolean; onClose: () => void };

export function SearchModal({ open, onClose }: Props) {
  const router = useRouter();
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/search-index")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex([]));
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
      }),
    [index]
  );

  const sanitizedQuery = useMemo(() => sanitizeSearchQuery(query), [query]);

  const results = useMemo(() => {
    if (!sanitizedQuery) return index;
    return fuse.search(sanitizedQuery).map((r) => r.item);
  }, [index, sanitizedQuery, fuse]);

  const grouped = useMemo(() => {
    const groups: Record<SearchCategory, SearchEntry[]> = {
      page: [],
      project: [],
      member: [],
      news: [],
      resource: [],
    };
    for (const e of results) {
      groups[e.category].push(e);
    }
    return groups;
  }, [results]);

  const categoryOrder: SearchCategory[] = ["page", "member", "project", "news", "resource"];
  const flatResults = useMemo(
    () => categoryOrder.flatMap((cat) => grouped[cat]),
    [grouped]
  );
  const selectedId = flatResults[selected]?.id ?? null;

  const go = useCallback(
    (entry: SearchEntry) => {
      onClose();
      setQuery("");
      setSelected(0);
      if (!isSafeClientNavHref(entry.href)) return;
      router.push(entry.href);
    },
    [onClose, router]
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelected(0);
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setSelected((s) => Math.min(s, Math.max(0, flatResults.length - 1)));
  }, [flatResults.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) onClose();
        else inputRef.current?.focus();
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => (s < flatResults.length - 1 ? s + 1 : s));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => (s > 0 ? s - 1 : s));
        return;
      }
      if (e.key === "Enter" && flatResults[selected]) {
        e.preventDefault();
        go(flatResults[selected]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, flatResults, selected, onClose, go]);

  useEffect(() => {
    if (selectedId && listRef.current) {
      const el = listRef.current.querySelector(`[data-id="${selectedId}"]`);
      el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedId]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            aria-hidden
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-[20%] z-[101] w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-2xl backdrop-blur-[20px]">
              <div className="flex items-center gap-3 border-b border-[var(--glass-border)] px-5 py-3.5">
                <SearchIcon className="h-5 w-5 shrink-0 text-[var(--color-text-dim)]" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(sanitizeSearchQuery(e.target.value));
                    setSelected(0);
                  }}
                  placeholder="Search pages, team, projects..."
                  className="flex-1 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none"
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-controls="search-results"
                  aria-activedescendant={selectedId ?? undefined}
                />
                <kbd className="hidden rounded-[var(--radius-md)] border border-[var(--glass-border)] px-2 py-0.5 text-xs text-[var(--color-text-dim)] sm:inline">
                  ESC
                </kbd>
              </div>

              <div
                id="search-results"
                ref={listRef}
                className="max-h-[60vh] overflow-y-auto py-2"
                role="listbox"
              >
                {flatResults.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-[var(--color-text-dim)]">
                    No results found.
                  </p>
                ) : (
                  Object.entries(grouped).map(([cat, entries]) => {
                    if (entries.length === 0) return null;
                    const Icon = CATEGORY_ICON[cat as SearchCategory];
                    return (
                      <div key={cat} className="mb-4">
                        <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                          {CATEGORY_LABEL[cat as SearchCategory]}
                        </p>
                        <ul className="space-y-0.5">
                          {entries.map((entry) => {
                            const i = flatResults.findIndex((r) => r.id === entry.id);
                            const isSelected = i === selected;
                            return (
                              <li key={entry.id} role="option" aria-selected={isSelected}>
                                <button
                                  type="button"
                                  data-id={entry.id}
                                  onClick={() => go(entry)}
                                  onMouseEnter={() => setSelected(i)}
                                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                    isSelected
                                      ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                      : "text-[var(--text-primary)] hover:bg-[var(--glass-bg)]"
                                  }`}
                                >
                                  <Icon className="h-4 w-4 shrink-0 text-[var(--color-text-dim)]" />
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium">{entry.title}</p>
                                    {entry.description && (
                                      <p className="truncate text-xs text-[var(--color-text-dim)]">
                                        {entry.description}
                                      </p>
                                    )}
                                  </div>
                                  <ArrowRight className="h-4 w-4 shrink-0 opacity-50" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
