import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
// import { GrLocation } from "react-icons/gr";
// import { SlSocialInstagram } from "react-icons/sl";
// import { SlSocialTwitter } from "react-icons/sl";
// import { SlSocialFacebook } from "react-icons/sl";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";

import Image from "next/image";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

function SocialIcon({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <a
      href="#"
      className="flex size-10 items-center justify-center rounded-lg  text-white transition hover:bg-white/10"
      aria-label={label}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const t = useTranslations("Footer");
  const exploreLinks = [
    { href: "/about" as const, key: "about" as const },
    { href: "/projects" as const, key: "projects" as const },
    { href: "/careers" as const, key: "careers" as const },
    { href: "/news" as const, key: "news" as const },
  ];

  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className=" grid grid-cols-2 gap-12 lg:grid-cols-3 lg:gap-8">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="HEBENT TECHNOLOGY"
                width={174}
                height={54}
                className="brightness-0 invert"
              />
            </Link>
            <div className="mt-6 flex flex-wrap gap-3">
              <SocialIcon label={t("instagram")}>
                <AiFillInstagram size={35} />
              </SocialIcon>
              <SocialIcon label={t("twitter")}>
                <RiTwitterFill size={35} />
              </SocialIcon>
              <SocialIcon label={t("facebook")}>
                <FaFacebookF size={30} />
              </SocialIcon>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("contacts")}</h3>
            <ul className="mt-6 space-y-4 text-sm text-white/90">
              <li className="flex gap-3">
                <FiPhone
                  className="mt-0.5 size-5 shrink-0 text-white"
                  aria-hidden
                />
                <a href="tel:+9930000000" className="hover:text-white/70">
                  +993 (00) 000-00-00
                </a>
              </li>
              <li className="flex gap-3">
                <FiMail
                  className="mt-0.5 size-5 shrink-0 text-white"
                  aria-hidden
                />
                <a
                  href="mailto:info@hebent.tech"
                  className="hover:text-white/70"
                >
                  info@hebent.tech
                </a>
              </li>
              <li className="flex gap-3">
                <FiMapPin
                  className="mt-0.5 size-5 shrink-0 text-white"
                  aria-hidden
                />
                <span>{t("address")}</span>
              </li>
              <li className="flex gap-3">
                <FiClock
                  className="mt-0.5 size-5 shrink-0 text-white"
                  aria-hidden
                />
                <span>{t("hours")}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("explore")}</h3>
            <ul className="mt-6 space-y-3 text-sm font-medium">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white hover:text-white/70"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-8 text-center text-xs text-white/60">
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
              {t("cookies")}
            </Link>{" "}
            | {t("powered")}{" "}
            <Image
              src="/logoIcon.svg"
              alt="HEBENT TECHNOLOGY"
              width={24}
              height={24}
              className="inline-block"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
