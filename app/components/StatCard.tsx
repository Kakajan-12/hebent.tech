type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat-card flex flex-col items-center justify-center bg-stat-card w-40 sm:w-54 md:w-60 lg:w-50 xl:w-64 text-white text-center shadow-sm py-4 lg:py-10 pl-8 pr-2 lg:px-5 rounded-b-sm rounded-tr-sm rounded-sm">
      <p className="text-2xl font-bold tracking-tight md:text-3xl">{value}</p>
      <p className="font-vox text-sm lg:text-lg font-normal text-white whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
