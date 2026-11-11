import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Background } from "@/components/ui/background";
import { Cursor } from "@/components/ui/cursor";
import { Loader } from "@/components/ui/loader";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { isContactConfigured, resumeHref } from "@/lib/server-config";

export default function Home() {
  const resume = resumeHref();

  return (
    <>
      <Loader />
      <Background />
      <Cursor />
      <Navbar resumeHref={resume} />
      <main id="main">
        <Hero resumeHref={resume} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Contact formEnabled={isContactConfigured()} />
      </main>
      <Footer />
    </>
  );
}
