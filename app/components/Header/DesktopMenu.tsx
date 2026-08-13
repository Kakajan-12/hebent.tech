"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import NavDropdown from "./NavDropdown";
import useAppLocale from "@/app/Hooks/GetLocale";

import React from "react";

import { CiMenuBurger } from "react-icons/ci";
{
  /* <CiMenuBurger /> */
}

export default function DesktopMenu() {
  const pathname = usePathname();
  const locale = useAppLocale();

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
        {
          href: "https://travel-tech.hebent.tech",
          label: "Hebent Travel Tech",
        },
        { href: "https://logtech.hebent.tech", label: "Hebent Fleet" },
        { href: `${locale}/products/eventtech`, label: "Hebent Event Tech" },
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
              className={`rounded px-3 py-2 font-bold  text-black hover:text-brand ${
                checkActive(link.href) ? " text-brand" : "text-black"
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
