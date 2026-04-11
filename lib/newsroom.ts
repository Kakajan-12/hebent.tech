export const NEWS_CATEGORY_IDS = [
  "all",
  "agriculture",
  "petrochemicals",
  "textiles",
  "innovation",
  "technology",
  "trade",
  "finance",
  "events",
] as const;

export type NewsCategoryId = (typeof NEWS_CATEGORY_IDS)[number];

export type NewsItem = {
  id: string;
  category: Exclude<NewsCategoryId, "all">;
  date: string;
  imageSrc: string;
  categoryLabel: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    category: "innovation",
    date: "2024-02-15",
    imageSrc:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=900&q=80",
    categoryLabel: "Innovation",
  },
  {
    id: "2",
    category: "agriculture",
    date: "2024-01-22",
    imageSrc:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80",
    categoryLabel: "Agriculture",
  },
  {
    id: "3",
    category: "petrochemicals",
    date: "2024-03-08",
    imageSrc:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80",
    categoryLabel: "Petrochemicals",
  },
  {
    id: "4",
    category: "textiles",
    date: "2023-12-10",
    imageSrc:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=900&q=80",
    categoryLabel: "Textiles",
  },
  {
    id: "5",
    category: "technology",
    date: "2024-04-02",
    imageSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    categoryLabel: "Technology",
  },
  {
    id: "6",
    category: "trade",
    date: "2024-02-28",
    imageSrc:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=80",
    categoryLabel: "Trade",
  },
  {
    id: "7",
    category: "finance",
    date: "2024-03-18",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    categoryLabel: "Finance",
  },
  {
    id: "8",
    category: "events",
    date: "2024-05-05",
    imageSrc:
      "https://images.unsplash.com/photo-1540575467063-7a0d95a0fc53?w=900&q=80",
    categoryLabel: "Events",
  },
];
