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

async function fetchCyberNews(): Promise<CyberNewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    q: "cybersecurity",
    language: "en",
    sortBy: "publishedAt",
    pageSize: "12",
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
      .filter((a) => a?.url && a?.title)
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
