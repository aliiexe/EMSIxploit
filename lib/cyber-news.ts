/**
 * Cybersecurity news from NewsAPI.org (everything endpoint).
 * Set NEWS_API_KEY in env to enable. Free tier: 100 req/day, see newsapi.org.
 */

export interface CyberNewsArticle {
  title: string;
  url: string;
  description: string | null;
  publishedAt: string;
  urlToImage: string | null;
  sourceName: string;
}

const NEWS_API_BASE = "https://newsapi.org/v2";

/** Keywords that indicate cybersecurity-related content (title or description). */
const CYBER_KEYWORDS = [
  "cybersecurity",
  "cyber security",
  "information security",
  "data breach",
  "ransomware",
  "malware",
  "phishing",
  "hack",
  "vulnerability",
  "exploit",
  "pentest",
  "penetration test",
  "infosec",
  "threat",
  "zero-day",
  "CVE",
];

function isCyberRelated(title: string, description: string | null): boolean {
  const text = `${title} ${description ?? ""}`.toLowerCase();
  return CYBER_KEYWORDS.some((k) => text.includes(k.toLowerCase()));
}

async function fetchCyberNews(): Promise<CyberNewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    q: "cybersecurity OR \"cyber security\" OR \"data breach\" OR ransomware OR malware OR hacking",
    language: "en",
    sortBy: "publishedAt",
    pageSize: "24",
    apiKey,
  });

  try {
    const res = await fetch(`${NEWS_API_BASE}/everything?${params.toString()}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as {
      status: string;
      articles?: Array<{
        title: string;
        url: string;
        description: string | null;
        publishedAt: string;
        urlToImage: string | null;
        source?: { id: string | null; name: string };
      }>;
    };

    if (data.status !== "ok" || !Array.isArray(data.articles)) return [];

    return data.articles
      .filter((a) => a?.url && a?.title && isCyberRelated(a.title, a.description))
      .slice(0, 12)
      .map((a) => ({
        title: a.title,
        url: a.url,
        description: a.description ?? null,
        publishedAt: a.publishedAt,
        urlToImage: a.urlToImage ?? null,
        sourceName: a.source?.name ?? "Source",
      }));
  } catch {
    return [];
  }
}

/** Fetches cybersecurity news for the news page. Returns [] if no API key or on error. */
export async function getCyberNews(): Promise<CyberNewsArticle[]> {
  return fetchCyberNews();
}
