import { getNationalRank } from "@/lib/ctftime";
import { getCompetitionsMerged } from "@/data/competitions";
import { Home } from "@/components/home/Home";

export default async function HomePage() {
  const [nationalRank, merged] = await Promise.all([
    getNationalRank(),
    getCompetitionsMerged(),
  ]);
  return <Home nationalRank={nationalRank} ctfEventsCount={merged.length} />;
}
