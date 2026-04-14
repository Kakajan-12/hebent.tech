export type NavLink = { labelKey: string; href: string };
export type NavItem =
  | { type: "link"; labelKey: string; href: string }
  | { type: "dropdown"; labelKey: string; items: NavLink[] };

export const makeNavItems = (locale: string): NavItem[] => [
  { type: "link", labelKey: "main", href: `/` },
  { type: "link", labelKey: "projects", href: `${locale}/project` },
  {
    type: "dropdown",
    labelKey: "products",
    items: [
      { labelKey: "travel", href: `/${locale}/products/traveltech` },
      { labelKey: "logistics", href: `/${locale}/products/logtech` },
      { labelKey: "events", href: `/${locale}/products/eventtech` },
    ],
  },
  { type: "link", labelKey: "newsroom", href: `/newsroom` },
  {
    type: "dropdown",
    labelKey: "company",
    items: [
      { labelKey: "about", href: `/about` },
      { labelKey: "careers", href: `${locale}/careers` },
      { labelKey: "references", href: `/references` },
      { labelKey: "contacts", href: `${locale}/contacts` },
    ],
  },
];
