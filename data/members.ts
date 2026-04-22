/**
 * Team members. To add a photo:
 * 1. Put the image in public/team/ (e.g. public/team/alex-chen.jpg)
 * 2. Set avatar to "/team/alex-chen.jpg" for that member
 * Use lowercase, hyphenated filenames: firstname-lastname.jpg
 */

export type MemberRole =
  | "leadership"
  | "red_team"
  | "blue_team"
  | "research"
  | "alumni"
  | "staff";

export type KeyRoleTitle =
  | "President"
  | "Vice President"
  | "VP"
  | "Lead Researcher"
  | "CTF Captain"
  | "Head of CTF"
  | "Technical Staff"
  | "Human Resources"
  | "Head of Organization"
  | "Head of Communication"
  | "Treasurer"
  | null;

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  keyRole: KeyRoleTitle;
  bio: string;
  /** Path to photo: put images in public/team/ and use "/team/filename.jpg" */
  avatar?: string;
  achievement?: string;
  /** Distinguished member — shows Elite badge on team card */
  elite?: boolean;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export const MEMBER_ROLES: { value: MemberRole; label: string }[] = [
  { value: "leadership", label: "Leadership" },
  { value: "red_team", label: "Red Team" },
  { value: "blue_team", label: "Blue Team" },
  { value: "research", label: "Research" },
  { value: "alumni", label: "Alumni" },
  { value: "staff", label: "Staff" },
];

export const members: Member[] = [
  {
    id: "1",
    name: "Moncef Diraa",
    role: "leadership",
    keyRole: "President",
    bio: "Security enthusiast. Focus on offensive security and club growth.",
    avatar: "/team/moncefdiraa.jpeg",
    achievement: "1st place — University CTF 2024",
    links: { github: "https://gitlab.com/Diraa-moncef/my-security-project", linkedin: "https://www.linkedin.com/in/moncef-diraa-5137562a0/" },
  },
  {
    id: "2",
    name: "Younes Tarik",
    role: "leadership",
    keyRole: "Vice President",
    bio: "Building bridges between industry and students.",
    avatar: "/team/younestarik.png",
    achievement: "Speaker — BSides 2024",
    links: { github: "https://github.com/YOUNESTARIK", linkedin: "https://www.linkedin.com/in/younes-tarik-242594321/" },
  },
  {
    id: "3",
    name: "Youssef Dirgham",
    role: "staff",
    keyRole: "Head of CTF",
    bio: "Technical lead for all club CTF operations — strategy, training, and competition prep across EMSIxploit.",
    avatar: "/team/youssefdirgham.png",
    achievement: "The one and only — head of CTF for the whole club",
    elite: true,
    links: { github: "https://github.com/sultan56", linkedin: "https://www.linkedin.com/in/youssef-dirgham-21274aab/" },
  },
  {
    id: "4",
    name: "Ali Bourak",
    role: "staff",
    keyRole: "Technical Staff",
    bio: "Exploit dev and web security. Loves pwn and crypto.",
    avatar: "/team/alibourak.png",
    achievement: "Top 10 — DEF CON CTF qualifiers",
    links: { github: "https://github.com/aliiexe", linkedin: "https://linkedin.com/in/ali-bourak", website: "https://alibourak.vercel.app" },
  },
  {
    id: "5",
    name: "Chouaib Machhour",
    role: "staff",
    keyRole: "Human Resources",
    bio: "Web and binary exploitation. HTB Pro.",
    avatar: "/team/chouaibmachhour.png",
    achievement: "50+ HTB machines",
    links: {linkedin: "https://www.linkedin.com/in/chouaib-machhour-916319329/" },
  },
  // {
  //   id: "6",
  //   name: "Youssef Oudriss",
  //   role: "staff",
  //   keyRole: "Head of Organization",
  //   bio: "DFIR and SOC operations. Splunk and SIEM.",
  //   avatar: "/team/youssefoudriss.png",
  //   links: {linkedin: "https://www.linkedin.com/in/yousef-oudriss-a287a0337/" },
  // },
  {
    id: "7",
    name: "Aya Kathiri",
    role: "staff",
    keyRole: "Head of Communication",
    bio: "Network security and penetration testing.",
    avatar: "/team/ayakathiri.png",
    achievement: "OSCP",
    links: {linkedin: "https://www.linkedin.com/in/aya-kathiri-769a021b4/" },
  },
  {
    id: "8",
    name: "Sara Mountassir",
    role: "staff",
    keyRole: "Technical Staff",
    bio: "Privacy and applied crypto research.",
    avatar: "/team/saramountassir.png",
    links: {linkedin: "https://www.linkedin.com/in/sara-mountassir-6ab643304/", github: "https://github.com/sara-mountassir" },
  },
  // {
  //   id: "9",
  //   name: "Ayoub Ouadih",
  //   role: "staff",
  //   keyRole: "Head of Organization",
  //   bio: "Former President. Now security engineer at a FAANG.",
  //   avatar: "/team/ayoubouadih.png",
  //   achievement: "Alumni mentor",
  //   links: {linkedin: "https://www.linkedin.com/in/ayoub-ouadih-6905202a6/" },
  // },
  // {
  //   id: "10",
  //   name: "Hind Hilal",
  //   role: "staff",
  //   keyRole: "Treasurer",
  //   bio: "Former President. Now security engineer at a FAANG.",
  //   avatar: "/team/hindhilal.png",
  //   achievement: "Alumni mentor",
  //   links: { github: "https://github.com/Userhilal", linkedin: "https://www.linkedin.com/in/hind-hilal/" },
  // },
];
