import { getTranslations } from "next-intl/server";

export default async function VideoHero() {
  const t = await getTranslations("VideoHero");
  return (
    <section className="relative flex h-screen items-center justify-center bg-slate-100">
      <div className="absolute inset-0 from-slate-200/80 via-slate-100 to-slate-50" />
      <h1 className="relative text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
        {t("title")}
      </h1>
    </section>
  );
}
