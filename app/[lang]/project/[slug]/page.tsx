import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  setRequestLocale(lang);

  return <main className="container mx-auto py-8 min-h-screen">{slug}</main>;
}
