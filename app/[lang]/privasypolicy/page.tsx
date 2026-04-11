import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
interface PrivacySection {
  title: string;
  content: React.ReactNode;
}

const PrivacyPolicyPage: React.FC = () => {
  const t = useTranslations("PrivacyPolicy");
  // Данные можно вынести в отдельный конфиг или файл локализации
  const sections: PrivacySection[] = [
    {
      title: "1. Information We Collect",
      content: (
        <div className="space-y-4">
          <p>We may collect the following types of information:</p>
          <div>
            <h4 className="font-bold text-slate-900">Personal Information:</h4>
            <p>
              When you contact us, apply for a job, or use our services, you may
              provide personal details such as your name, email address, phone
              number, or resume.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Usage Data:</h4>
            <p>
              We may collect data about how you interact with our website,
              including IP address, browser type, pages visited, time spent on
              pages, and referring websites.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900">
              Cookies and Tracking Technologies:
            </h4>
            <p>
              We use cookies and similar technologies to improve your
              experience, analyze usage patterns, and personalize content. You
              can control cookie preferences in your browser settings.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p>We use your data to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide and improve our services</li>
            <li>
              Communicate with you (e.g., responses, updates, newsletters)
            </li>
            <li>Process job applications</li>
            <li>Analyze website performance and user behavior</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="font-medium text-slate-900 mt-4">
            We will never sell or rent your personal information to third
            parties.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="min-h-screen container mx-auto my-28 md:my-32 lg:my-48 px-6 sm:px-12 text-black">
      <div className="mx-auto flex flex-col">
        {/* Заголовок */}
        <h2 className="font-nexa text-5xl md:text-6xl font-bold tracking-tight mb-6 lg:mb-12">
          Privacy Policy
        </h2>

        {/* Вступление */}
        <p className="mb-6 lg:mb-16 text-sm lg:text-xl font-vox leading-relaxed">
          At Hebent Tech, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and protect the personal
          information you provide to us when you use our website
          <Link
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-gray-500 transition-colors"
          >
            {" "}
            yourwebsite.com{" "}
          </Link>
          {t("description1_2")}
        </p>

        {/* Секции */}
        <div className="space-y-6 lg:space-y-10">
          {sections.map((section, index) => (
            <section key={index} className="font-vox text-sm lg:text-xl pt-4">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                {section.title}
              </h2>
              <div className="leading-relaxed text-sm lg:text-xl">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
