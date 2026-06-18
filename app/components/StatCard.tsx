type StatCardProps = {
  value: string;
  label: string;
};

const PRODUCTS_LABELS = new Set(
  [
    "products",
    "product",
    "продукт",
    "продукты",
    "продуктов",
    "produktlar",
    "produkt",
    "проекты",
    "proýektlar",
    "projects",
  ].map((s) => s.normalize("NFKC").toLowerCase()),
);

function isProductsLabel(label: string) {
  const s = label.normalize("NFKC").toLowerCase().trim();
  return PRODUCTS_LABELS.has(s);
}

export default function StatCard({ value, label }: StatCardProps) {
  const hidePlus = isProductsLabel(label);

  return (
    <div className="stat-card aspect-video flex flex-col items-center justify-center bg-brand h-full w-full text-white text-center shadow-sm">
      <div className="flex items-center justify-center text-5xl tracking-tight font-bold">
        <span>
          {value}
          {!hidePlus ? "+" : ""}
        </span>
      </div>
      <p className="font-vox text-2xl lg:text-xl font-bold text-white whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
