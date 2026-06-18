"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type Tag = "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";

interface TypingTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  animateOn?: "view" | "mount";
  as?: Tag;
  className?: string;
  style?: CSSProperties;
}

export default function TypingText({
  text,
  speed = 50,
  startDelay = 0,
  cursor = true,
  cursorChar = "|",
  cursorClassName = "",
  animateOn = "view",
  as = "span",
  className = "",
  style,
}: TypingTextProps) {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(animateOn === "mount");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (animateOn !== "view") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animateOn]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      i++;
      setDisplay(text.slice(0, i));
      if (i < text.length) {
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };

    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [started, text, speed, startDelay]);

  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
  };

  const children: ReactNode = (
    <>
      <span aria-hidden="true">{display}</span>
      {cursor && !done && (
        <span
          aria-hidden="true"
          className={`inline-block ml-0.5 animate-pulse ${cursorClassName}`}
        >
          {cursorChar}
        </span>
      )}
    </>
  );

  const commonProps = { className, style, "aria-label": text };

  switch (as) {
    case "h1":
      return <h1 ref={setRef} {...commonProps}>{children}</h1>;
    case "h2":
      return <h2 ref={setRef} {...commonProps}>{children}</h2>;
    case "h3":
      return <h3 ref={setRef} {...commonProps}>{children}</h3>;
    case "h4":
      return <h4 ref={setRef} {...commonProps}>{children}</h4>;
    case "p":
      return <p ref={setRef} {...commonProps}>{children}</p>;
    case "div":
      return <div ref={setRef} {...commonProps}>{children}</div>;
    default:
      return <span ref={setRef} {...commonProps}>{children}</span>;
  }
}
