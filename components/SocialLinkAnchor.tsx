import { SocialLink } from "@/app/Interfaces/interfaces";
import { normalizeSocialUrl } from "@/lib/socialIcon";

type SocialLinkAnchorProps = {
  item: SocialLink;
  className?: string;
};

export default function SocialLinkAnchor({
  item,
  className,
}: SocialLinkAnchorProps) {
  const href = normalizeSocialUrl(item.url);
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={className}
      aria-label={item.icon}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {item.icon}
    </a>
  );
}
