import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/*
  Luciole (display, body and meta) is a typeface developed explicitly for
  visually impaired readers — https://luciole-vision.com/en/math.html
  Large x-height, open counters, highly differentiated figures.

  Luciole Math carries numbers, tabular figures and scientific symbols
  (xT, stats, ledger figures) with the same legibility DNA.
*/
const luciole = localFont({
  src: [
    { path: "./fonts/luciole/Luciole-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/luciole/Luciole-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/luciole/Luciole-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/luciole/Luciole-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-luciole",
});

const lucioleMath = localFont({
  src: [{ path: "./fonts/luciole/Luciole-Math.otf", weight: "400", style: "normal" }],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-luciole-math",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.blurb,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(luciole.variable, lucioleMath.variable, "font-sans")}
    >
      <body className="flex min-h-screen flex-col bg-canvas text-ink">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
