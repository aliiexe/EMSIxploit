import Link from "next/link";
import Image from "next/image";
import { Trophy, Linkedin, Instagram } from "lucide-react";
import { NationalRankBadge } from "@/components/ctftime/NationalRankBadge";

const QUICK_LINKS = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/competitions", label: "Competitions" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://ctftime.org/team/414843", label: "CTFtime", icon: Trophy },
  { href: "https://www.linkedin.com/in/emsixploit-cyber-security-club-513079371/", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.instagram.com/emsixploit/", label: "Instagram", icon: Instagram },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--glass-border)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <Link href="/" className="inline-block transition-opacity hover:opacity-90" aria-label="emsixploit home">
              <Image src="/logo.png" alt="emsixploit" width={180} height={47} className="h-11 w-auto" />
            </Link>
            <p className="mt-4 leading-[1.7] text-[var(--text-muted)]">
              We secure. We hack. We grow.
            </p>
            <div className="mt-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Social
              </h3>
              <div className="mt-3 flex gap-3">
                {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Quick links
            </h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-10 sm:flex-row sm:flex-wrap">
          <p className="font-mono text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} emsixploit
          </p>
          <div className="flex items-center gap-4 font-mono text-sm text-[var(--text-muted)]">
            <NationalRankBadge variant="footer" className="text-sm" />
            <span>v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
