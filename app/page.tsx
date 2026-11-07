import { Nav } from "@/components/layout/Nav";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Journey } from "@/components/sections/Journey";
import { Velquix } from "@/components/sections/Velquix";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/site";
import { homeGraph } from "@/lib/seo/schema";

const title = "Atharva Sonar | AI Engineer, Full-Stack Developer & Founder";
const description =
  "Atharva Sonar is an AI Engineer, Full-Stack Developer and founder of Velquix, building AI-powered apps, SaaS and fintech products with Python, Django and React.";

export const metadata = pageMetadata({ title, description, path: "/", type: "profile" });

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph(title, description)} />
      <ScrollManager />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Velquix />
        <Contact />
      </main>
      <Footer />
      <AssistantWidget />
    </>
  );
}
