type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat-card flex flex-col items-center justify-center bg-brand w-full text-white text-center shadow-sm py-1 sm:py-4 lg:py-6 xl:py-10 px-1 sm:px-3 lg:px-5 rounded-b rounded-tr rounded">
      <p className="text-2xl sm:text-2xl font-bold tracking-tight md:text-3xl">
        {value} +
      </p>
      <p className="font-vox text-xs sm:text-sm lg:text-lg font-normal text-white whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
