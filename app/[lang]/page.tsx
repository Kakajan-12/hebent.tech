import { setRequestLocale } from "next-intl/server";
import Video from "../components/sections/Video";
import About from "../components/sections/About";
import ProjectsPreview from "../components/Projects/ProjectsPreview";
import Testimonials from "../components/sections/Testimonials";
import { AutoSwiper } from "../components/sections/AutoSwiper";
type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);

  return (
    <>
      <main className="flex-1">
        <section className="h-screen">
          <Video />
        </section>
        <AutoSwiper />
        <About />
        <ProjectsPreview />
        <Testimonials />
      </main>
    </>
  );
}
