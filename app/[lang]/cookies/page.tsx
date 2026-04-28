import React from "react";
import { useTranslations } from "next-intl";

// Типизация для структуры политики
interface CookieCategory {
  title: string;
  description: string;
}

const CookiesPolicyPage: React.FC = () => {
  const t = useTranslations("CookiesPolicy");
  const cookieCategories: CookieCategory[] = [
    {
      title: t("categories.0.title"),
      description: t("categories.0.description"),
    },
    {
      title: t("categories.1.title"),
      description: t("categories.1.description"),
    },
    {
      title: t("categories.2.title"),
      description: t("categories.2.description"),
    },
    {
      title: t("categories.3.title"),
      description: t("categories.3.description"),
    },
  ];
  return (
    <section className="min-h-screen container mx-auto my-28 md:my-32 lg:my-48 px-6 sm:px-12 text-black ">
      <div className="mx-auto flex flex-col gap-3 lg:gap-5">
        {/* Заголовок */}
        <h2 className="font-nexa text-5xl md:text-6xl font-bold tracking-tight">
          {t("title1")}
        </h2>

        {/* Вступление */}
        <p className="font-vox text-sm lg:text-2xl leading-relaxed">
          {t("description")}
        </p>

        {/* Секция: What types of cookies do we use? */}
        <div className="font-vox text-sm lg:text-2xl">
          <h3>{t("what")}</h3>
          <ul className="list-disc pl-5 space-y-2">
            {cookieCategories.map((item, index) => (
              <li key={index}>
                <span className="font-bold">{item.title} </span>
                <span className=" leading-relaxed">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Секция: Managing Cookies */}
        <div className="font-vox text-sm lg:text-2xl">
          <h2 className="text-xl lg:text-3xl font-bold mb-2">{t("title2")}</h2>
          <div className="space-y-1 leading-relaxed font-normal">
            <p>{t("p1")}</p>
            <p>
              {t("p2")}{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-gray-500 transition-colors"
              >
                www.allaboutcookies.org
              </a>{" "}
              .
            </p>
            <p>{t("p3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookiesPolicyPage;
