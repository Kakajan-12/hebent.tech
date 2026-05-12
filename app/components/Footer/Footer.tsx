"use client";

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
import bgIcon from "@/public/footer-bg-icon.png";

function formatPhoneHref(number: string) {
  return `tel:${number.replace(/[^+\d]/g, "")}`;
}

export default function Footer() {
  const t = useTranslations("Footer");
  const { data: socialLinks } = useGetSocialLinksQuery();
  const { data: phones } = useGetPhonesQuery();

  const exploreLinks = [
    { href: "/about" as const, key: "about" as const },
    { href: "/projects" as const, key: "projects" as const },
    { href: "/careers" as const, key: "careers" as const },
    { href: "/news" as const, key: "news" as const },
  ];
  const social = (socialLinks ?? []).filter(
    (link: SocialLink) => link.icon?.toLowerCase() !== "wechat",
  );

  return (
    <footer className="bg-footer text-white mt-10 lg:mt-16 relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 h-full aspect-square translate-x-1/2 pointer-events-none">
        <Image
          src={bgIcon}
          alt="Footer Background Icon"
          width={1000}
          height={1000}
          className="object-contain object-left opacity-10 brightness-0 invert"
        />
      </div>
      <div className="container mx-auto px-5 sm:px-6 lg:px-16 xl:px-13 2xl:px-22 pt-6 lg:pt-20 pb-5 lg:pb-8">
        <div className="footer-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-52">
          <div className="flex flex-col gap-9 items-center lg:items-start">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="HEBENT TECHNOLOGY"
                width={300}
                height={100}
                className="brightness-0 invert"
              />
            </Link>

            <div className="flex flex-wrap gap-9">
              <WeChatLink>
                <IoLogoWechat className="w-8 h-8 text-white cursor-pointer hover:opacity-70" />
              </WeChatLink>
              {social.map((item: SocialLink) => {
                const Icon = getSocialIcon(item.icon);
                const external = item.url.startsWith("http");
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    className="inline-flex"
                    aria-label={item.icon}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <Icon className="w-8 h-8 text-white cursor-pointer hover:opacity-70" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="contacts-container flex flex-col sm:flex-row items-start sm:items-center justify-start gap-9 sm:gap-10 xl:gap-12 ">
            <div className="contacts">
              <h3 className="text-lg font-semibold">{t("contacts")}</h3>
              <ul className="mt-4 lg:mt-6 space-y-4 text-sm text-white font-bold">
                {phones?.map((phone: Phone) => (
                  <li key={phone.id} className="flex gap-4 items-center">
                    <FiPhone
                      className="size-5 shrink-0 text-white"
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
                  <FiMail className="size-5 shrink-0 text-white" aria-hidden />
                  <a
                    href="mailto:info@hebent.tech"
                    className="text-sm lg:text-lg hover:text-white/70"
                  >
                    info@hebent.tech
                  </a>
                </li>
                <li className="flex gap-4 items-center">
                  <FiMapPin
                    className="size-5 shrink-0 text-white"
                    aria-hidden
                  />
                  <span className="text-sm lg:text-lg">{t("address")}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <FiClock className="size-5 shrink-0 text-white" aria-hidden />
                  <span className="text-sm lg:text-lg">{t("hours")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-0 lg:mt-12 pt-8 text-center text-xs text-white/60">
          <p>
            {t("rights")} |{" "}
            <Link
              href={`/privasypolicy`}
              className="underline-offset-2 hover:underline"
            >
              {t("privacy")}
            </Link>{" "}
            |{" "}
            <Link
              href={`/cookies`}
              className="underline-offset-2 hover:underline"
            >
              Cookies
            </Link>{" "}
            | Powered by{" "}
            <Image
              src="/logoIcon.svg"
              alt="HEBENT TECHNOLOGY"
              width={24}
              height={24}
              className="inline-block mx-1 shrink-0 brightness-0 invert logo-spin motion-reduce:animate-none"
            />
            <span className="text-white">HEBENT TECHNOLOGY</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
