import ApplicationForm from "@/app/components/careers/ApplicationForm";
import { useTranslations } from "next-intl";

export default function CareerPage() {
  const t = useTranslations("Careers");
  const points = [
    "Develop responsive and intuitive UI components using React.js and modern JavaScript (ES6+)",
    "Collaborate with product designers, backend engineers, and QA to deliver polished features",
    "Ensure cross-browser compatibility, accessibility (WCAG), and performance best practices",
    "Maintain and improve our front-end architecture and reusable component libraries",
    "Participate in code reviews, sprint planning, and technical discussions",
    "Continuously improve the user experience through experimentation and iteration",
  ];

  return (
    <main className="min-h-screen container mx-auto px-7 sm:px-10 lg:px-12 mt-30 lg:mt-50 xl:mt-60 mb-20 lg:mb-30">
      <div className="space-y-5 lg:space-y-16 xl:space-y-20">
        <h2 className="font-nexa text-xl lg:text-5xl font-bold tracking-tight">
          {t("aboutTheRole")}
        </h2>
        <p className="font-vox text-sm lg:text-2xl leading-relaxed">
          At Hebent Tech, we believe that great work starts with great people.
          We&apos;re always looking for passionate, talented, and driven
          individuals...
        </p>

        <h2 className="font-nexa text-xl lg:text-5xl font-bold tracking-tight">
          {t("whatYoullDo")}
        </h2>
        <ul className="list-disc space-y-2 mb-16 font-vox text-sm lg:text-2xl">
          {points.map((point, i) => (
            <li key={i} className="flex items-center gap-4 text-sm lg:text-2xl">
              <span className="w-2 h-2 bg-black shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-100" />

      {/* Форма */}
      <ApplicationForm />
    </main>
  );
}
