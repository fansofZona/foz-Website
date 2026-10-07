import type { ComponentType } from "react";

import * as expectedThreat from "./projects/expected-threat-college-soccer.mdx";
import * as fourthDownBot from "./projects/fourth-down-bot.mdx";
import * as shotQualityRebounds from "./projects/shot-quality-rebounds.mdx";
import * as pitchTunneling from "./projects/pitch-tunneling.mdx";
import * as transferPortalGraph from "./projects/transfer-portal-graph.mdx";
import * as volleyballRotationValue from "./projects/volleyball-rotation-value.mdx";
import * as marathonPacing from "./projects/marathon-pacing.mdx";
import * as scoutingScraper from "./projects/scouting-scraper.mdx";

import * as makingChartsPhoneScreen from "./blogs/making-charts-phone-screen.mdx";
import * as transferPortalNotes from "./blogs/transfer-portal-notes.mdx";
import * as smallSamples from "./blogs/small-samples-not-nothing.mdx";

import * as expectedThreatMethodology from "./research/expected-threat-methodology.mdx";
import * as reboundingShrinkage from "./research/rebounding-shrinkage.mdx";
import * as rotationMarkov from "./research/rotation-markov-methodology.mdx";

import type {
  MdxModule,
  PostCollection,
  PostMeta,
} from "./types";

export type { PostMeta, PostCollection } from "./types";
export { COLLECTION_INFO } from "./types";

export type PostRecord = {
  slug: string;
  collection: PostCollection;
  meta: PostMeta;
  Module: ComponentType<Record<string, unknown>>;
};

type PostEntry = {
  slug: string;
  module: MdxModule;
};

const DIR: Record<PostCollection, PostEntry[]> = {
  projects: [
    { slug: "expected-threat-college-soccer", module: expectedThreat },
    { slug: "fourth-down-bot", module: fourthDownBot },
    { slug: "shot-quality-rebounds", module: shotQualityRebounds },
    { slug: "pitch-tunneling", module: pitchTunneling },
    { slug: "transfer-portal-graph", module: transferPortalGraph },
    { slug: "volleyball-rotation-value", module: volleyballRotationValue },
    { slug: "marathon-pacing", module: marathonPacing },
    { slug: "scouting-scraper", module: scoutingScraper },
  ],
  blogs: [
    { slug: "making-charts-phone-screen", module: makingChartsPhoneScreen },
    { slug: "transfer-portal-notes", module: transferPortalNotes },
    { slug: "small-samples-not-nothing", module: smallSamples },
  ],
  research: [
    { slug: "expected-threat-methodology", module: expectedThreatMethodology },
    { slug: "rebounding-shrinkage", module: reboundingShrinkage },
    { slug: "rotation-markov-methodology", module: rotationMarkov },
  ],
};

function toRecord(collection: PostCollection, entry: PostEntry): PostRecord {
  const { module } = entry;
  return {
    slug: entry.slug,
    collection,
    meta: {
      ...module.metadata,
      slug: entry.slug,
      collection,
      href: `/${collection}/${entry.slug}`,
    },
    Module: module.default,
  };
}

const records = Object.fromEntries(
  (Object.keys(DIR) as PostCollection[]).map((collection) => [
    collection,
    DIR[collection].map((e) => toRecord(collection, e)),
  ]),
) as Record<PostCollection, PostRecord[]>;

export function getPosts(collection: PostCollection): PostRecord[] {
  return [...records[collection]].sort(
    (a, b) => Number(b.meta.year) - Number(a.meta.year),
  );
}

export function getAllPosts(): PostRecord[] {
  return (["projects", "blogs", "research"] as PostCollection[]).flatMap(
    (c) => getPosts(c),
  );
}

export function getFeatured(): PostRecord[] {
  return getAllPosts().filter((p) => p.meta.featured);
}

export function getPost(
  collection: PostCollection,
  slug: string,
): PostRecord | undefined {
  return records[collection].find((p) => p.slug === slug);
}

export function getSlugs(collection: PostCollection): string[] {
  return records[collection].map((p) => p.slug);
}

export function getAdjacent(
  collection: PostCollection,
  slug: string,
): { prev?: PostRecord; next?: PostRecord } {
  const list = getPosts(collection);
  const idx = list.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: list[idx + 1],
    next: list[idx - 1],
  };
}