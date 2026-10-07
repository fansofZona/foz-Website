import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile above this folder is ignored.
  turbopack: { root: path.resolve(__dirname) },
  // Allow .mdx files to be imported anywhere in the app (content pipeline).
  pageExtensions: ["mdx", "md", "js", "jsx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);