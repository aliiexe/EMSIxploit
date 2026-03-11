import { getCompetitionsMerged } from "@/data/competitions";
import { AboutContent } from "@/components/about/AboutContent";

export default async function AboutPage() {
  const merged = await getCompetitionsMerged();
  return <AboutContent ctfEventsCount={merged.length} />;
}
