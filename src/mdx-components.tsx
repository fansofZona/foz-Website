import type { MDXComponents } from "mdx/types";
import {
  BarChart,
  DonutChart,
  LineChart,
  ScatterPlot,
} from "@/components/charts";

/*
  Global MDX component map.

  `@next/mdx` injects these into every `.mdx` file we import, so content
  authors can drop in the D3 chart components (`<LineChart />`, `<BarChart />`,
  `<ScatterPlot />`, `<DonutChart />`) or any markdown shorthand without an
  import statement. Built-in tags are styled to match the site's typography.
*/

const components: MDXComponents = {
  // --- Markdown elements -------------------------------------------------
  h1: ({ children }) => (
    <h1 className="display-sm mt-10 text-heading text-ink">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="display-sm mb-6 mt-12 text-heading text-ink">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="display-sm mb-4 mt-10 text-subheading text-ink">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-5 text-body leading-[1.75] text-ink">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="font-medium text-ink underline decoration-feature decoration-2 underline-offset-4 transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-body text-ink marker:text-feature">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-body text-ink marker:text-feature">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-[1.7]">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-[3px] border-feature bg-surface-muted px-6 py-4 text-body-lg text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="rule-dotted-x my-10 border-0" />,
  code: ({ children }) => (
    <code className="rounded-small bg-surface-muted px-1.5 py-0.5 font-meta text-body-sm text-ink">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-card bg-plasma px-6 py-5 font-meta text-body-sm leading-[1.6] text-chalk">
      {children}
    </pre>
  ),

  // --- D3 chart components -------------------------------------------------
  LineChart,
  BarChart,
  ScatterPlot,
  DonutChart,
};

export function useMDXComponents(): MDXComponents {
  return components;
}