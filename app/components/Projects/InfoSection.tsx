import React from "react";

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  details?: string[];
}

const features: FeatureItem[] = [
  {
    id: "01",
    number: "[0.1]",
    title: "Digital Vision",
    description:
      "The project reimagines airport infrastructure as a fully interactive virtual ecosystem. The 3D Digital Twin mirrors terminals, runways, engineering systems, and operational flows in real time.",
  },
  {
    id: "02",
    number: "[0.2]",
    title: "System Complexity",
    description:
      "Ashgabat International Airport operates as a high-intensity environment where precision and timing are critical. Integrating architectural documentation and engineering data.",
  },
  {
    id: "03",
    number: "[0.3]",
    title: "Operational Impact",
    description:
      "The platform provides advanced monitoring and analytical capabilities within a centralized interface.",
    details: [
      "Real-time 3D visualization",
      "Infrastructure performance tracking",
      "Predictive maintenance analytics",
      "Scenario modeling and operational simulations",
    ],
  },
];

export const InfoSection: React.FC = () => {
  return (
    <section className="container mx-auto mt-138 xl:mt-160 min-h-screen py-20 px-10 font-sans text-black">
      <div className="max-w-7xl mx-auto space-y-24">
        {features.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            {/* Левая колонка: Заголовок и номер */}
            <div className="md:col-span-5 border-t border-gray-300 pt-4">
              <span className="text-xs text-gray-400 font-mono block mb-4">
                {item.number}
              </span>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight leading-tight">
                {item.title}
              </h2>
            </div>

            {/* Правая колонка: Описание и список */}
            <div className="md:col-span-7 pt-4">
              <p className="text-lg leading-relaxed mb-8 max-w-2xl">
                {item.description}
              </p>

              {item.details && (
                <div className="bg-gray-200/50 rounded-2xl p-8 max-w-2xl">
                  <h4 className="font-semibold mb-4">Core features include:</h4>
                  <ul className="space-y-3">
                    {item.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
