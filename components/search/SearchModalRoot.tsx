"use client";

import { useState, useEffect } from "react";
import { SearchModal } from "./SearchModal";

const OPEN_SEARCH_EVENT = "open-search";

export function SearchModalRoot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_SEARCH_EVENT, handler);
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, handler);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return <SearchModal open={open} onClose={() => setOpen(false)} />;
}

export function openSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
  }
}
