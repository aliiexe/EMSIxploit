"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { openSearch } from "@/components/search/SearchModalRoot";

export type NationalRankPayload = {
  countryPlace: number;
  countryCode: string;
} | null;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  // { href: "/projects", label: "Projects" },
  { href: "/competitions", label: "Competitions" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const ease = [0.4, 0, 0.2, 1];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`navbar-pill w-full max-w-5xl px-6 sm:px-8 md:px-8 ${scrolled ? "scrolled" : ""}`}
      >
        <nav className="flex h-14 items-center justify-between gap-4 min-[769px]:h-16">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
            aria-label="emsixploit home"
          >
            <Image src="/logo.png" alt="emsixploit" width={200} height={52} className="h-12 w-auto" priority />
          </Link>

          <div className="hidden min-[769px]:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex flex-col items-center gap-1 py-2 text-sm font-medium transition-colors ${
                    isActive ? "nav-link-active" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-2.5 text-[var(--text-muted)] transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text-primary)]"
              aria-label="Open search (Cmd+K)"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/contact"
              className="navbar-join hidden min-[769px]:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold"
            >
              Get in touch
            </Link>
            <button
              type="button"
              className="rounded-full p-2.5 text-[var(--text-primary)] min-[769px]:hidden hamburger-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className={`hamburger-icon ${mobileOpen ? "open" : ""}`} aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    opacity: 1,
                    clipPath: "inset(0 0 0% 0)",
                    transition: { duration: 0.4, ease },
                  },
                  closed: {
                    opacity: 0,
                    clipPath: "inset(0 0 100% 0)",
                    transition: { duration: 0.3, ease },
                  },
                }}
                className="fixed top-0 left-0 z-[101] min-[769px]:hidden"
                style={{
                  width: "100vw",
                  maxWidth: "100%",
                  minWidth: "100vw",
                  background: "rgba(4, 10, 6, 0.96)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  borderBottom: "1px solid rgba(36, 233, 46, 0.2)",
                  borderRadius: "0 0 1.5rem 1.5rem",
                  padding: "1.25rem 1.5rem 2rem",
                }}
              >
            <div className="flex flex-col">
              <div className="flex h-14 items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center transition-opacity hover:opacity-90"
                  aria-label="emsixploit home"
                >
                  <Image src="/logo.png" alt="emsixploit" width={200} height={52} className="h-12 w-auto" />
                </Link>
                <button
                  type="button"
                  className="rounded-full p-2.5 text-[var(--text-primary)]"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col">
                {NAV_LINKS.map(({ href, label }, i) => {
                  const isActive =
                    pathname === href || (href !== "/" && pathname.startsWith(href));
                  const isLast = i === NAV_LINKS.length - 1;
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease, delay: 0.15 + i * 0.05 }}
                      className={isLast ? "" : "border-b border-white/5"}
                    >
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-[0.85rem] text-base font-medium text-[rgba(240,250,244,0.7)]"
                        style={isActive ? { color: "#24E92E" } : undefined}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease, delay: 0.15 + NAV_LINKS.length * 0.05 }}
                className="mt-5"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-[#24E92E] py-[0.85rem] font-semibold text-[#040a06]"
                >
                  Get in touch
                </Link>
              </motion.div>
            </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
