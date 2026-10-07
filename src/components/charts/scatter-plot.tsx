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

export type ScatterPoint = {
  x: number;
  y: number;
  label?: string;
  group?: string;
};

// A tiny least-squares fit for an optional trend line.
function trendLine(points: ScatterPoint[]) {
  const n = points.length;
  if (n < 2) return null;
  const xMean = d3.mean(points, (p) => p.x) ?? 0;
  const yMean = d3.mean(points, (p) => p.y) ?? 0;
  const denom = d3.sum(points, (p) => (p.x - xMean) ** 2);
  if (!denom) return null;
  const slope = d3.sum(points, (p) => (p.x - xMean) * (p.y - yMean)) / denom;
  const intercept = yMean - slope * xMean;
  return { slope, intercept };
}

const M = { top: 24, right: 24, bottom: 48, left: 56 };

export function ScatterPlot({
  points,
  xLabel,
  yLabel,
  title,
  caption,
  source,
  color,
  trend,
  height = 460,
}: {
  points: ScatterPoint[];
  xLabel?: string;
  yLabel?: string;
  title?: string;
  caption?: string;
  source?: string;
  color?: ChartColor;
  trend?: boolean;
  height?: number;
}) {
  const { width } = CHART_SIZE;
  const innerW = width - M.left - M.right;
  const innerH = height - M.top - M.bottom;
  const [active, setActive] = useState<number | null>(null);

  const colorHex = colorFor(0, color);
  const groups = useMemo(() => {
    const set = new Set(points.map((p) => p.group).filter(Boolean));
    return Array.from(set) as string[];
  }, [points]);

  const x = useMemo(() => {
    const [lo, hi] = d3.extent(points, (p) => p.x as number);
    const pad = hi === lo ? (Math.abs(lo ?? 0) || 1) * 0.1 : (hi! - lo!) * 0.06;
    return d3
      .scaleLinear()
      .domain([(lo ?? 0) - pad, (hi ?? 1) + pad])
      .range([0, innerW]);
  }, [points, innerW]);

  const y = useMemo(() => {
    const [lo, hi] = d3.extent(points, (p) => p.y as number);
    const pad = hi === lo ? (Math.abs(lo ?? 0) || 1) * 0.1 : (hi! - lo!) * 0.06;
    return d3
      .scaleLinear()
      .domain([(lo ?? 0) - pad, (hi ?? 1) + pad])
      .range([innerH, 0]);
  }, [points, innerH]);

  const fit = trend ? trendLine(points) : null;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width - M.left;
    const py = ((e.clientY - rect.top) / rect.height) * height - M.top;
    const xv = x.invert(Math.max(0, Math.min(innerW, px)));
    const yv = y.invert(Math.max(0, Math.min(innerH, py)));
    let best = -1;
    let bestD = Infinity;
    points.forEach((p, i) => {
      const d = (p.x - xv) ** 2 + (p.y - yv) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  };

  const hovered = active === null ? null : points[active];

  if (points.length === 0) return null;

  return (
    <ChartFrame title={title} caption={caption} source={source}>
      {groups.length > 1 ? (
        <ul className="mb-5 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          {groups.map((g, i) => (
            <li
              key={g}
              className="flex items-center gap-2 text-body-sm text-ink-muted"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-pill"
                style={{ backgroundColor: colorFor(i + 1, color) }}
                aria-hidden
              />
              {g}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
        >
          <g transform={`translate(${M.left},${M.top})`}>
            {y.ticks(5).map((t) => (
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
            {x.ticks(6).map((t) => (
              <line
                key={t}
                x1={x(t)}
                x2={x(t)}
                y1="0"
                y2={innerH}
                stroke={GRID.hairline}
                strokeWidth="1"
                strokeDasharray="3 4"
              />
            ))}

            {fit ? (
              <line
                x1="0"
                y1={y(fit.slope * x.domain()[0] + fit.intercept)}
                x2={innerW}
                y2={y(fit.slope * x.domain()[1] + fit.intercept)}
                stroke={colorHex}
                strokeWidth="2"
                strokeDasharray="7 5"
              />
            ) : null}

            {points.map((p, i) => {
              const gIdx = p.group ? groups.indexOf(p.group) : -1;
              const lit = i === active;
              return (
                <circle
                  key={i}
                  cx={x(p.x)}
                  cy={y(p.y)}
                  r={lit ? 6 : 4}
                  fill={gIdx >= 0 ? colorFor(gIdx + 1, color) : colorHex}
                  fillOpacity={lit ? 1 : 0.65}
                  stroke={lit ? GRID.axis : "none"}
                  strokeWidth={lit ? 1.5 : 0}
                  style={{ transition: "r 120ms ease, fillOpacity 120ms ease" }}
                />
              );
            })}

            {y.ticks(5).map((t) => (
              <text
                key={`y-${t}`}
                x={-10}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="central"
                style={AXIS_STYLE}
              >
                {d3.format(",.0f")(t)}
              </text>
            ))}
            {x.ticks(6).map((t) => (
              <text
                key={`x-${t}`}
                x={x(t)}
                y={innerH + 24}
                textAnchor="middle"
                style={AXIS_STYLE}
              >
                {d3.format(",.0f")(t)}
              </text>
            ))}
          </g>

          {xLabel ? (
            <text x={width / 2} y={height - 4} textAnchor="middle" style={AXIS_STYLE}>
              {xLabel}
            </text>
          ) : null}
          {yLabel ? (
            <text x={0} y={16} textAnchor="start" style={AXIS_STYLE}>
              {yLabel}
            </text>
          ) : null}
        </svg>

        {hovered ? (
          <div className="absolute right-0 top-0 sm:left-6 sm:right-auto">
            <ChartTooltip
              label={hovered.label ?? hovered.group ?? "Point"}
              rows={[
                { name: xLabel ?? "x", value: d3.format(",.2f")(hovered.x), color: colorHex },
                { name: yLabel ?? "y", value: d3.format(",.2f")(hovered.y), color: colorHex },
              ]}
            />
          </div>
        ) : null}
      </div>
    </ChartFrame>
  );
}