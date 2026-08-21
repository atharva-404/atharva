"use client";

import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Nav } from "@/components/navigation/Nav";
import { Hero } from "@/components/hero/Hero";
import { Identity } from "@/components/sections/Identity";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { ProjectUniverse } from "@/components/sections/ProjectUniverse";
import { BuildLog } from "@/components/sections/BuildLog";
import { Skills } from "@/components/sections/Skills";
import { FounderSection, StartupLab } from "@/components/sections/FounderSection";
import { Hackathons } from "@/components/sections/Hackathons";
import { Learning } from "@/components/sections/Learning";
import { BuildEngine } from "@/components/3d/BuildEngine";
import { Terminal } from "@/components/sections/Terminal";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      {/* Global UI */}
      <CursorGlow />
      <ScrollProgress />
      <Nav />

      {/* Sections — scroll story */}
      <Hero />
      <Identity />
      <WhatIBuild />
      <FeaturedProject />
      <ProjectUniverse />
      <BuildLog />
      <Skills />
      <FounderSection />
      <StartupLab />
      <Hackathons />
      <Learning />
      <BuildEngine />
      <Terminal />
      <Contact />
      <Footer />
    </main>
  );
}
