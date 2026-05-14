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
    <div className="stat-card flex flex-col items-center justify-center bg-brand h-full w-full text-white text-center shadow-sm py-1 sm:py-4 lg:py-6 xl:py-10 px-1 sm:px-3 lg:px-5 rounded-b rounded-tr rounded">
      <div className="flex items-center justify-center text-xl sm:text-2xl tracking-tight md:text-3xl lg:text-4xl xl:text-5xl font-medium">
        <span>
          {value}
          {!hidePlus ? "+" : ""}
        </span>
      </div>
      <p className="font-vox text-xs sm:text-sm lg:text-lg xl:text-2xl font-normal text-white whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
