"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-4 sm:px-8">
        {/* The nav row sits inside a Limestone pill — a signature element. */}
        <nav className="flex items-center justify-between gap-4 rounded-pill bg-surface py-3 pl-6 pr-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/FoZ-logo.svg"
              alt="FANS of Zona logo"
              width={76}
              height={33}
              priority
              className="h-8 w-auto"
            />
            <span className="display-sm text-body font-bold leading-none text-ink">
              {site.name}
            </span>
          </Link>

          <div className="hidden items-center gap-[9px] md:flex">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-pill px-3 py-1 text-body transition-colors ${
                    active
                      ? "bg-surface-muted text-ink"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}

            <Separator
              orientation="vertical"
              className="rule-dotted-y mx-2 h-5 w-0 bg-transparent"
            />

            <Button
              asChild
              className="h-auto rounded-pill border-transparent bg-feature px-6 py-3 text-body font-normal text-chalk hover:opacity-85 focus-visible:ring-chalk/70"
            >
              <a href={`mailto:${site.email}`}>Join us</a>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-auto rounded-pill border-[1.5px] border-ink px-5 py-2 text-body font-normal text-ink hover:bg-ink hover:text-chalk focus-visible:ring-ink/70 md:hidden"
              >
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-4/5 gap-0 bg-surface p-6 text-ink sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle className="display-sm text-subheading text-ink">
                  FANS of Zona
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="border-b-[1.5px] border-dotted border-ink py-4 text-body text-ink-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-6 h-auto rounded-pill border-transparent bg-feature px-6 py-3 text-body font-normal text-chalk hover:opacity-85 focus-visible:ring-ink/70"
                >
                  <a href={`mailto:${site.email}`}>Join us</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}