import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { SkillBand } from "@/components/sections/SkillBand";
import { Explorer } from "@/components/sections/Explorer";
import { Overview } from "@/components/sections/Overview";
import { Sizes } from "@/components/sections/Sizes";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <SkillBand />
        <Explorer />
        <Overview />
        <Sizes />
      </main>
      <Footer />
    </>
  );
}
