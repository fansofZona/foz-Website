"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function ChartFrame({
  title,
  caption,
  source,
  children,
}: {
  title?: string;
  caption?: string;
  source?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-10">
      <Card className="gap-0 rounded-card border-[1.5px] border-hairline bg-surface px-4 py-6 ring-0 sm:px-8 sm:py-8">
        {title ? (
          <p className="mb-6 text-center font-sans text-subheading font-bold text-ink sm:text-left">
            {title}
          </p>
        ) : null}
        {children}
      </Card>
      {caption ? (
        <p className="mt-3 px-2 text-body-sm text-ink-muted">{caption}</p>
      ) : null}
      {source ? (
        <p className="mt-1 px-2 font-meta text-caption text-ink-muted">
          Source: {source}
        </p>
      ) : null}
    </figure>
  );
}

export function ChartTooltip({
  label,
  rows,
}: {
  label: string;
  rows: { name: string; value: string; color: string }[];
}) {
  return (
    <div className="pointer-events-none rounded-small border-[1.5px] border-hairline bg-surface px-4 py-3 shadow-sm">
      <p className="font-meta ledger-figures">
        {label}
      </p>
      <ul className="mt-2 space-y-1">
        {rows.map((r) => (
          <li
            key={r.name}
            className="flex items-center justify-between gap-6 text-body-sm text-ink"
          >
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-pill"
                style={{ backgroundColor: r.color }}
                aria-hidden
              />
              {r.name}
            </span>
            <span className="font-meta">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}