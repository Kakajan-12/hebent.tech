"use client";

import { FaChevronDown } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";

type Item = { href: string; label: string };

type NavDropdownProps = {
  label: string;
  items: Item[];
  checkActive: (href: string) => boolean;
};

export default function NavDropdown({
  label,
  items,
  checkActive,
}: NavDropdownProps) {
  const parentActive = items.some((item) => checkActive(item.href));

  return (
    <div className="group relative">
      <button
        type="button"
        className={`flex items-center gap-1 rounded px-3 py-2 text-sm font-bold font-nexa transition hover:bg-brand hover:text-white ${parentActive ? "font-extrabold" : "font-bold"}`}
        aria-expanded={false}
      >
        {label}
        <FaChevronDown
          className="size-3 shrink-0 pb-0.5 transition group-hover:rotate-180"
          aria-hidden
        />
      </button>
      <div
        className="absolute left-0 top-full z-50 hidden min-w-fit rounded-xl border border-slate-200 bg-white py-2 shadow-lg group-hover:block"
        role="menu"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block whitespace-nowrap px-4 py-2 text-sm font-nexa transition hover:text-brand ${checkActive(item.href) ? "font-extrabold text-brand" : "font-bold text-black "}`}
            role="menuitem"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
