"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

const components = {
  // Customize headings, links, etc. if needed
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="text-[var(--color-primary)] underline hover:opacity-90" target="_blank" rel="noopener noreferrer" />
  ),
};

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:text-[var(--color-text)] prose-p:text-[var(--color-text-dim)] prose-strong:text-[var(--color-text)] prose-ul:text-[var(--color-text-dim)] prose-li:marker:text-[var(--color-primary)]">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
