import { setRequestLocale } from "next-intl/server";
import Video from "../components/sections/Video";
import About from "../components/sections/About";
import Products from "../components/sections/Products";
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
      <main className="flex-1 min-w-screen ">
        <section className="h-screen -mt-32 lg:-mt-42">
          <Video />
        </section>
        <AutoSwiper />
        <About showTitle={false} />
        <Products />
        <ProjectsPreview />
        <Testimonials />
      </main>
    </>
  );
}
