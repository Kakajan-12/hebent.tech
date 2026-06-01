export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const MEDIA_ORIGIN = BASE_API_URL.replace(/\/$/, "");

function looksLikeMediaPath(s: string): boolean {
  const t = s.trim();
  return (
    /uploads\//i.test(t) ||
    /^https?:\/\//i.test(t) ||
    /\.(jpe?g|png|gif|webp|svg|bmp)(\?|#|$)/i.test(t)
  );
}
function findMediaPathDeep(raw: unknown, depth = 0): string {
  if (depth > 10 || raw == null) return "";
  if (typeof raw === "string") {
    const t = raw.trim();
    if (t && t !== "[object Object]" && looksLikeMediaPath(t)) return t;
    return "";
  }
  if (typeof raw !== "object") return "";
  if (Array.isArray(raw)) {
    for (const item of raw) {
      const p = findMediaPathDeep(item, depth + 1);
      if (p) return p;
    }
    return "";
  }
  for (const v of Object.values(raw as Record<string, unknown>)) {
    const p = findMediaPathDeep(v, depth + 1);
    if (p) return p;
  }
  return "";
}
export function extractUploadPathFromMedia(raw: unknown): string {
  if (raw == null) return "";
  if (typeof raw === "string") return raw.trim();
  if (typeof raw !== "object") return "";
  if (Array.isArray(raw)) {
    for (const item of raw) {
      const p = extractUploadPathFromMedia(item);
      if (p) return p;
    }
    return "";
  }
  const o = raw as Record<string, unknown>;
  for (const key of [
    "url",
    "path",
    "src",
    "href",
    "filename",
    "name",
  ] as const) {
    const v = o[key];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (v != null && typeof v === "object") {
      const nested = extractUploadPathFromMedia(v);
      if (nested) return nested;
    }
  }
  const data = o.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const d = data as Record<string, unknown>;
    if (typeof d.url === "string" && d.url.trim()) return d.url.trim();
    const nestedData = extractUploadPathFromMedia(d);
    if (nestedData) return nestedData;
    const attrs = d.attributes;
    if (attrs && typeof attrs === "object") {
      const u = (attrs as Record<string, unknown>).url;
      if (typeof u === "string" && u.trim()) return u.trim();
      const fromAttrs = extractUploadPathFromMedia(attrs);
      if (fromAttrs) return fromAttrs;
    }
  }
  const attrs = o.attributes;
  if (attrs && typeof attrs === "object") {
    const u = (attrs as Record<string, unknown>).url;
    if (typeof u === "string" && u.trim()) return u.trim();
    const fromAttrs = extractUploadPathFromMedia(attrs);
    if (fromAttrs) return fromAttrs;
  }
  const file = o.file;
  if (file != null) {
    const p = extractUploadPathFromMedia(file);
    if (p) return p;
  }
  for (const key of [
    "image",
    "logo",
    "thumbnail",
    "small",
    "medium",
    "large",
  ] as const) {
    const v = o[key];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (v != null && typeof v === "object") {
      const p = extractUploadPathFromMedia(v);
      if (p) return p;
    }
  }
  const deep = findMediaPathDeep(raw);
  return deep;
}
export function resolveMediaUrl(url: unknown): string {
  if (url == null || url === "") return "/default-image.png";
  if (typeof url !== "string") {
    const path = extractUploadPathFromMedia(url);
    if (!path) return "/default-image.png";
    return resolveMediaUrl(path);
  }
  let s = url.replace(/\\/g, "/").trim();
  if (!s) return "/default-image.png";
  if (s === "[object Object]" || s.includes("[object Object]")) {
    return "/default-image.png";
  }

  if (s.startsWith(".hebent.tech")) {
    s = `https://api${s}`;
  }
  if (
    s.startsWith("http://.hebent.tech") ||
    s.startsWith("https://.hebent.tech")
  ) {
    s = s
      .replace("http://.", "https://api.")
      .replace("https://.", "https://api.");
  }

  if (/^https?:\/\//i.test(s)) {
    if (s.includes("uploads/")) {
      const rest = s.split("uploads/")[1];
      return `${MEDIA_ORIGIN}/uploads/${rest}`;
    }
    return s;
  }

  if (s.startsWith("/app/uploads/")) {
    return `${MEDIA_ORIGIN}${s.slice("/app".length)}`;
  }
  if (s.startsWith("/uploads") || s.startsWith("/storage")) {
    return `${MEDIA_ORIGIN}${s}`;
  }
  if (s.startsWith("/")) {
    return s;
  }
  if (s.startsWith("uploads/")) {
    return `${MEDIA_ORIGIN}/${s}`;
  }
  return `${MEDIA_ORIGIN}/uploads/${s}`;
}
export function rewriteRichTextImgSrc(html: string): string {
  return html.replace(
    /(<img\b[^>]*\bsrc=)(["'])([^"']*)\2/gi,
    (full, before: string, quote: string, src: string) => {
      const t = src.trim();
      if (!t || /^https?:\/\//i.test(t) || t.startsWith("data:")) {
        return full;
      }
      return `${before}${quote}${resolveMediaUrl(t)}${quote}`;
    },
  );
}
