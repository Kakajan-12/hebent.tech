type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat-card flex flex-col items-center justify-center bg-brand w-40 md:w-46 lg:w-50 xl:w-64 text-white text-center shadow-sm py-4 lg:py-6 xl:py-10 px-3 lg:px-5 rounded-b-sm rounded-tr-sm rounded-sm">
      <p className="text-2xl font-bold tracking-tight md:text-3xl">{value}</p>
      <p className="font-vox text-sm lg:text-lg font-normal text-white whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
