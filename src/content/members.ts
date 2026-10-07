export type MemberSocial = {
  label: string;
  href: string;
};

export type ClubMember = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  imageAlt: string;
  socials: MemberSocial[];
};

export const members: ClubMember[] = [
  {
    slug: "maya-chen",
    name: "Maya Chen",
    title: "Co-president",
    bio: "Maya turns messy event data into questions the rest of the club can test. Their work spans possession models, data visualization, and the editorial decisions that make a technical result legible to a general audience.",
    image: "/members/maya-chen.svg",
    imageAlt: "Illustrated portrait of Maya Chen",
    socials: [
      { label: "GitHub", href: "https://github.com" },
      { label: "X / Twitter", href: "https://x.com" },
    ],
  },
  {
    slug: "jordan-okafor",
    name: "Jordan Okafor",
    title: "Research lead",
    bio: "Jordan studies how to separate repeatable team performance from the luck hiding in box scores. They lead question setting, model review, and the club's push to publish enough context for another analyst to challenge every conclusion.",
    image: "/members/jordan-okafor.svg",
    imageAlt: "Illustrated portrait of Jordan Okafor",
    socials: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
  {
    slug: "ren-alvarez",
    name: "Ren Alvarez",
    title: "Engineering lead",
    bio: "Ren builds the APIs, data pipelines, and live tools behind the club's research. They care about reproducible systems, fast feedback loops, and making a model useful before kickoff rather than after the season.",
    image: "/members/ren-alvarez.svg",
    imageAlt: "Illustrated portrait of Ren Alvarez",
    socials: [
      { label: "GitHub", href: "https://github.com" },
      { label: "X / Twitter", href: "https://x.com" },
    ],
  },
  {
    slug: "nora-blackwell",
    name: "Nora Blackwell",
    title: "Data lead",
    bio: "Nora leads the club's data collection and cross-sport research. Their work connects public-source collection, network analysis, and storytelling that shows where the signal is strong—and where it is only a persuasive chart.",
    image: "/members/nora-blackwell.svg",
    imageAlt: "Illustrated portrait of Nora Blackwell",
    socials: [
      { label: "GitHub", href: "https://github.com" },
      { label: "X / Twitter", href: "https://x.com" },
    ],
  },
  {
    slug: "elena-varga",
    name: "Elena Varga",
    title: "Sport research lead",
    bio: "Elena translates unfamiliar sports into systems the club can measure. They specialize in manual charting, state-space models, and finding the repeatable decisions hiding inside fast-moving games.",
    image: "/members/elena-varga.svg",
    imageAlt: "Illustrated portrait of Elena Varga",
    socials: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
  {
    slug: "sam-trent",
    name: "Sam Trent",
    title: "Developer",
    bio: "Sam keeps the club's public data tools dependable. They work on collection infrastructure, storage, and deployment, with a simple rule: every scraper should be respectful, restartable, and easy for the next member to run.",
    image: "/members/sam-trent.svg",
    imageAlt: "Illustrated portrait of Sam Trent",
    socials: [
      { label: "GitHub", href: "https://github.com" },
      { label: "X / Twitter", href: "https://x.com" },
    ],
  },
];

export function getMember(slug: string) {
  return members.find((member) => member.slug === slug);
}

export function getMemberSlugs() {
  return members.map((member) => member.slug);
}
