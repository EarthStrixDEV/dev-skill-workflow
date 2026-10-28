import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Skill Workflow",
  description:
    "แผนผัง workflow ของ skill สำหรับงานพัฒนาซอฟต์แวร์ · A skill workflow map for software development",
};

/*
 * Runs synchronously while the HTML is parsed, before first paint, so a saved
 * theme/language never flashes and React never sees a mismatch
 * (pattern from "Preventing flash before hydration" in the Next.js docs).
 * Defaults: light theme, Thai.
 */
const preferenceScript = `(function(){try{var d=document.documentElement;if(localStorage.getItem("theme")==="dark")d.classList.add("dark");var l=localStorage.getItem("lang");if(l==="en"||l==="th"){d.setAttribute("data-lang",l);d.setAttribute("lang",l)}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Font variables must sit on <html>: Tailwind's theme tokens resolve at :root.
    <html
      lang="th"
      data-lang="th"
      className={`${inter.variable} ${notoThai.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
