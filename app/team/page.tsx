import { members, type Member } from "@/data/members";
import { TeamPageContent } from "@/components/team/TeamPageContent";

const KEY_ROLE_ORDER: Member["keyRole"][] = ["President", "VP", "Lead Researcher", "CTF Captain", "Technical Staff"];

function getDisplayMembers(): Member[] {
  const keyRoleMembers: Member[] = [];
  for (const title of KEY_ROLE_ORDER) {
    const member = members.find((m) => m.keyRole === title);
    if (member) keyRoleMembers.push(member);
  }
  const keyRoleIds = new Set(keyRoleMembers.map((m) => m.id));
  const rest = members.filter((m) => !keyRoleIds.has(m.id));
  return [...keyRoleMembers, ...rest];
}

export default function TeamPage() {
  const displayMembers = getDisplayMembers();
  return (
    <TeamPageContent
      displayMembers={displayMembers}
      totalCount={members.length}
    />
  );
}
