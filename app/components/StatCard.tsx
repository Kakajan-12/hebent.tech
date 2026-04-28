type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat-card bg-brand w-40 sm:w-54 md:w-60 lg:w-52 xl:w-64 text-white text-center shadow-sm py-4 md:pt-12 md:pb-8 lg:pt-10 lg:pb-6 pl-8 pr-2 lg:px-6 rounded-b-2xl rounded-tr-2xl rounded-2xl">
      <p className="font-nexa text-2xl font-bold tracking-tight md:text-3xl">
        {value}
      </p>
      <p className="font-nexa text-sm lg:text-lg font-normal text-white">
        {label}
      </p>
    </div>
  );
}
