import { useEffect, useState } from "react";

/**
 * Extracts the most prominent, saturated color from an image (e.g. a project
 * logo) so UI accents can adapt per project. Falls back to `fallback` when the
 * image can't be read (CORS-tainted canvas, load error, or no src).
 */
export default function useDominantColor(
  src: string | null | undefined,
  fallback = "#333333",
): string {
  // Store the extracted color alongside the src it was computed from, so a
  // stale color is never shown while a new image is still loading. setState is
  // only ever called from async img callbacks (never synchronously in the
  // effect body), which avoids the react-hooks/set-state-in-effect warning.
  const [resolved, setResolved] = useState<{ src: string; color: string }>();

  useEffect(() => {
    if (!src) return;

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      try {
        const size = 48;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        let best = { r: 0, g: 0, b: 0, score: -1 };
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 200) continue;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;

          // Skip near-white, near-black and washed-out grey pixels.
          if (max > 240 && saturation < 0.15) continue;
          if (max < 25) continue;

          sumR += r;
          sumG += g;
          sumB += b;
          count++;

          // Prefer vivid, mid-to-dark colors (matches logo brand colors).
          const score = saturation * (max - min);
          if (score > best.score) {
            best = { r, g, b, score };
          }
        }

        if (cancelled) return;

        if (best.score > 0) {
          setResolved({ src, color: rgbToHex(best.r, best.g, best.b) });
        } else if (count > 0) {
          setResolved({
            src,
            color: rgbToHex(sumR / count, sumG / count, sumB / count),
          });
        } else {
          setResolved({ src, color: fallback });
        }
      } catch {
        if (!cancelled) setResolved({ src, color: fallback });
      }
    };

    img.onerror = () => {
      if (!cancelled) setResolved({ src, color: fallback });
    };

    return () => {
      cancelled = true;
    };
  }, [src, fallback]);

  // Only trust the resolved color when it matches the current src; otherwise
  // (no src, or a new image still loading) fall back without flashing a stale
  // project's color.
  return resolved && resolved.src === src ? resolved.color : fallback;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => Math.round(v).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
