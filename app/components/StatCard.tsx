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
    <div className="stat-card aspect-video flex flex-col items-center justify-center bg-brand h-full w-full text-white text-center shadow-sm">
      <div className="flex items-center justify-center text-3xl sm:text-4xl tracking-tight font-bold">
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
      <p className="font-vox text-xl sm:text-2xl lg:text-xl font-bold text-white whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
