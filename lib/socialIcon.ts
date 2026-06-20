import type { IconType } from "react-icons";
import {
  FaTelegram,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaFacebookF,
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedin,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaReddit,
  FaSnapchat,
  FaDiscord,
  FaVk,
  FaViber,
  FaSkype,
  FaGithub,
  FaThreads,
  FaXTwitter,
  FaGlobe,
} from "react-icons/fa6";
import { IoLogoWechat } from "react-icons/io5";
import { SiOdnoklassniki } from "react-icons/si";

const iconMap: Record<string, IconType> = {
  telegram: FaTelegram,
  tg: FaTelegram,
  whatsapp: FaWhatsapp,
  wa: FaWhatsapp,
  instagram: FaInstagram,
  ig: FaInstagram,
  facebook: FaFacebook,
  fb: FaFacebookF,
  messenger: FaFacebookMessenger,
  twitter: FaTwitter,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  "linkedin-in": FaLinkedinIn,
  youtube: FaYoutube,
  yt: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  reddit: FaReddit,
  snapchat: FaSnapchat,
  discord: FaDiscord,
  vk: FaVk,
  viber: FaViber,
  skype: FaSkype,
  github: FaGithub,
  threads: FaThreads,
  wechat: IoLogoWechat,
  weixin: IoLogoWechat,
  ok: SiOdnoklassniki,
  odnoklassniki: SiOdnoklassniki,
};

export function getSocialIcon(icon: string | null | undefined): IconType {
  if (!icon) return FaGlobe;
  const key = icon.trim().toLowerCase().replace(/\s+/g, "-");
  return iconMap[key] ?? FaGlobe;
}

// Normalizes a social link URL so it always works as an external link.
// API values may omit the protocol (e.g. "t.me/davud3108"), which the browser
// would otherwise treat as a relative path and break the link.
export function normalizeSocialUrl(url: string | null | undefined): string {
  const value = (url ?? "").trim();
  if (!value) return "";
  // Already has a scheme (https://, weixin://, tel:, mailto:, etc.)
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return value;
  return `https://${value.replace(/^\/+/, "")}`;
}
