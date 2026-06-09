"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const SECTION_IDS = [
  "mission",
  "vision",
  "process",
  "technologies",
  "values",
] as const;

type SectionId = (typeof SECTION_IDS)[number];
type SectionStatus = "waiting" | "active" | "done";
type SectionPhase = "line" | "our" | "title" | "content" | "done";

const LINE_DURATION = 1;
const TYPING_CHAR_MS = 30;
const CONTENT_DURATION = 0.55;
const SECTION_PAUSE = 0.1;

function DiamondBullet() {
  return (
    <span className="mt-2 size-2 shrink-0 rotate-45 bg-brand" aria-hidden />
  );
}

function TypingText({
  text,
  active,
  done,
  onComplete,
  className,
}: {
  text: string;
  active: boolean;
  done: boolean;
  onComplete?: () => void;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (done || !active) return;

    let index = 0;
    const startFrame = window.requestAnimationFrame(() => setDisplayed(""));
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, TYPING_CHAR_MS);

    return () => {
      window.cancelAnimationFrame(startFrame);
      window.clearInterval(timer);
    };
  }, [text, active, done]);

  if (done) {
    return <span className={className}>{text}</span>;
  }

  const showCaret = active && displayed.length < text.length;

  return (
    <span className={className}>
      {displayed}
      {showCaret ? (
        <span
          className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-current align-middle"
          aria-hidden
        />
      ) : null}
    </span>
  );
}

function ProcessStep({ text }: { text: string }) {
  const [label, ...rest] = text.split(" — ");
  const description = rest.join(" — ");

  return (
    <li className="text-sm leading-relaxed lg:text-lg">
      <span className="font-bold">{label}</span>
      {description ? ` — ${description}` : null}
    </li>
  );
}

export default function AboutAccordion() {
  const t = useTranslations("About.accordion");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.12 });
  const [activeSection, setActiveSection] = useState(-1);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;
    const frame = window.requestAnimationFrame(() => setActiveSection(0));
    return () => window.cancelAnimationFrame(frame);
  }, [isInView]);

  const handleSectionComplete = useCallback(() => {
    setActiveSection((prev) =>
      prev < SECTION_IDS.length - 1 ? prev + 1 : prev,
    );
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-5 lg:px-10 xl:px-20"
    >
      {SECTION_IDS.map((id, index) => {
        const status: SectionStatus =
          index < activeSection
            ? "done"
            : index === activeSection
              ? "active"
              : "waiting";

        return (
          <SectionRow
            key={id}
            id={id}
            t={t}
            status={status}
            onComplete={handleSectionComplete}
          />
        );
      })}
    </motion.div>
  );
}

function SectionRow({
  id,
  t,
  status,
  onComplete,
}: {
  id: SectionId;
  t: ReturnType<typeof useTranslations<"About.accordion">>;
  status: SectionStatus;
  onComplete: () => void;
}) {
  const isDone = status === "done";
  const isActive = status === "active";
  const [phase, setPhase] = useState<SectionPhase>("line");
  const currentPhase: SectionPhase = isDone ? "done" : phase;

  useEffect(() => {
    if (!isActive) return;
    const frame = window.requestAnimationFrame(() => setPhase("line"));
    return () => window.cancelAnimationFrame(frame);
  }, [isActive, id]);

  const ourText = t(`${id}.our`);
  const titleText = t(`${id}.title`);

  return (
    <div className="flex flex-col gap-1 lg:gap-4">
      <motion.div
        initial={{ scaleX: 0, opacity: 0.35 }}
        animate={
          isDone || currentPhase !== "line"
            ? { scaleX: 1, opacity: 1 }
            : isActive
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0.35 }
        }
        transition={{
          duration: LINE_DURATION,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "left" }}
        onAnimationComplete={() => {
          if (isActive && currentPhase === "line") {
            setPhase("our");
          }
        }}
        className="h-px w-full bg-[#B5B6B7]"
      />

      <section
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-16 py-4 lg:py-10 transition-opacity duration-300 ${
          status === "waiting" ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={status === "waiting"}
      >
        <h3 className="uppercase tracking-tight flex flex-col min-h-18 lg:min-h-28">
          <TypingText
            text={ourText}
            active={isActive && currentPhase === "our"}
            done={
              isDone ||
              currentPhase === "title" ||
              currentPhase === "content" ||
              currentPhase === "done"
            }
            onComplete={() => setPhase("title")}
            className="font-light text-2xl lg:text-4xl"
          />
          <TypingText
            text={titleText}
            active={isActive && currentPhase === "title"}
            done={
              isDone || currentPhase === "content" || currentPhase === "done"
            }
            onComplete={() => setPhase("content")}
            className="font-bold text-4xl lg:text-6xl"
          />
        </h3>

        <SectionContent
          id={id}
          t={t}
          visible={
            isDone || currentPhase === "content" || currentPhase === "done"
          }
          notify={isActive}
          onRevealed={() => {
            setPhase("done");
            window.setTimeout(onComplete, SECTION_PAUSE * 1000);
          }}
        />
      </section>
    </div>
  );
}

function SectionContent({
  id,
  t,
  visible,
  notify,
  onRevealed,
}: {
  id: SectionId;
  t: ReturnType<typeof useTranslations<"About.accordion">>;
  visible: boolean;
  notify: boolean;
  onRevealed: () => void;
}) {
  const onRevealedRef = useRef(onRevealed);

  useEffect(() => {
    onRevealedRef.current = onRevealed;
  }, [onRevealed]);

  useEffect(() => {
    if (!visible || !notify) return;

    const timer = window.setTimeout(
      () => {
        onRevealedRef.current();
      },
      (CONTENT_DURATION + SECTION_PAUSE) * 1000,
    );

    return () => window.clearTimeout(timer);
  }, [visible, notify]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: CONTENT_DURATION,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="font-vox text-sm leading-relaxed lg:text-lg xl:text-xl font-bold"
    >
      {id === "process" ? (
        <ProcessContent t={t} />
      ) : id === "technologies" || id === "values" ? (
        <BulletListContent sectionId={id} t={t} />
      ) : (
        <p>{t(`${id}.content`)}</p>
      )}
    </motion.div>
  );
}

function ProcessContent({
  t,
}: {
  t: ReturnType<typeof useTranslations<"About.accordion">>;
}) {
  const steps = t.raw("process.steps") as string[];

  return (
    <div className="space-y-1 lg:space-y-4">
      <p>{t("process.intro")}</p>
      <ol className="list-decimal space-y-2 pl-5">
        {steps.map((step) => (
          <ProcessStep key={step} text={step} />
        ))}
      </ol>
    </div>
  );
}

function BulletListContent({
  sectionId,
  t,
}: {
  sectionId: "technologies" | "values";
  t: ReturnType<typeof useTranslations<"About.accordion">>;
}) {
  const items = t.raw(`${sectionId}.items`) as string[];

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <DiamondBullet />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
