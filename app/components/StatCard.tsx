import CountUp from "@/components/CountUp";

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
    <div className="flex flex-col items-start justify-start gap-2 md:gap-3 h-full w-full text-left">
      <div className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
        <span className="leading-none">
          <CountUp
            to={Number(value)}
            from={0}
            separator=","
            direction="up"
            duration={1}
            delay={0}
          />
          {!hidePlus ? "+" : ""}
        </span>
      </div>
      <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
