import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { getNewsBySlug, getNewsSlugs, isNewNewsItem } from "@/data/news";
import AnimatedImageStack from "@/components/ui/AnimatedImageStack";

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen">
      {/* Back + breadcrumb */}
      <header className="mt-6 px-6 py-4 sm:mt-8 sm:px-8 md:px-10" data-animated-section>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link
            href="/news"
            className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            ← News
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[1000px] px-6 pb-24 pt-10 sm:px-8 md:px-10" data-animated-section>
        {/* Two columns: compact image left, content right */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-[minmax(0,340px)_1fr] md:items-start">
          {/* Image: small card, doesn't dominate */}
          {item.images && item.images.length > 0 ? (
            <div className="relative w-full overflow-hidden rounded-xl bg-transparent sm:w-80 sm:shrink-0 md:w-[340px]">
              <div className="relative aspect-[3/4] w-full">
                <AnimatedImageStack images={item.images} />
              </div>
            </div>
          ) : item.image && !item.image.includes("placeholder") ? (
            <div className="relative w-full overflow-hidden rounded-xl bg-[var(--bg-secondary)]/40 sm:w-80 sm:shrink-0 md:w-[340px]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 639px) 100vw, 360px"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] w-full max-w-[340px] rounded-xl bg-[var(--bg-secondary)]/40 sm:w-80 md:w-[340px]" />
          )}

          {/* Details + body in one column */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <time className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(item.date)}
              </time>
              {item.label && (
                <span className="rounded-md bg-[var(--bg-secondary)] border border-white/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  {item.label}
                </span>
              )}
              {isNewNewsItem(item) && (
                <span className="rounded-md bg-[var(--accent)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-black">
                  New
                </span>
              )}
            </div>
            <h1 className="mt-2 text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl md:text-3xl">
              {item.title}
            </h1>
            <p className="mt-3 text-[var(--text-muted)] leading-[1.65]">
              {item.excerpt}
            </p>
            {item.content && (
              <div className="mt-6 space-y-4 text-[var(--text-muted)] text-[15px] leading-[1.7]">
                {item.content.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
            {item.action && (
              <div className="mt-8">
                <a
                  href={item.action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.5)] active:scale-95"
                >
                  {item.action.label}
                </a>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
