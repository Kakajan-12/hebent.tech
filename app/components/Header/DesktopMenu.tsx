"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import NavDropdown from "./NavDropdown";
import React from "react";
export default function DesktopMenu() {
  const pathname = usePathname();

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  const t = useTranslations("Nav");

  const links = [
    { href: "/", label: t("main") },
    { href: "/project", label: t("projects") },
    {
      href: "/products",
      label: t("products"),
      items: [
        { href: "/products/traveltech", label: t("travel") },
        { href: "/products/logtech", label: t("logistics") },
        { href: "/products/eventtech", label: t("events") },
      ],
    },
    { href: "/newsroom", label: t("newsroom") },
    {
      href: "/company",
      label: t("company"),
      items: [
        { href: "/about", label: t("about") },
        { href: "/careers", label: t("careers") },
        { href: "/contacts", label: t("contacts") },
      ],
    },
  ];

  return (
    <nav
      className="flex items-center justify-center gap-1 text-sm font-bold relative z-60 "
      aria-label="Main"
    >
      {links.map((link) => {
        if (link.items) {
          return (
            <NavDropdown
              key={link.href}
              label={link.label}
              items={link.items}
              checkActive={checkActive}
            />
          );
        } else {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-3 py-2 font-bold  text-black hover:bg-brand hover:text-white ${
                checkActive(link.href) ? "bg-brand text-white" : "bg-white"
              }`}
            >
              {link.label}
            </Link>
          );
        }
      })}
    </nav>
  );
}
