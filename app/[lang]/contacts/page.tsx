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
import Loading from "@/components/ui/Loading";
import SuccessModal from "@/components/ui/SuccessModal";
import { GrUpdate } from "react-icons/gr";
import { motion } from "motion/react";
import Heading from "@/components/Heading";

function formatPhoneHref(number: string) {
  return `tel:${number.replace(/[^+\d]/g, "")}`;
}

export default function ContactPage() {
  const t = useTranslations("Contacts");
  const tPlaceHolder = useTranslations("Careers");
  const { data: socialLinks } = useGetSocialLinksQuery();
  const { data: phones } = useGetPhonesQuery();

  const [sending, setSending] = useState(false);
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(socialLinks);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    captchaText: "",
  });

  const fetchCaptcha = useCallback(async () => {
    const res = await fetch(`${BASE_API_URL}/captcha`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to load captcha");
    return res.text();
  }, []);

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const svg = await fetchCaptcha();
      setCaptchaImage(svg);
    } catch {
      setCaptchaImage("");
    } finally {
      setCaptchaLoading(false);
    }
  }, [fetchCaptcha]);

  useEffect(() => {
    let cancelled = false;

    fetchCaptcha()
      .then((svg) => {
        if (!cancelled) setCaptchaImage(svg);
      })
      .catch(() => {
        if (!cancelled) setCaptchaImage("");
      })
      .finally(() => {
        if (!cancelled) setCaptchaLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchCaptcha]);

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

    try {
      const res = await fetch(`${BASE_API_URL}/send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      const data: { error?: string } = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Failed to send");
        void loadCaptcha();
      } else {
        setShowSuccessModal(true);
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
      className="min-h-screen container mx-auto px-5 sm:px-7 lg:px-10"
    >
      <Heading title={t("title")} className="mb-4 lg:mb-10 xl:mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16 xl:gap-36"
      >
        <div className="contact-info space-y-3 lg:space-y-8 xl:space-y-14 mb-3 lg:mb-0">
          <div className="header-info flex flex-col gap-1 lg:gap-4">
            <h3 className="text-base lg:text-2xl font-bold">{t("text")}</h3>
            <p className="text-sm lg:text-base xl:text-xl max-w-2xl font-medium">
              {t("description")}
            </p>
          </div>

          <div className="body-info space-y-3 lg:space-y-8 xl:space-y-14 ">
            <section>
              <h3 className="text-base lg:text-lg xl:text-2xl font-bold w-full">
                {t("visitUs")}
              </h3>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                style={{ transformOrigin: "left" }}
                className="h-px bg-black"
              />
              <p className="text-sm lg:text-base xl:text-xl font-medium mt-4">
                {t("address")}
              </p>
            </section>

            <section>
              <h3 className="text-base lg:text-lg xl:text-2xl font-bold w-full">
                {t("talkToUs")}
              </h3>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                style={{ transformOrigin: "left" }}
                className="h-px bg-black"
              />
              <div className="space-y-1 mt-4">
                <div className="flex justify-between items-start gap-4">
                  <ul className="flex flex-col gap-1">
                    {phones?.map((phone: Phone) => (
                      <li key={phone.id}>
                        <a
                          href={formatPhoneHref(phone.number)}
                          className="text-sm lg:text-base xl:text-xl font-medium hover:text-brand hover:translate-x-1 transition-all duration-300 block"
                        >
                          {phone.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="mailto:info@hebent.tech"
                  className="text-sm lg:text-base xl:text-xl hover:text-brand hover:translate-x-1 transition-all duration-300 block"
                >
                  info@hebent.tech
                </Link>
              </div>
            </section>
          </div>

          <div className="flex gap-6">
            {socialLinks?.map((item: SocialLink) => {
              const external = item.url.startsWith("http");
              return (
                <a
                  key={item.id}
                  href={item.url}
                  className="flex items-center justify-center max-w-44 min-w-38 capitalize text-sm  lg:text-base font-medium bg-white py-3 px-12 hover:text-white hover:bg-[#777D84] transition-all duration-300 border border-black"
                  aria-label={item.icon}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.icon}
                </a>
              );
            })}
          </div>
        </div>

        <form
          className="form-contact flex flex-col gap-8 lg:gap-10 "
          onSubmit={handleContactSubmit}
        >
          <div className="grid grid-cols-1 gap-8 lg:gap-10">
            <div className="flex flex-col border border-[#6B737A] relative">
              <label htmlFor="name" className="label-style">
                {t("name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={tPlaceHolder("name-placeholder")}
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-style focus:ring-1 focus:ring-[#253081] outline-none"
              />
            </div>
            <div className="flex flex-col border border-[#6B737A] relative">
              <label htmlFor="surname" className="label-style">
                {t("surname")}
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                placeholder={tPlaceHolder("surname-placeholder")}
                className="input-style focus:ring-1 focus:ring-[#253081] outline-none"
                autoComplete="family-name"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col border border-[#6B737A] relative">
            <label htmlFor="email" className="label-style">
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={"mail@example.com"}
              className="input-style focus:ring-1 focus:ring-[#253081] outline-none"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col border border-[#6B737A] relative">
            <label htmlFor="message" className="label-style">
              {t("comments")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="input-style focus:ring-1 focus:ring-[#253081] outline-none resize-none"
              autoComplete="off"
              placeholder={t("comments-placeholder")}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
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

            <div className="flex flex-col border border-[#6B737A] relative">
              <label htmlFor="captchaText" className="label-style">
                Captcha
              </label>
              <input
                id="captchaText"
                name="captchaText"
                value={formData.captchaText}
                type="text"
                onChange={handleChange}
                required
                placeholder={t("enterCaptcha-placeholder")}
                className="input-style focus:ring-1 focus:ring-[#253081] outline-none"
                autoComplete="off"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={sending}
            className={`text w-full py-2 lg:py-4 bg-[#253081] text-white font-bold rounded transition-colors uppercase tracking-widest text-sm flex items-center justify-center ${
              sending ? "cursor-wait py-0" : "hover:bg-[#253081]/80"
            }`}
          >
            {sending ? <Loading size="xs" className="white" /> : t("send")}
          </button>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </form>
      </motion.div>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t("successTitle")}
        message={t("successMessage")}
        closeLabel={t("close")}
        titleId="contact-success-title"
      />
    </motion.main>
  );
}
