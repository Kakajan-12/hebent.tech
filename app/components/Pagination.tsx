"use client";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoChevronBackSharp } from "react-icons/io5";
import { useTranslations } from "next-intl";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations("Pagination");

  if (totalPages <= 1) return null;

  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const nums = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 py-10"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
        disabled={page <= 1}
        aria-label={t("previous")}
        onClick={() => onPageChange(page - 1)}
      >
        <IoChevronBackSharp className="size-5" />
      </button>
      {start > 1 ? (
        <>
          <PageBtn n={1} current={page} onPick={onPageChange} />
          {start > 2 ? (
            <span className="px-1 text-slate-400" aria-hidden>
              …
            </span>
          ) : null}
        </>
      ) : null}
      {nums.map((n) => (
        <PageBtn key={n} n={n} current={page} onPick={onPageChange} />
      ))}
      {end < totalPages ? (
        <>
          {end < totalPages - 1 ? (
            <span className="px-1 text-slate-400" aria-hidden>
              …
            </span>
          ) : null}
          <PageBtn n={totalPages} current={page} onPick={onPageChange} />
        </>
      ) : null}
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
        disabled={page >= totalPages}
        aria-label={t("next")}
        onClick={() => onPageChange(page + 1)}
      >
        <IoChevronForwardSharp className="size-5" />
      </button>
    </nav>
  );
}

function PageBtn({
  n,
  current,
  onPick,
}: {
  n: number;
  current: number;
  onPick: (p: number) => void;
}) {
  const active = n === current;
  return (
    <button
      type="button"
      onClick={() => onPick(n)}
      className={`min-w-10 rounded-lg px-3 py-2 text-sm font-semibold tabular-nums transition ${
        active
          ? "bg-brand text-white shadow-sm"
          : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {String(n).padStart(2, "0")}
    </button>
  );
}
