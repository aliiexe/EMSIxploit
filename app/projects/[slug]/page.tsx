import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import { getProjectBySlug, getProjectSlugs, getCategoryLabel, getDifficultyLabel } from "@/lib/projects";
import { sanitizeSlug } from "@/lib/sanitize";
import { ProjectPageContent } from "./ProjectPageContent";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!sanitizeSlug(slug)) return { title: "Invalid Project" };
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.meta.title} — emsixploit`,
    description: project.meta.excerpt || undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const safeSlug = sanitizeSlug(slug);
  if (!safeSlug) notFound();
  const project = await getProjectBySlug(safeSlug);
  if (!project) notFound();

  const { meta, content } = project;
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [[rehypePrettyCode, { theme: "github-dark", keepBackground: true }]],
    },
  });

  const dateStr = meta.date
    ? new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-8">
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-primary)]">
            {getCategoryLabel(meta.category)}
          </span>
          <span className="rounded border border-[var(--border-default)] bg-[var(--color-surface)] px-2 py-0.5 text-xs font-medium text-[var(--color-text-dim)]">
            {getDifficultyLabel(meta.difficulty)}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          {meta.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-dim)]">
          <span>{meta.authors.join(", ")}</span>
          {dateStr && <span>{dateStr}</span>}
        </div>
      </header>

      {/* Challenge metadata table */}
      <div className="mb-10 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--color-surface)]">
        <table className="w-full text-sm">
          <tbody>
            <MetaRow label="Title" value={meta.title} />
            <MetaRow label="Category" value={getCategoryLabel(meta.category)} />
            <MetaRow label="Difficulty" value={getDifficultyLabel(meta.difficulty)} />
            <MetaRow label="Authors" value={meta.authors.join(", ")} />
            {dateStr && <MetaRow label="Date" value={dateStr} />}
            {meta.tags.length > 0 && <MetaRow label="Tags" value={meta.tags.join(", ")} />}
          </tbody>
        </table>
      </div>

      {/* MDX body with syntax-highlighted code (client-rendered to avoid RSC/hooks conflict) */}
      <div className="[&_pre]:rounded-xl [&_pre]:border [&_pre]:border-[var(--border-default)] [&_pre]:bg-[#0d1117] [&_pre]:p-4 [&_pre]:text-sm [&_pre]:overflow-x-auto [&_.shiki]:!bg-transparent">
        <ProjectPageContent source={mdxSource} />
      </div>

      {/* Author cards */}
      <section className="mt-16 border-t border-[var(--border-default)] pt-10">
        <h2 className="mb-6 text-lg font-semibold text-[var(--color-text)]">Authors</h2>
        <div className="flex flex-wrap gap-4">
          {meta.authors.map((author) => (
            <div
              key={author}
              className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--color-surface)] px-4 py-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] font-mono text-sm font-medium text-[var(--color-primary)]">
                {author.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className="font-medium text-[var(--color-text)]">{author}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10">
        <Link
          href="/projects"
          className="text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          ← Back to Projects
        </Link>
      </p>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-[var(--border-default)] last:border-0">
      <td className="py-3 pl-4 font-medium text-[var(--color-text-dim)] w-28">{label}</td>
      <td className="py-3 pr-4 text-[var(--color-text)]">{value}</td>
    </tr>
  );
}
