"use client";

import type { CSSProperties } from "react";
import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { IoLogoWechat } from "react-icons/io5";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SocialLink, Phone } from "@/app/Interfaces/interfaces";
import { useGetPhonesQuery, useGetSocialLinksQuery } from "@/app/api/api";
import { getSocialIcon } from "@/lib/socialIcon";
import WeChatLink from "@/components/WeChatLink";
import footerBg from "../../../public/bg-footer1.svg";

function formatPhoneHref(number: string) {
  return `tel:${number.replace(/[^+\d]/g, "")}`;
}

export default function Footer() {
  const t = useTranslations("Footer");
  const { data: socialLinks } = useGetSocialLinksQuery();
  const { data: phones } = useGetPhonesQuery();

  const social = (socialLinks ?? []).filter(
    (link: SocialLink) => link.icon?.toLowerCase() !== "wechat",
  );

  return (
    <footer className="bg-footer text-white mt-10 lg:mt-16 relative font-vox">
      <div
        className="absolute inset-0 bg-linear-to-r from-[#002146] via-[#004180] to-[#0051AC] z-0"
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
      <div className="relative z-10 container mx-auto  px-5 lg:px-10 xl:px-20 py-6 lg:py-14">
        <div className="footer-container grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between">
          <div className="flex flex-col gap-9 items-start justify-between">
            <div className="flex flex-col gap-5 items-start justify-start">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo1.svg"
                  alt="HEBENT TECHNOLOGY"
                  width={300}
                  height={100}
                  className="h-auto w-auto brightness-0 invert"
                />
              </Link>

              <div className="flex flex-wrap gap-9">
                <WeChatLink className="inline-flex bg-white rounded p-1">
                  <IoLogoWechat className="w-5 h-5 lg:w-7 lg:h-7 text-[#004180] cursor-pointer hover:opacity-70" />
                </WeChatLink>
                {social.map((item: SocialLink) => {
                  const Icon = getSocialIcon(item.icon);
                  const external = item.url.startsWith("https://");
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      className="inline-flex bg-white rounded p-1"
                      aria-label={item.icon}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-[#004180] cursor-pointer hover:opacity-70 grow-0" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end items-start gap-1 font-semibold text-sm ">
              <Link
                href={`/privasypolicy`}
                className="underline-offset-2 hover:underline whitespace-nowrap"
              >
                {t("privacy")} |
              </Link>
              <Link
                href={`/cookies`}
                className="underline-offset-2 hover:underline whitespace-nowrap"
              >
                Cookies |
              </Link>
            </div>
          </div>
          <div className="contacts-container flex flex-col sm:flex-row items-start sm:items-center justify-center gap-9 sm:gap-10 xl:gap-12 ">
            <div className="contacts">
              <h3 className="text-lg font-semibold">{t("contacts")}</h3>
              <ul className="mt-4 lg:mt-6 space-y-4 text-sm text-white font-normal">
                {phones?.map((phone: Phone) => (
                  <li key={phone.id} className="flex gap-4 items-center">
                    <FiPhone
                      className="size-5 shrink-0 text-white mt-1"
                      aria-hidden
                    />
                    <a
                      href={formatPhoneHref(phone.number)}
                      className="text-sm lg:text-lg hover:text-white/70"
                    >
                      {phone.number}
                    </a>
                  </li>
                ))}
                <li className="flex gap-4 items-center">
                  <FiMail
                    className="size-5 shrink-0 text-white mt-1"
                    aria-hidden
                  />
                  <a
                    href="mailto:info@hebent.tech"
                    className="text-sm lg:text-lg hover:text-white/70"
                  >
                    info@hebent.tech
                  </a>
                </li>
                <li className="flex gap-4 items-start">
                  <FiMapPin
                    className="size-5 shrink-0 text-white mt-1"
                    aria-hidden
                  />
                  <span className="text-sm lg:text-lg max-w-xs">
                    {t("address")}
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <FiClock
                    className="size-5 shrink-0 text-white mt-1"
                    aria-hidden
                  />
                  <span className="text-sm lg:text-lg">{t("hours")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full bg-linear-to-r from-[#002146] via-[#004180] to-[#0051AC] px-5 py-2 text-center text-xs text-white/60 lg:px-10">
        <div className="w-full flex flex-wrap items-center justify-center gap-1">
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
            <span className="text-white whitespace-nowrap">
              HEBENT TECHNOLOGY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
