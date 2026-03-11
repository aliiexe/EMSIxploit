import Link from "next/link";
import Image from "next/image";
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

const CONNECT_LINKS = [
  { href: "https://ctftime.org/team/414843", label: "CTFtime" },
  { href: "https://www.linkedin.com/in/emsixploit-cyber-security-club-513079371/", label: "LinkedIn" },
  { href: "https://www.instagram.com/emsixploit/", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-block transition-opacity hover:opacity-90" aria-label="emsixploit home">
              <Image src="/logo.png" alt="emsixploit" width={180} height={47} className="h-11 w-auto" />
            </Link>
            <p className="mt-4 leading-[1.7] text-[var(--text-muted)]">
              We secure. We hack. We grow.
            </p>
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
                    className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Connect
            </h3>
            <ul className="mt-5 space-y-3">
              {CONNECT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {label}
                  </a>
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
