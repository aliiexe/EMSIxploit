import { members } from "@/data/members";
import { TeamPageContent } from "@/components/team/TeamPageContent";

export default function TeamPage() {
  return (
    <TeamPageContent displayMembers={members} totalCount={members.length} />
  );
}
