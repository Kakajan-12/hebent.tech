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
      <div className="container mx-auto px-5 lg:px-10 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          <h2 className="text-3xl font-vox font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="max-w-2xl font-vox text-base text-slate-500 md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-5 lg:mt-10">
          {products.map((product, index) => {
            const number = `/0.${index + 1}`;
            const content = (
              <article className="group relative grid grid-cols-1 items-center gap-4 py-4 lg:py-8 transition-colors duration-300 md:grid-cols-2 md:gap-6 md:py-10">
                <div className="col-span-full h-px w-full origin-left scale-x-100 bg-black lg:scale-x-0 lg:transition-transform lg:duration-700 lg:ease-out lg:group-hover:scale-x-100 lg:group-hover:delay-150" />
                <div className="flex flex-col gap-6">
                  <p className="font-vox text-lg leading-snug lg:text-xl lg:max-w-xs">
                    {product.desc}
                  </p>
                  <span className="hidden lg:block font-vox text-sm text-slate-400 ">
                    {number}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-vox text-4xl font-bold tracking-tight transition-transform duration-500 ease group-hover:translate-x-3 sm:text-5xl md:text-6xl lg:text-7xl">
                    {product.label}
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
