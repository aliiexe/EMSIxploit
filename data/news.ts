/**
 * News feed items. Media files go in public/news/ (e.g. public/news/workshop-march.jpg).
 * Reference them as /news/filename in the image field.
 */

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** Path under public/, e.g. /news/workshop-march.jpg */
  image: string;
  /** Optional body for the detail page (plain text or HTML). */
  /** Optional label for the card, e.g. "Sponsorship" or "Partnership" */
  label?: string;
  /** Optional array of image paths for the detail page gallery */
  images?: string[];
  /** Optional body for the detail page (plain text or HTML). */
  content?: string;
  /** Optional call-to-action link at the bottom of the details page */
  action?: {
    url: string;
    label: string;
  };
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    slug: "ceromonie-ouverture-october-2025",
    title: "Cérémonie d'ouverture",
    date: "2025-10-31",
    excerpt: "Save the date — Opening ceremony for EMSIxploit Cybersecurity Club at EMSI Les Orangers.",
    image: "/news/post1.png",
    content:
      "Join us for the opening ceremony on 31 October at 02:30 PM in the Salle de Conférence, EMSI Les Orangers. EMSIxploit and École Marocaine des Sciences de l'Ingénieur welcome you to kick off the year.",
  },
  {
    id: "2",
    slug: "bootcamp-may-2026",
    title: "CyberZ Boot Camp",
    date: "2026-05-09",
    excerpt: "Join us for an exclusive 2-day Boot Camp in collaboration with CyberZ covering OSINT, Web, networking, and essential tools.",
    image: "/news/bootcamp/cover.png",
    label: "Bootcamp",
    images: ["/news/bootcamp/Post1.png", "/news/bootcamp/Post2.png", "/news/bootcamp/Post3.png", "/news/bootcamp/Post4.png"],
    content:
      "EMSIxploit is partnering with CyberZ to deliver a comprehensive 2-day Boot Camp on May 9th and 10th, 2026.\n\nOur expert speakers will dive deep into essential cybersecurity domains:\n- Networking by Oussama AMYAY\n- Web by Saad RMAIDA\n- Tools & Methods by Mustapha BOUTOUB\n- OSINT by Aymane BERHILI\n\nGet ready to elevate your skills with hands-on sessions and expert guidance from the CyberZ team. Mark your calendars and prepare to learn!",
    action: {
      url: "https://discord.gg/YrTj9uYP",
      label: "Join the Discord Server",
    },
  },
];

/** All items, newest first. */
export function getNewsItems(): NewsItem[] {
  return [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
}

/** Single item by slug, or null. */
export function getNewsBySlug(slug: string): NewsItem | null {
  const safe = slug.replace(/[^a-z0-9-]/gi, "").toLowerCase();
  return newsItems.find((n) => n.slug.toLowerCase() === safe) ?? null;
}

/** Slugs for static generation. */
export function getNewsSlugs(): string[] {
  return newsItems.map((n) => n.slug);
}

/** True if the event date is within 5 days of today (before or after). */
export function isNewNewsItem(item: NewsItem): boolean {
  const eventDate = new Date(item.date);
  const today = new Date();
  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffMs = Math.abs(today.getTime() - eventDate.getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays <= 5;
}
