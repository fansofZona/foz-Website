import Link from "next/link";
import { site } from "@/content/site";
import { JoinForm } from "@/components/join-form";
import { Shell } from "@/components/primitives";
const pages = [{href:"/",label:"Home"},{href:"/projects",label:"Projects"},{href:"/blogs",label:"Blog"},{href:"/research",label:"Research"},{href:"/about",label:"About"}];
export function SiteFooter() {
  return <footer className="site-footer"><Shell>
    <div className="footer-top">
      <div><h2>Meetings are open. Bring a question.</h2><p>One email a month: what the project teams shipped, when we meet, and what we still can&apos;t explain.</p></div>
      <div className="flex flex-col justify-center"><JoinForm/><p className="mt-3 text-body-sm text-cloud">Opens your email app to contact the club.</p></div>
    </div>
    <div className="footer-bottom">
      <div><div className="footer-wordmark">{site.name}</div><p className="mt-3 max-w-sm">{site.blurb}</p></div>
      <div><p>Pages</p><ul>{pages.map(l=><li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul></div>
      <div><p>Elsewhere</p><ul>{site.socials.map(s=><li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}<li><a href={`mailto:${site.email}`}>Email</a></li></ul></div>
    </div>
    <div className="footer-legal"><p>© {new Date().getFullYear()} {site.name}. A student organization.</p><p>Code and data published openly.</p></div>
  </Shell></footer>;
}
