import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  // --------------------------------- Taplink QR Code ---------------------------------
  // const taplinkUrl = "https://taplink.cc/hebent.tech";
  // const taplinkQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
  //   taplinkUrl,
  // )}`;
  // --------------------------------- Taplink QR Code ---------------------------------
  const exploreLinks = [
    { href: "/about" as const, key: "about" as const },
    { href: "/projects" as const, key: "projects" as const },
    { href: "/careers" as const, key: "careers" as const },
    { href: "/news" as const, key: "news" as const },
  ];
  const social = [
    {
      name: "Wechat",
      href: "wechat://davud3108",
      Icon: IoLogoWechat,
    },
    { name: "Telegram", href: "https://t.me/davud3108", Icon: FaTelegramPlane },
    { name: "WhatsApp", href: "https://wa.me/99365634115", Icon: FaWhatsapp },
  ] as const;

  return (
    <footer className="bg-footer text-white ">
      <div className="container mx-auto px-5 sm:px-6 lg:px-16 xl:px-3 2xl:px-22 pt-6 lg:pt-20 pb-5 lg:pb-8">
        <div className="footer-container flex flex-col lg:flex-row gap-8 lg:gap-52 justify-between">
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
              {social.map((item) => {
                const external = item.href.startsWith("http");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="inline-flex"
                    aria-label={item.name}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <item.Icon className="w-10 h-10 text-[#5D86C4] cursor-pointer hover:opacity-70" />
                  </a>
                );
              })}
            </div>
            {/* --------------------------------- Taplink QR Code --------------------------------- */}
            {/* <a
              href={taplinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-2 rounded-xl bg-white/5 p-3 hover:bg-white/10 transition-colors"
              aria-label="Open Taplink QR"
            >
              <Image
                src={taplinkQrSrc}
                alt="Taplink QR code"
                width={120}
                height={120}
                className="rounded-md bg-white p-1"
                unoptimized
              />
              <span className="font-vox text-xs text-white/85">
                taplink.cc/hebent.tech
              </span>
            </a> */}
            {/* --------------------------------- Taplink QR Code --------------------------------- */}
          </div>
          <div className="contacts-container flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-around gap-9 sm:gap-10 xl:gap-12 ">
            <div className="contacts">
              <h3 className="font-nexa text-lg font-semibold">
                {t("contacts")}
              </h3>
              <ul className="mt-4 lg:mt-6 space-y-4 text-sm text-white font-bold">
                <li className="flex gap-4 items-center">
                  <FiPhone className="size-5 shrink-0 text-white" aria-hidden />
                  <a
                    href="tel:+99371387778"
                    className="font-nexa text-sm lg:text-lg hover:text-white/70"
                  >
                    +993 (71) 387778
                  </a>
                </li>
                <li className="flex gap-4 items-center">
                  <FiMail className="size-5 shrink-0 text-white" aria-hidden />
                  <a
                    href="mailto:davud.h@hebent.tech"
                    className="font-nexa text-sm lg:text-lg hover:text-white/70"
                  >
                    davud.h@hebent.tech
                  </a>
                </li>
                <li className="flex gap-4 items-center">
                  <FiMapPin
                    className="size-5 shrink-0 text-white"
                    aria-hidden
                  />
                  <span className="font-nexa text-sm lg:text-lg">
                    {t("address")}
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <FiClock className="size-5 shrink-0 text-white" aria-hidden />
                  <span className="font-nexa text-sm lg:text-lg">
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
                    className="w-30 lg:w-full border-b border-white pb:1 lg:pb-5 pr-0 lg:pr-42 whitespace-nowrap"
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
