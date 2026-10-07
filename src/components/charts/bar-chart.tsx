"use client";

import { useMemo, useState } from "react";
import * as d3 from "d3";
import { ChartFrame, ChartTooltip } from "./frame";
import {
  AXIS_STYLE,
  CHART_SIZE,
  GRID,
  colorFor,
  type ChartColor,
} from "./chart-utils";

export type BarDatum = { label: string; value: number };

const M = { top: 24, right: 24, bottom: 52, left: 56 };

export function BarChart({
  data,
  xLabel,
  yLabel,
  unit = "",
  title,
  caption,
  source,
  color,
  height = 420,
  sort = "desc",
}: {
  data: BarDatum[];
  xLabel?: string;
  yLabel?: string;
  unit?: string;
  title?: string;
  caption?: string;
  source?: string;
  color?: ChartColor;
  height?: number;
  sort?: "desc" | "asc" | "none";
}) {
  const { width } = CHART_SIZE;
  const [active, setActive] = useState<number | null>(null);

  const ordered = useMemo(() => {
    if (sort === "none") return data;
    const copy = [...data];
    copy.sort((a, b) =>
      sort === "desc" ? b.value - a.value : a.value - b.value,
    );
    return copy;
  }, [data, sort]);

  if (ordered.length === 0) return null;

  const values = ordered.map((d) => d.value);
  const maxV = d3.max(values) ?? 0;
  const minV = d3.min(values) ?? 0;
  const colorHex = colorFor(0, color);

  const innerW = width - M.left - M.right;
  const innerH = height - M.top - M.bottom;

  const y = d3
    .scaleLinear()
    .domain(
      minV < 0
        ? [minV * 1.1, Math.max(maxV * 1.08, 1)]
        : [0, Math.max(maxV * 1.08, 1)],
    )
    .range([innerH, 0])
    .nice();

  const zero = y(0);
  const band = d3
    .scaleBand()
    .domain(ordered.map((d) => d.label))
    .range([0, innerW])
    .padding(0.3);
  const yTicks = y.ticks(5);

  const tickFormat =
    Math.max(Math.abs(minV), Math.abs(maxV)) < 10
      ? d3.format(",.1f")
      : d3.format("+,.0f");

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width - M.left;
    const idx = Math.floor(px / (innerW / ordered.length));
    setActive(Math.max(0, Math.min(ordered.length - 1, idx)));
  };

  const hovered = active === null ? null : ordered[active];

  return (
    <ChartFrame title={title} caption={caption} source={source}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
        >
          <g transform={`translate(${M.left},${M.top})`}>
            {yTicks.map((t) => (
              <line
                key={t}
                x1="0"
                x2={innerW}
                y1={y(t)}
                y2={y(t)}
                stroke={GRID.hairline}
                strokeWidth="1"
                strokeDasharray="3 4"
              />
            ))}

            <line
              x1="0"
              x2={innerW}
              y1={zero}
              y2={zero}
              stroke={GRID.axis}
              strokeWidth="1"
            />

            {ordered.map((d, i) => {
              const bw = band.bandwidth();
              const bx = band(d.label) ?? 0;
              const top = y(Math.max(d.value, 0));
              const bottom = y(Math.min(d.value, 0));
              const isActive = i === active;
              return (
                <g key={d.label}>
                  <rect
                    x={bx}
                    y={top}
                    width={bw}
                    height={Math.max(0, Math.abs(bottom - top))}
                    rx={5}
                    fill={colorHex}
                    opacity={isActive ? 1 : 0.32 + (i / ordered.length) * 0.5}
                    style={{ transition: "opacity 150ms ease" }}
                  />
                  <text
                    x={bx + bw / 2}
                    y={d.value >= 0 ? top - 8 : bottom + 18}
                    textAnchor="middle"
                    style={{
                      ...AXIS_STYLE,
                      fontWeight: isActive ? 600 : 400,
                      fill: isActive ? GRID.axis : GRID.label,
                    }}
                  >
                    {d3.format(",.2s")(d.value)}
                  </text>
                  <text
                    x={bx + bw / 2}
                    y={innerH + 20}
                    textAnchor="middle"
                    style={AXIS_STYLE}
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}

            {yTicks.map((t) => (
              <text
                key={`tick-${t}`}
                x={-10}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="central"
                style={AXIS_STYLE}
              >
                {tickFormat(t)}
              </text>
            ))}
          </g>

          {xLabel ? (
            <text
              x={width / 2}
              y={height - 4}
              textAnchor="middle"
              style={AXIS_STYLE}
            >
              {xLabel}
            </text>
          ) : null}
        </svg>

        {hovered ? (
          <div className="absolute right-0 top-0 sm:right-auto sm:left-6">
            <ChartTooltip
              label={hovered.label}
              rows={[
                {
                  name: yLabel ?? "Value",
                  value: `${d3.format(",.3s")(hovered.value)}${unit ? ` ${unit}` : ""}`,
                  color: colorHex,
                },
              ]}
            />
          </div>
        ) : null}
      </div>
    </ChartFrame>
  );
}