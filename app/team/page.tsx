import { members } from "@/data/members";
import { TeamPageContent } from "@/components/team/TeamPageContent";

export default function TeamPage() {
  const displayMembers = members;
  return (
    <TeamPageContent
      displayMembers={displayMembers}
      totalCount={members.length}
    />
  );
}
