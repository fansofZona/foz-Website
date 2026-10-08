import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/*
  Libron (display and headings) is a hand-tuned serif for headlines and
  large display sizes. Carries the poster headlines with elegant proportions.

  Source Sans Pro (body and meta) is a clean, readable sans-serif for body
  copy, figures, and metadata. Provides excellent readability on all sizes.
*/
const libron = localFont({
  src: [
    { path: "./fonts/libron/Libron-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/libron/Libron-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/libron/Libron-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/libron/Libron-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
  variable: "--font-libron",
});

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600", "700"],
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
      className={cn(libron.variable, sourceSansPro.variable, "font-sans")}
    >
      <body className="flex min-h-screen flex-col bg-canvas text-ink">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
