"use client";

import type { ReactNode, MouseEvent } from "react";

type WeChatLinkProps = {
  className?: string;
  children: ReactNode;
  fallbackUrl?: string;
};

const WECHAT_DEEPLINK = "weixin://dl/chat";
const DEFAULT_FALLBACK = "https://weChat.com/";

export default function WeChatLink({
  className,
  children,
  fallbackUrl = DEFAULT_FALLBACK,
}: WeChatLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const start = Date.now();
    window.location.href = WECHAT_DEEPLINK;

    window.setTimeout(() => {
      // If app switch did not happen, user stayed in browser.
      if (Date.now() - start < 1600) {
        window.location.href = fallbackUrl;
      }
    }, 1200);
  };

  return (
    <a
      href={WECHAT_DEEPLINK}
      onClick={handleClick}
      className={className}
      aria-label="Open WeChat"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
