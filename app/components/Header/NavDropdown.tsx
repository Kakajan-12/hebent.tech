"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleOpen = () => {
    clearCloseTimeout();
    setIsOpen(true);
  };

  const handleCloseWithDelay = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleCloseWithDelay}
    >
      <button
        type="button"
        className={`relative flex items-center gap-1 rounded px-3 py-2 transition font-bold text-black hover:text-brand${parentActive ? "text-brand" : " text-black"}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
        <FaChevronDown
          className={`size-3 shrink-0 pb-0.5 transition ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        className={`absolute left-0 top-10 z-50 min-w-fit rounded border border-slate-200 bg-white py-2 shadow-lg ${isOpen ? "block" : "hidden"}`}
        role="menu"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block whitespace-nowrap px-2 py-1 text-sm transition hover:text-brand ${checkActive(item.href) ? " text-brand" : " text-black "}`}
            role="menuitem"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
