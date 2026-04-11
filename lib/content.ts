export type ProjectBase = {
  id: string;
  imageSrc: string;
};

export type Project = {
  id: string;
  sourceId: string;
  imageSrc: string;
};

export const SERVICE_IDS = [
  "iot",
  "ai",
  "consulting",
  "development",
  "database",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const STATS_VALUES = [
  { value: "234+", labelKey: "projectsDelivered" },
  { value: "10+", labelKey: "products" },
  { value: "117+", labelKey: "clients" },
  { value: "25+", labelKey: "teamMembers" },
] as const;

export const TESTIMONIAL_IDS = ["t1", "t2", "t3", "t4", "t5", "t6"] as const;

export type TestimonialId = (typeof TESTIMONIAL_IDS)[number];

export const PROJECT_BASES: ProjectBase[] = [
  {
    id: "1",
    imageSrc:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    id: "2",
    imageSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    id: "3",
    imageSrc:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
  {
    id: "4",
    imageSrc:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    id: "5",
    imageSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    id: "6",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: "7",
    imageSrc:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    id: "8",
    imageSrc:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
  },
  {
    id: "9",
    imageSrc:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
];

export function expandProjects(count: number): Project[] {
  return Array.from({ length: count }, (_, i) => {
    const base = PROJECT_BASES[i % PROJECT_BASES.length];
    return {
      id: `p-${i + 1}`,
      sourceId: base.id,
      imageSrc: base.imageSrc,
    };
  });
}
