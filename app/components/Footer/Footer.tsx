"use client";

import type { CSSProperties } from "react";
import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SocialLink, Phone } from "@/app/Interfaces/interfaces";
import { useGetPhonesQuery, useGetSocialLinksQuery } from "@/app/api/api";
import SocialLinkAnchor from "@/components/SocialLinkAnchor";
import footerBg from "../../../public/bg-footer1.svg";
import useAppLocale from "@/app/Hooks/GetLocale";

function formatPhoneHref(number: string) {
  return `tel:${number.replace(/[^+\d]/g, "")}`;
}

export default function Footer() {
  const t = useTranslations("Footer");
  const { data: socialLinks } = useGetSocialLinksQuery();
  const { data: phones } = useGetPhonesQuery();
  const locale = useAppLocale();

  const products = [
    { href: "https://travel-tech.hebent.tech", label: "Hebent Travel Tech" },
    { href: "https://logtech.hebent.tech", label: "Hebent Log Tech" },
    { href: `${locale}/products/eventtech`, label: "Hebent Event Tech" },
  ];

  return (
    <footer className="bg-footer text-white mt-10 lg:mt-16 relative">
      <div
        className="absolute inset-0 bg-linear-to-r from-[#223086] via-[#103FAA] to-[#0063FF] z-0"
        aria-hidden
      />
      <div
        className="footer-bg-pattern "
        style={
          {
            "--footer-bg-url": `url(${footerBg.src})`,
          } as CSSProperties
        }
        aria-hidden
      />
      <div className="relative z-10 container mx-auto px-5 lg:px-10 pt-8 lg:pt-14">
        <div className="footer-container-content grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
          <div className="left-content flex flex-col sm:gap-11 items-start justify-between md:pl-18">
            <div className="flex flex-col gap-9 items-start justify-start">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo1.svg"
                  alt="HEBENT TECHNOLOGY"
                  width={200}
                  height={200}
                  className="h-auto w-46 lg:w-80 brightness-0 invert"
                />
              </Link>

              <div className="hidden sm:flex flex-row w-full justify-between md:gap-3 lg:gap-6">
                {socialLinks?.map((item: SocialLink) => (
                  <SocialLinkAnchor
                    key={item.id}
                    item={item}
                    className="flex items-center justify-center w-22 capitalize text-xs font-medium bg-transparent py-2 px-3 hover:bg-white hover:border-black hover:text-black transition-all duration-300 border border-white"
                  />
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-6 items-start">
              <div className="privacy flex flex-col-reverse md:flex-row justify-start items-end gap-2 lg:gap-11 font-semibold text-xs font-vox text-white/65 mt-4 pb-2 px-5">
                <Link
                  href={`/privasypolicy`}
                  className="underline-offset-2 underline whitespace-nowrap cursor-pointer"
                >
                  {t("privacy")}
                </Link>
                <Link
                  href={`/cookies`}
                  className="underline-offset-2 underline whitespace-nowrap cursor-pointer"
                >
                  Cookies
                </Link>
              </div>

              <div className="rights font-vox">
                <span className="whitespace-nowrap">{t("rights")} | </span>
                <span className="whitespace-nowrap"> Powered by </span>
                <div className="flex items-center">
                  <Image
                    src="/logoIcon.svg"
                    alt="HEBENT TECHNOLOGY"
                    width={24}
                    height={24}
                    className="inline-block mx-1 shrink-0 brightness-0 invert logo-spin motion-reduce:animate-none"
                  />
                  <span className=" whitespace-nowrap">HEBENT TECHNOLOGY</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right-content flex justify-between lg:justify-end items-start gap-6 md:gap-12 lg:gap-23 md:pr-18">
            <div className="products text-xs lg:text-base">
              <h3 className=" font-bold font-vox">{t("products")}</h3>
              <ul className="mt-3 lg:mt-7 space-y-4 text-white font-normal">
                {products.map((product) => (
                  <li key={product.label}>
                    <a
                      href={product.href}
                      className="text-xs lg:text-base whitespace-nowrap hover:text-white/70 transition-colors"
                    >
                      {product.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contacts text-xs lg:text-base">
              <h3 className=" font-bold font-vox">{t("contacts")}</h3>
              <ul className="mt-3 lg:mt-7 space-y-4 text-white font-normal">
                {phones?.map((phone: Phone) => (
                  <li key={phone.id} className="flex gap-4 items-center">
                    <FiPhone
                      className="size-3 lg:size-5 shrink-0 text-white mb-1"
                      aria-hidden
                    />
                    <a
                      href={formatPhoneHref(phone.number)}
                      className="text-xs lg:text-base hover:text-white/70"
                    >
                      {phone.number}
                    </a>
                  </li>
                ))}
                <li className="flex gap-4 items-center">
                  <FiMail
                    className="size-3 lg:size-5 shrink-0 text-white mb-1"
                    aria-hidden
                  />
                  <a
                    href="mailto:info@hebent.tech"
                    className="text-xs lg:text-base hover:text-white/70"
                  >
                    info@hebent.tech
                  </a>
                </li>
                <li className="flex gap-4 items-center">
                  <FiClock
                    className="size-3 lg:size-5 shrink-0 text-white mb-1"
                    aria-hidden
                  />
                  <span className="text-xs lg:text-base">{t("hours")}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex sm:hidden gap-3 mb-24">
            {socialLinks?.map((item: SocialLink) => (
              <SocialLinkAnchor
                key={item.id}
                item={item}
                className="flex items-center justify-center w-20 capitalize text-xs font-medium bg-transparent py-2 px-3 hover:bg-white hover:border-black hover:text-black transition-all duration-300 border border-white"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
