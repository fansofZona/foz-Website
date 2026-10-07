import Link from "next/link";
import { site } from "@/content/site";
import { JoinForm } from "@/components/join-form";
import { Shell } from "@/components/primitives";

const pages = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export function SiteFooter() {
  return (
    <footer className="pb-5 pt-10 sm:pb-6">
      <Shell>
        <div className="relative overflow-hidden rounded-medium bg-plasma p-6 sm:p-8">
          <div className="halftone-dots pointer-events-none absolute inset-0 opacity-30" />

          <div className="relative">
            <h2 className="display-xl max-w-2xl text-heading text-chalk">
              Meetings are open. Bring a question.
            </h2>
            <p className="mt-3 max-w-lg text-body-sm text-chalk/80">
              One email a month: what the project teams shipped, when we
              meet, and what we still can&apos;t explain.
            </p>

            <div className="mt-6">
              <JoinForm />
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <p className="display-sm text-body font-bold text-chalk">
                  {site.name}
                </p>
                <p className="mt-2 max-w-sm text-body-sm text-chalk/70">
                  {site.blurb}
                </p>
              </div>

              <div>
                <p className="text-body-sm text-chalk/60">Pages</p>
                <ul className="mt-3 space-y-1.5">
                  {pages.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-body-sm text-chalk/80 transition-colors hover:text-chalk"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-body-sm text-chalk/60">Elsewhere</p>
                <ul className="mt-3 space-y-1.5">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-body-sm text-chalk/80 transition-colors hover:text-chalk"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-body-sm text-chalk/80 transition-colors hover:text-chalk"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-1 border-t border-dotted border-chalk/40 pt-4 text-caption text-chalk/60 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} {site.name}. A student
                organization.
              </p>
              <p>Code and data published openly.</p>
            </div>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
