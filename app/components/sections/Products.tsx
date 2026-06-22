"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { HiArrowUpRight } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";

type Product = {
  href: string;
  label: string;
  desc: string;
  external: boolean;
};

export default function Products() {
  const tNav = useTranslations("Nav");
  const t = useTranslations("Products");

  const products: Product[] = [
    {
      href: "https://travel-tech.hebent.tech",
      label: tNav("travel").trim(),
      desc: t("travelDesc"),
      external: true,
    },
    {
      href: "https://logtech.hebent.tech",
      label: tNav("logistics").trim(),
      desc: t("logisticsDesc"),
      external: true,
    },
    {
      href: "/products/eventtech",
      label: tNav("events").trim(),
      desc: t("eventsDesc"),
      external: false,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 md:py-20"
    >
      <div className="container mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          <h2 className="text-3xl font-vox font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="text-base text-[#3D6196] md:text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="mt-5">
          {products.map((product, index) => {
            const number = `/0.${index + 1}`;
            const content = (
              <article className="group relative grid grid-cols-1 items-center gap-x-4 py-4 lg:py-8 transition-colors duration-300 md:grid-cols-2 md:gap-x-8 xl:gap-x-22 md:py-10">
                <div className="col-span-full h-px w-full origin-left scale-x-100 bg-black lg:scale-x-0 lg:transition-transform lg:duration-700 lg:ease-out lg:group-hover:scale-x-100 lg:group-hover:delay-150 mb-4" />
                <div className="flex flex-col gap-6">
                  <p className="text-lg leading-snug lg:text-xl lg:max-w-xs">
                    {product.desc}
                  </p>
                  <span className="hidden lg:block font-vox text-sm text-[#717182] ">
                    {number}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 font-vox">
                  <h3 className="text-left text-4xl text-[#0A0A0A]  font-bold tracking-tight transition-transform duration-500 ease group-hover:translate-x-3 sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
                    {(() => {
                      const words = product.label.split(/\s+/);
                      return (
                        <>
                          {words.slice(0, 2).join(" ")}
                          {words.length > 2 && (
                            <>
                              <br />
                              {words.slice(2).join(" ")}
                            </>
                          )}
                        </>
                      );
                    })()}
                  </h3>
                  <HiArrowUpRight
                    aria-hidden
                    className="size-7 shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-9"
                  />
                </div>
              </article>
            );

            const cardClass = "block";

            return (
              <motion.div
                key={product.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.1 + index * 0.1,
                }}
              >
                {product.external ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={product.href} className={cardClass}>
                    {content}
                  </Link>
                )}
              </motion.div>
            );
          })}
          {/* <div className="border-t border-slate-200" /> */}
        </div>
      </div>
    </motion.section>
  );
}
