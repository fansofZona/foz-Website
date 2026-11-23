import { ResearchVisual } from "@/components/research-visual";
import Link from "next/link";
import {
  PrimaryAnchor,
  SecondaryLink,
  Shell,
  StatCard,
} from "@/components/primitives";
import { site, stats, tracks } from "@/content/site";
import { getPosts } from "@/content/posts";

const tools = ["Python", "R", "SQL", "Git", "DuckDB", "Next.js"];

function getMixedWork() {
  const projects = getPosts("projects");
  const blogs = getPosts("blogs");
  const research = getPosts("research");
  const mixed = [];
  const rounds = Math.max(projects.length, blogs.length, research.length);
  for (let i = 0; i < rounds; i++) {
    if (projects[i]) mixed.push(projects[i]);
    if (blogs[i]) mixed.push(blogs[i]);
    if (research[i]) mixed.push(research[i]);
  }
  return mixed;
}

export default function Home() {
  const mixed = getMixedWork();

  return (
    <>
      <section className="home-hero">
        <Shell>
          <div className="season-line"><span>Fall 2026, week 6. Three sports in the lab.</span><span>Tucson, Ariz. Meetings Thursdays.</span></div>
          <div className="home-hero-grid">
            <div>
              <h1 className="display-lead">Argue about sports. Show your work.</h1>
              <p className="hero-deck">Student-built sports analytics at the University of Arizona.</p>
              <div className="hero-actions">
                <PrimaryAnchor href="/projects">Read the latest report</PrimaryAnchor>
                <SecondaryLink href="/about">Come to a meeting</SecondaryLink>
              </div>
            </div>
            <div className="research-feature">
              <div><p>Soccer / Research report / 2026</p><h2 className="mt-4">Expected Threat in College Soccer</h2></div>
              <ResearchVisual />
              <div className="flex justify-between gap-4"><p>From the published xT model</p><Link href="/projects/expected-threat-college-soccer">Read the research</Link></div>
            </div>
          </div>
        </Shell>
      </section>

      <section className="home-section">
        <Shell>
          <div className="section-heading"><h2>Fresh off the whiteboard</h2><SecondaryLink href="/projects">All projects</SecondaryLink></div>
          <p className="mt-6 max-w-xl text-body text-ink-muted">A rolling mix of projects, blog notes, and research.</p>
          <div className="publication-list">
            {mixed.map(p => (
              <article key={p.meta.href} className="publication-item">
                <Link href={p.meta.href} className="block">
                  <div className="publication-meta"><span>{p.meta.kind}</span><span>{p.meta.sport}</span><span>{p.meta.year}</span></div>
                  <h3>{p.meta.title}</h3><p>{p.meta.description}</p>
                </Link>
              </article>
            ))}
          </div>
        </Shell>
      </section>
      <section className="club-band">
        <Shell>
          <div className="club-band-grid"><h2>Sports analytics, built by students.</h2><p>{site.name} is a student club at the University of Arizona. We collect the play-by-play, build the model, and publish the code so the next person can prove us wrong.</p></div>
          <div className="club-stats">{stats.map(s => <StatCard key={s.label} value={s.value} label={s.label}/>)}</div>
        </Shell>
      </section>
      <section className="home-section">
        <Shell>
          <div className="section-heading"><h2>Three desks, one deadline</h2></div>
          <div className="track-list">{tracks.map(t => <div className="track-row" key={t.title}><h3>{t.title}</h3><p>{t.body}</p></div>)}</div>
          <p className="tools-line">We build with {tools.slice(0,-1).join(", ")} and {tools[tools.length-1]}. New members learn the stack on a real dataset in the first month.</p>
        </Shell>
      </section>
      <section className="join-section">
        <Shell><div className="join-layout"><h2>No prior experience required</h2><div><p>We run a beginner track every fall that takes you from a blank notebook to a published chart.</p><div className="hero-actions"><PrimaryAnchor href={`mailto:${site.email}`}>Email the club</PrimaryAnchor><SecondaryLink href="/about">More about the club</SecondaryLink></div></div></div></Shell>
      </section>
    </>
  );
}
