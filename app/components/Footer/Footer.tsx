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
    <footer className="bg-footer text-white ">
      <div className="container mx-auto px-5 sm:px-6 lg:px-16 xl:px-3 2xl:px-22 pt-6 lg:pt-20 pb-5 lg:pb-8">
        <div className="footer-container flex flex-col lg:flex-row gap-8 justify-between">
          <div className="logo-container flex flex-col gap-9 items-center lg:items-start">
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
          <div className="contacts-container flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-around gap-9 sm:gap-12">
            <div className="contacts">
              <h3 className="font-nexa text-lg font-semibold">
                {t("contacts")}
              </h3>
              <ul className="mt-4 lg:mt-6 space-y-4 text-sm text-white font-bold">
                <li className="flex gap-4 items-center">
                  <FiPhone className="size-5 shrink-0 text-white" aria-hidden />
                  <a
                    href="tel:+9930000000"
                    className="font-vox text-sm lg:text-lg hover:text-white/70"
                  >
                    +993 (00) 000-00-00
                  </a>
                </li>
                <li className="flex gap-4 items-center">
                  <FiMail className="size-5 shrink-0 text-white" aria-hidden />
                  <a
                    href="mailto:info@hebent.tech"
                    className="font-vox text-sm lg:text-lg hover:text-white/70"
                  >
                    info@hebent.tech
                  </a>
                </li>
                <li className="flex gap-4 items-center">
                  <FiMapPin
                    className="size-5 shrink-0 text-white"
                    aria-hidden
                  />
                  <span className="font-vox text-sm lg:text-lg">
                    {t("address")}
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <FiClock className="size-5 shrink-0 text-white" aria-hidden />
                  <span className="font-vox text-sm lg:text-lg">
                    {t("hours")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="links-container">
              <ul className="mt-0 lg:mt-6 space-y-5 pl-0 sm:pl-8 pr-10 lg:pr-0 border-t sm:border-t-0 border-l-0 sm:border-l border-white py-5 lg:py-0">
                {exploreLinks.map((l) => (
                  <li
                    key={l.href}
                    className="w-30 lg:w-full border-b border-white pb:1 lg:pb-5 pr-0 lg:pr-42"
                  >
                    <Link
                      href={l.href}
                      className="font-vox text-sm lg:text-lg text-white font-bold hover:text-white/70"
                    >
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
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
              {t("cookies")}
            </Link>{" "}
            | {t("powered")}{" "}
            <Image
              src="/logo.svg"
              alt="HEBENT TECHNOLOGY"
              width={50}
              height={50}
              className="inline-block brightness-0 invert"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
