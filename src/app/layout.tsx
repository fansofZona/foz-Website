import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/*
  Report + box score: a reading serif paired with a data mono.

  Libron (display and body) is a hand-tuned Readerly revision — large x-height,
  open counters, tuned for sustained reading rather than a glance. It carries
  both the poster headlines and the body copy; the two are separated by weight
  (light at display sizes, bold at heading sizes), not by family.

  Fira Code (meta) is a monospace with programming ligatures. It owns every
  figure, axis label, and code block — the box-score half of the design.
*/
const libron = localFont({
  src: [
    { path: "./fonts/libron/Libron-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/libron/Libron-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/libron/Libron-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/libron/Libron-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  // Serif fallback metrics, so the swap doesn't reflow the page.
  adjustFontFallback: "Times New Roman",
  variable: "--font-libron",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
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
      className={cn(libron.variable, firaCode.variable, "font-sans")}
    >
      <body className="flex min-h-screen flex-col bg-canvas text-ink">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
