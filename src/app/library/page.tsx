import type { Metadata } from "next";
import Link from "next/link";
import { libUi } from "@/content/libraryUi";
import TrueFocus from "@/components/react-bits/TrueFocus";
import { L, LR } from "@/components/ui/Lang";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { LibraryExplorer } from "@/components/library/LibraryExplorer";

export const metadata: Metadata = {
  title: "Skill Library · Dev Skill Workflow",
  description:
    "วิธีติดตั้ง skill และ command ที่ใช้ใน workflow งานพัฒนา · How to install the skills and commands used in the dev workflow",
};

export default function LibraryPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header current="library" />
      <main id="main" className="mx-auto max-w-7xl px-5 pt-10 pb-20 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          <span aria-hidden="true">←</span>
          <L v={libUi.back} />
        </Link>

        <div className="mt-6 max-w-3xl">
          <p className="mb-2 text-sm font-semibold tracking-wide text-brand">
            <L v={libUi.page.eyebrow} />
          </p>
          {/* TrueFocus renders a <div>, so the heading role goes on a div (not <h1>). */}
          <div
            role="heading"
            aria-level={1}
            className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl"
          >
            <LR v={libUi.page.title} block>
              {(t) => (
                <div className="[&>div]:justify-start! [&_span]:text-4xl! sm:[&_span]:text-5xl! [&_span]:font-bold!">
                  <TrueFocus
                    sentence={t}
                    blurAmount={1}
                    unfocusedOpacity={0.8}
                    borderColor="#8b5cf6"
                    animationDuration={0.5}
                    pauseBetweenAnimations={1.2}
                  />
                </div>
              )}
            </LR>
          </div>
          <p className="mt-4 text-base leading-relaxed text-muted">
            <L v={libUi.page.subtitle} />
          </p>
        </div>

        <LibraryExplorer />
      </main>
      <Footer />
    </>
  );
}
