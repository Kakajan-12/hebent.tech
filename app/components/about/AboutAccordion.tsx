"use client";

import { useId, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export type AboutAccordionItem = {
  id: string;
  title: string;
  content: string;
};

type Props = {
  items: AboutAccordionItem[];
  defaultOpenId?: string | null;
};

export default function AboutAccordion({ items }: Props) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mt-5 lg:mt-10">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const triggerId = `${baseId}-${item.id}-trigger`;
        const isLast = index === items.length - 1;

        return (
          <div key={item.id} className={isLast ? "" : "border-b border-black"}>
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-2 py-1 lg:py-4 text-left transition-colors hover:bg-black/3 md:px-2"
              onClick={() =>
                setOpenId((current) => (current === item.id ? null : item.id))
              }
            >
              <span className=" text-xl font-bold uppercase tracking-tight md:text-xl lg:text-2xl">
                {item.title}
              </span>
              <span className="shrink-0" aria-hidden>
                {isOpen ? (
                  <FaChevronUp className="size-5 md:size-6" />
                ) : (
                  <FaChevronDown className="size-5 md:size-6" />
                )}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-2 pb-4 pt-0 text-sm lg:text-lg leading-relaxed text-slate-900 md:text-lg">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
