import { setRequestLocale } from "next-intl/server";
import Header from "../components/Header/Header";
import VideoHero from "../components/sections/VideoHero";
// import ServicesSection from "../components/sections/ServicesSection";
import About from "../components/sections/About";
import ProjectsPreview from "../components/Projects/ProjectsPreview";
import Testimonials from "../components/sections/Testimonials";
import Footer from "../components/Footer/Footer";
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
        {/* <ServicesSection /> */}
        <AutoSwiper />
        <About />
        <ProjectsPreview />
        <Testimonials />
      </main>
    </>
  );
}
