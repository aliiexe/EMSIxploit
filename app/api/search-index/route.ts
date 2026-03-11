import { buildSearchIndex } from "@/lib/search-index";

export async function GET() {
  const index = await buildSearchIndex();
  return Response.json(index);
}
