import { TfiArrowTopRight } from "react-icons/tfi";
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
    <li className="flex flex-col gap-3 lg:gap-20 xl:gap-32 border-b border-black py-3 last:border-b-0 lg:flex-row sm:items-start sm:justify-between sm:gap-8 md:px-2 md:py-4 lg:py-13">
      <div className="flex-1">
        <h3 className="text-lg font-bold md:text-3xl">{title}</h3>
        <div
          className="mt-2 text-sm leading-relaxed md:text-xl"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <Link
        href={`/careers/${id}`}
        className="group inline-flex items-center justify-end w-full lg:w-auto gap-1 text-base lg:text-4xl font-bold transition"
      >
        <span className="relative inline-flex items-center gap-1 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
          {t("apply")}
          <TfiArrowTopRight
            className="size-5 lg:size-10 shrink-0 group-hover:translate-x-1 transition-transform"
            aria-hidden
          />
        </span>
      </Link>
    </li>
  );
}
