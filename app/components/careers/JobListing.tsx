import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
  id: number;
  title: string;
  text: string;
};

export default function JobListing({ id, title, text }: Props) {
  const t = useTranslations("Careers");

  return (
    <li className="flex flex-col gap-3 lg:gap-20 xl:gap-32 border-b border-black py-3 last:border-b-0 lg:flex-row sm:items-start sm:justify-between sm:gap-8 md:px-2 md:py-4">
      <div className="flex-1">
        <h3 className="font-nexa text-lg font-bold md:text-xl">{title}</h3>
        <div
          className="mt-2 font-vox text-sm leading-relaxed md:text-base"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <Link
        href={`/careers/${id}`}
        className="inline-flex items-center justify-end w-full lg:w-auto gap-1 font-nexa text-base font-bold transition hover:underline hover:decoration-black underline-offset-4"
      >
        {t("apply")}
        <FiArrowUpRight className="size-4 " aria-hidden />
      </Link>
    </li>
  );
}
