"use client";

import type { FormEventHandler } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import WeChatLink from "@/components/WeChatLink";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ContactPage() {
  const t = useTranslations("Contacts");
  const contactEmail = "davud.h@hebent.tech";

  const social = [
    // {
    //   name: "Wechat",
    //   href: "https://www.wechat.com/",
    //   Icon: IoLogoWechat,
    // },
    { name: "Telegram", href: "https://t.me/davud3108", Icon: FaTelegramPlane },
    { name: "WhatsApp", href: "https://wa.me/99365634115", Icon: FaWhatsapp },
  ] as const;

  const handleContactSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const surname = String(formData.get("surname") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const comments = String(formData.get("comments") ?? "").trim();

    const message = [
      `Name: ${name}`,
      `Surname: ${surname}`,
      `Email: ${email}`,
      "",
      "Comments:",
      comments,
    ].join("\n");

    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
      "Contact form",
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoUrl;
    form.reset();
  };

  return (
    <main className="min-h-screen container mx-auto px-7 sm:px-10 lg:px-12 mt-30 lg:mt-50 mb-20 lg:mb-30">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-nexa text-3xl lg:text-5xl font-bold tracking-tighter mb-4 lg:mb-10 uppercase">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16 xl:gap-36">
          <div className="contact-info space-y-9">
            <div className="header-info flex flex-col gap-4">
              <h2 className="font-nexa text-base lg:text-2xl font-bold">
                {t("body")}
              </h2>
              <p className="font-nexa text-sm lg:text-base xl:text-xl max-w-2xl leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div className="body-info space-y-8 ">
              <section>
                <h3 className="font-nexa text-base lg:text-lg xl:text-2xl font-bold border-b border-black pb-2 mb-4 w-full pr-20">
                  {t("visitUs")}
                </h3>
                <p className="font-nexa text-sm lg:text-base xl:text-xl font-medium">
                  {t("address")}
                </p>
              </section>

              <section>
                <h3 className="font-nexa text-base lg:text-lg xl:text-2xl font-bold border-b border-black pb-2 mb-4 w-full pr-20">
                  {t("talkToUs")}
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <a
                      href="tel:+99371387778"
                      className="font-nexa text-sm lg:text-base xl:text-xl font-medium"
                    >
                      +993 71 387778
                    </a>
                    {/* Phone number mobile */}
                    <div className="flex lg:hidden gap-4">
                      <Tooltip>
                        <TooltipTrigger>
                          <WeChatLink>
                            <IoLogoWechat className="w-8 h-8 text-[#5D86C4] cursor-pointer hover:opacity-70" />
                          </WeChatLink>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="hidden lg:block font-vox text-sm text-[#5D86C4] bg-white">
                            {" "}
                            WeChat ID: davud3108
                          </p>
                        </TooltipContent>
                      </Tooltip>
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
                            <item.Icon className="w-8 h-8 text-[#5D86C4] cursor-pointer hover:opacity-70" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <Link
                    href="mailto:davud.h@hebent.tech"
                    className="font-nexa text-sm lg:text-base xl:text-xl hover:text-black transition-colors block"
                  >
                    davud.h@hebent.tech
                  </Link>
                  <Link
                    href="mailto:kakajan.t@hebent.tech"
                    className="font-nexa text-sm lg:text-base xl:text-xl hover:text-black transition-colors block"
                  >
                    kakajan.t@hebent.tech
                  </Link>
                </div>
              </section>
            </div>

            {/* Social Icons desktop */}
            <div className="hidden lg:flex gap-6 pt-4">
              <Tooltip>
                <TooltipTrigger>
                  <WeChatLink>
                    <IoLogoWechat className="w-10 h-10 text-[#5D86C4] cursor-pointer hover:opacity-70" />
                  </WeChatLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="hidden lg:block font-vox text-sm text-[#5D86C4]">
                    WeChat ID: davud3108
                  </p>
                </TooltipContent>
              </Tooltip>
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
          </div>

          {/* Right Column: Form */}
          <form
            className="form-contact flex flex-col gap-2 "
            onSubmit={handleContactSubmit}
          >
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-vox text-base lg:text-lg xl:text-xl font-light"
                >
                  {t("name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("name")}
                  autoComplete="name"
                  className="font-nexa text-sm lg:text-base xl:text-xl w-full p-2 bg-[#D9D9D9] border-b border-black  focus:ring-1 focus:ring-black outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="surname"
                  className="font-vox text-base lg:text-lg xl:text-xl font-light"
                >
                  {t("surname")}
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder={t("surname")}
                  className="font-nexa text-sm lg:text-base xl:text-xl w-full p-2 bg-[#D9D9D9] border-b border-black  focus:ring-1 focus:ring-black outline-none"
                  autoComplete="surname"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-vox text-base lg:text-lg xl:text-xl font-light"
              >
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("email")}
                className="font-nexa text-sm lg:text-base xl:text-xl w-full p-2 bg-[#D9D9D9] border-b border-black  focus:ring-1 focus:ring-black outline-none"
                autoComplete="email"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="comments"
                className="font-vox text-base lg:text-lg xl:text-xl font-light"
              >
                {t("comments")}
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={6}
                className="font-nexa text-sm lg:text-base xl:text-xl w-full p-2 bg-[#D9D9D9] border-b border-black  focus:ring-1 focus:ring-black outline-none resize-none"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="mt-5 lg:mt-10 font-nexa w-full py-4 bg-[#001F3F] text-white font-bold rounded-full hover:bg-black transition-colors uppercase tracking-widest text-sm"
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
