"use client";

import type { FormEvent } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import WeChatLink from "@/components/WeChatLink";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocialLink, Phone } from "@/app/Interfaces/interfaces";
import { useGetSocialLinksQuery, useGetPhonesQuery } from "@/app/api/api";
import { BASE_API_URL } from "@/constant/constant";
import { getSocialIcon } from "@/lib/socialIcon";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { GrUpdate } from "react-icons/gr";
import { motion } from "motion/react";

function formatPhoneHref(number: string) {
  return `tel:${number.replace(/[^+\d]/g, "")}`;
}

export default function ContactPage() {
  const t = useTranslations("Contacts");
  const { data: socialLinks } = useGetSocialLinksQuery();
  const { data: phones } = useGetPhonesQuery();

  const [sending, setSending] = useState(false);
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    captchaText: "",
  });

  const social = (socialLinks ?? []).filter(
    (link: SocialLink) => link.icon?.toLowerCase() !== "wechat",
  );

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch(`${BASE_API_URL}/captcha`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load captcha");
      const svg = await res.text();
      setCaptchaImage(svg);
    } catch {
      setCaptchaImage("");
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCaptcha();
  }, [loadCaptcha]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${BASE_API_URL}/send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error || "Failed to send");
        void loadCaptcha();
      } else {
        toast.success("Message sent successfully!");
        setSuccess("Message sent successfully!");
        setFormData({
          name: "",
          surname: "",
          email: "",
          message: "",
          captchaText: "",
        });
        void loadCaptcha();
      }
    } catch {
      setError("Server error");
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen container mx-auto px-5 sm:px-7 lg:px-10 xl:px-20 2xl:px-36"
    >
      <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter mb-4 lg:mb-10 uppercase">
        {t("title")}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16 xl:gap-36"
      >
        <div className="contact-info space-y-3 lg:space-y-8 mb-3 lg:mb-0">
          <div className="header-info flex flex-col gap-1 lg:gap-4">
            <h2 className="text-base lg:text-2xl font-bold">{t("text")}</h2>
            <p className="text-sm lg:text-base xl:text-xl max-w-2xl leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="body-info space-y-3 lg:space-y-8 ">
            <section>
              <h3 className="text-base lg:text-lg xl:text-2xl font-bold border-b border-black mb-4 w-full">
                {t("visitUs")}
              </h3>
              <p className="text-sm lg:text-base xl:text-xl font-medium">
                {t("address")}
              </p>
            </section>

            <section>
              <h3 className="text-base lg:text-lg xl:text-2xl font-bold border-b border-black mb-4 w-full">
                {t("talkToUs")}
              </h3>
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-4">
                  <ul className="flex flex-col gap-1">
                    {phones?.map((phone: Phone) => (
                      <li key={phone.id}>
                        <a
                          href={formatPhoneHref(phone.number)}
                          className="text-sm lg:text-base xl:text-xl font-medium"
                        >
                          {phone.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="mailto:info@hebent.tech"
                  className="text-sm lg:text-base xl:text-xl hover:text-black transition-colors block"
                >
                  info@hebent.tech
                </Link>
              </div>
            </section>
          </div>

          <div className="flex gap-6">
            <Tooltip>
              <TooltipTrigger>
                <WeChatLink>
                  <IoLogoWechat className="w-8 h-8 lg:w-10 lg:h-10 text-[#073fa1] cursor-pointer hover:opacity-70" />
                </WeChatLink>
              </TooltipTrigger>
              <TooltipContent>
                <p className="hidden lg:block font-vox text-sm text-brand">
                  WeChat ID: davud3108
                </p>
              </TooltipContent>
            </Tooltip>
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
                  <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-[#073fa1] cursor-pointer hover:opacity-70" />
                </a>
              );
            })}
          </div>
        </div>

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
                value={formData.name}
                onChange={handleChange}
                required
                className="text-sm lg:text-base xl:text-xl w-full p-2 bg-slate-200 border-b border-gray-300  focus:ring-1 focus:ring-gray-300 outline-none"
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
                className="text-sm lg:text-base xl:text-xl w-full p-2 bg-slate-200 border-b border-gray-300  focus:ring-1 focus:ring-gray-300 outline-none"
                autoComplete="family-name"
                value={formData.surname}
                onChange={handleChange}
                required
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
              placeholder={"mail@example.com"}
              className="text-sm lg:text-base xl:text-xl w-full p-2 bg-slate-200 border-b border-gray-300  focus:ring-1 focus:ring-gray-300 outline-none"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="font-vox text-base lg:text-lg xl:text-xl font-light"
            >
              {t("comments")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="text-sm lg:text-base xl:text-xl w-full p-2 bg-slate-200 border-b border-gray-300  focus:ring-1 focus:ring-gray-300 outline-none resize-none"
              autoComplete="off"
              placeholder={t("comments")}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="font-vox text-base lg:text-lg xl:text-xl font-light">
              {t("enterCaptcha")}
            </label>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 flex-col">
                {captchaImage ? (
                  <Image
                    unoptimized
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(captchaImage)}`}
                    alt="Captcha"
                    width={200}
                    height={200}
                    className=" px-4 py-2 font-mono font-bold tracking-widest select-none "
                  />
                ) : (
                  <div className="w-[300px] h-[100px] bg-white border border-gray-300 grid place-items-center text-xs text-gray-500 px-2 text-center">
                    {captchaLoading ? "Loading..." : "Captcha unavailable"}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => void loadCaptcha()}
                disabled={captchaLoading}
                className="text-sm underline text-brand"
              >
                {captchaLoading ? "" : <GrUpdate className="w-4 h-4" />}
              </button>
            </div>

            <input
              id="captchaText"
              name="captchaText"
              value={formData.captchaText}
              type="text"
              onChange={handleChange}
              required
              placeholder={t("enterCaptcha")}
              className="text-sm lg:text-base xl:text-xl w-full p-2 bg-slate-200 border-b border-gray-300  focus:ring-1 focus:ring-gray-300 outline-none"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-5 lg:mt-10 text w-full py-4 bg-[#001F3F] text-white font-bold rounded hover:bg-black transition-colors uppercase tracking-widest text-sm disabled:opacity-60"
          >
            {sending ? <ClipLoader color="#0043d8" size={50} /> : t("send")}
          </button>
          {success && <p className="text-sm text-green-600">{success}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </motion.div>
    </motion.main>
  );
}
