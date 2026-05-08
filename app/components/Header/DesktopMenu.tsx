"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import NavDropdown from "./NavDropdown";

export default function DesktopMenu() {
  const pathname = usePathname();

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  const t = useTranslations("Nav");

  const productLinks = [
    { href: "/products/traveltech", label: t("travel") },
    { href: "/products/logtech", label: t("logistics") },
    { href: "/products/eventtech", label: t("events") },
  ];

  const companyLinks = [
    { href: "/about", label: t("about") },
    { href: "/careers", label: t("careers") },
    // { href: "/references", label: t("references") },
    { href: "/contacts", label: t("contacts") },
  ];

  return (
    <nav
      className="flex items-center justify-center gap-1 font-nexa relative z-60"
      aria-label="Main"
    >
      <Link
        href="/"
        className={`rounded px-3 py-2 text-sm font-bold hover:bg-brand hover:text-white ${checkActive("/") ? "bg-brand text-white" : "bg-transparent text-black"}`}
      >
        {t("main")}
      </Link>
      <Link
        href="/project"
        className={`rounded px-3 py-2 text-sm font-bold hover:bg-brand hover:text-white ${checkActive("/project") ? "bg-brand text-white" : "bg-transparent text-black"}`}
      >
        {t("projects")}
      </Link>
      <NavDropdown
        label={t("products")}
        items={productLinks}
        checkActive={checkActive}
      />
      <Link
        href="/newsroom"
        className={`rounded px-3 py-2 text-sm font-bold hover:bg-brand hover:text-white ${checkActive("/newsroom") ? "bg-brand text-white" : "bg-transparent text-black"}`}
      >
        {t("newsroom")}
      </Link>
      <NavDropdown
        label={t("company")}
        items={companyLinks}
        checkActive={checkActive}
      />
    </nav>
  );
}
