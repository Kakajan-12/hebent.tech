"use client";

import { FaChevronDown } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const parentActive = items.some((item) => checkActive(item.href));

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-bold font-nexa text-black transition hover:bg-gray-500/10 ${parentActive ? "bg-footer text-white" : "bg-transparent text-black"}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <FaChevronDown
          className={`size-3 shrink-0 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
          role="menu"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 text-sm font-nexa text-slate-700 hover:bg-slate-50 ${checkActive(item.href) ? "bg-footer text-white" : "bg-transparent text-black"}`}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
