import Link from "next/link";
import Image from "next/image";
import { getNewsItems, isNewNewsItem } from "@/data/news";
import { getCyberNews } from "@/lib/cyber-news";
import { Calendar, ExternalLink } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const [items, cyberArticles] = await Promise.all([getNewsItems(), getCyberNews()]);

  return (
    <>
      <section className="px-6 py-[8rem] sm:px-8 md:px-10" data-animated-section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            Latest from EMSIxploit
          </h1>
          <p className="mt-6 text-lg leading-[1.7] text-[var(--text-muted)]">
            Meetups, workshops, CTF prep, and announcements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-32 sm:px-8 md:px-10" data-animated-section>
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4" style={{ gap: "2rem" }}>
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`/news/${item.slug}`} className="group block">
                <article className="overflow-hidden rounded-[1rem] bg-[var(--bg-secondary)]/30 transition-all duration-500 ease-out group-hover:bg-[var(--bg-secondary)]/50">
                  <div className="relative w-full overflow-hidden">
                    {isNewNewsItem(item) && (
                      <span className="absolute right-2 top-2 z-10 rounded-md bg-[var(--accent)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-black">
                        New
                      </span>
                    )}
                    {item.image && !item.image.includes("placeholder") ? (
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[1rem]">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                          aria-hidden
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[3/4] w-full items-center justify-center rounded-t-[1rem] bg-[var(--bg-primary)] text-[var(--text-muted)]">
                        <span className="text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-left">
                    <time className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      <Calendar className="h-3 w-3" />
                      {formatDate(item.date)}
                    </time>
                    <h2 className="mt-2 line-clamp-2 text-sm font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs leading-[1.5] text-[var(--text-muted)] line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
        {items.length === 0 && (
          <div className="rounded-2xl bg-[var(--bg-secondary)]/50 px-8 py-16 text-center">
            <p className="leading-[1.7] text-[var(--text-muted)]">
              No news yet. Add entries in <code className="rounded bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-sm text-[var(--accent)]">data/news.ts</code> and
              put media in <code className="rounded bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-sm text-[var(--accent)]">public/news/</code>.
            </p>
          </div>
        )}
      </section>

      {cyberArticles.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 pb-32 sm:px-8 md:px-10" data-animated-section>
          <h2 className="mb-6 text-2xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-3xl">
            Cybersecurity news
          </h2>
          <p className="mb-8 text-[var(--text-muted)] leading-[1.6]">
            Latest from the industry — breaches, threats, and defense.
          </p>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4" style={{ gap: "2rem" }}>
            {cyberArticles.map((article, i) => (
              <li key={`${article.url}-${i}`}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <article className="overflow-hidden rounded-[1rem] bg-[var(--bg-secondary)]/30 transition-all duration-500 ease-out group-hover:bg-[var(--bg-secondary)]/50">
                    <div className="relative w-full overflow-hidden">
                      {article.urlToImage ? (
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[1rem]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={article.urlToImage}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                            aria-hidden
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[3/4] w-full items-center justify-center rounded-t-[1rem] bg-[var(--bg-primary)] text-[var(--text-muted)]">
                          <ExternalLink className="h-8 w-8 opacity-50" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-left">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        {article.sourceName}
                      </p>
                      <time className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </time>
                      <h3 className="mt-2 line-clamp-2 text-sm font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="mt-1 text-xs leading-[1.5] text-[var(--text-muted)] line-clamp-2">
                          {article.description}
                        </p>
                      )}
                    </div>
                  </article>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
