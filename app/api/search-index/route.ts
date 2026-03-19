import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";
import { isSafePublicPath } from "@/lib/safe-href";

export async function GET() {
  const index = await buildSearchIndex();
  const safe = index.filter((e) => typeof e.href === "string" && isSafePublicPath(e.href));
  return NextResponse.json(safe, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
    },
  });
}

