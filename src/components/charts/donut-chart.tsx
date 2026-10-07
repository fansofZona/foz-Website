"use client";

import { useState } from "react";
import * as d3 from "d3";
import { ChartFrame } from "./frame";
import { Button } from "@/components/ui/button";
import {
  AXIS_STYLE,
  GRID,
  colorFor,
  type ChartColor,
} from "./chart-utils";

export type DonutDatum = { label: string; value: number };

const H = 380;
const W = 800;
const CX = 230;
const CY = H / 2;
const R = 130;

export function DonutChart({
  data,
  unit = "",
  title,
  caption,
  source,
  height = H,
  color,
}: {
  data: DonutDatum[];
  unit?: string;
  title?: string;
  caption?: string;
  source?: string;
  height?: number;
  color?: ChartColor;
}) {
  const [active, setActive] = useState<number | null>(null);
  const total = d3.sum(data, (d) => d.value) || 1;

  const pie = d3
    .pie<DonutDatum>()
    .sort(null)
    .value((d) => d.value);
  const arcs = pie(data);

  const formatPct = d3.format(".1%");

  const hovered = active === null ? null : arcs[active];

  if (data.length === 0) return null;

  return (
    <ChartFrame title={title} caption={caption} source={source}>
      <div
        className="flex flex-col items-center gap-10 sm:flex-row"
        style={{ height }}
      >
        <div className="relative w-full max-w-[420px] flex-1">
          <svg viewBox={`0 0 ${W} ${height}`} className="h-auto w-full">
            <g transform={`translate(${CX},${CY})`}>
              {arcs.map((a, i) => {
                const lit = i === active;
                const d = d3
                  .arc<d3.PieArcDatum<DonutDatum>>()
                  .innerRadius(R - 46)
                  .outerRadius(lit ? R + 10 : R);
                return (
                  <path
                    key={a.data.label}
                    d={d(a) ?? undefined}
                    fill={colorFor(i, color)}
                    fillOpacity={lit ? 1 : 0.7}
                    stroke="var(--color-canvas)"
                    strokeWidth="2"
                    style={{ transition: "fillOpacity 150ms ease" }}
                    onPointerEnter={() => setActive(i)}
                    onPointerLeave={() => setActive(null)}
                  />
                );
              })}

              <text
                x="0"
                y="-8"
                textAnchor="middle"
                style={{
                  ...AXIS_STYLE,
                  fontSize: 13,
                  fill: GRID.label,
                }}
              >
                {hovered
                  ? formatPct(hovered.data.value / total)
                  : `n = ${d3.format(",.0f")(total)}`}
              </text>
              <text
                x="0"
                y="14"
                textAnchor="middle"
                style={{
                  ...AXIS_STYLE,
                  fontSize: 20,
                  fontWeight: 600,
                  fill: GRID.axis,
                }}
              >
                {hovered ? d3.format(",.2s")(hovered.data.value) : "total"}
              </text>
            </g>
          </svg>
        </div>

        <ul className="w-full max-w-sm space-y-3">
          {arcs.map((a, i) => {
            const value = a.data.value;
            const activeNow = i === active;
            const pct = value / total;
            return (
              <li key={a.data.label}>
                <Button
                  variant="ghost"
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  className="h-auto w-full justify-start gap-3 rounded-small px-3 py-2 text-left text-body font-normal hover:bg-surface-muted"
                >
                  <span
                    className="inline-block h-3 w-3 shrink-0 rounded-small"
                    style={{ backgroundColor: colorFor(i, color) }}
                    aria-hidden
                  />
                  <span className="flex-1 text-body text-ink">{a.data.label}</span>
                  <span className="font-meta text-body-sm text-ink-muted">
                    {d3.format(",.2s")(value)}
                    {unit ? ` ${unit}` : ""}
                  </span>
                  <span className="w-12 text-right font-meta text-caption text-ink-muted">
                    {formatPct(pct)}
                  </span>
                  {activeNow ? (
                    <span
                      className="rounded-pill bg-ink px-2 py-0.5 text-caption text-chalk"
                      aria-hidden
                    >
                      ·
                    </span>
                  ) : null}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </ChartFrame>
  );
}