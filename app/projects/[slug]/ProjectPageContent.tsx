"use client";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MdxContent } from "@/components/sections/MdxContent";

type Props = { source: MDXRemoteSerializeResult };

export function ProjectPageContent({ source }: Props) {
  return <MdxContent source={source} />;
}
