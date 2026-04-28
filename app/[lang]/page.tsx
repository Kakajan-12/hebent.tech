import { setRequestLocale } from "next-intl/server";
import VideoHero from "../components/sections/VideoHero";
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
      <main className="flex-1 bg-background-main">
        <VideoHero />
        <AutoSwiper />
        <About />
        {/* <ProjectsPreview /> */}
        {/* <Testimonials /> */}
      </main>
    </>
  );
}
