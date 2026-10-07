"use client";

import { useId, useMemo, useState } from "react";
import * as d3 from "d3";
import { ChartFrame, ChartTooltip } from "./frame";
import {
  AXIS_STYLE,
  CHART_SIZE,
  GRID,
  colorFor,
  type ChartColor,
} from "./chart-utils";

export type LinePoint = { x: number | string; y: number };

export type LineSeries = {
  name: string;
  points: LinePoint[];
  color?: ChartColor;
  dashed?: boolean;
};

const M = { top: 24, right: 24, bottom: 44, left: 56 };

export function LineChart({
  series,
  xLabel,
  yLabel,
  title,
  caption,
  source,
  height = 428,
}: {
  series: LineSeries[];
  xLabel?: string;
  yLabel?: string;
  title?: string;
  caption?: string;
  source?: string;
  height?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const { width } = CHART_SIZE;
  const innerW = width - M.left - M.right;
  const innerH = height - M.top - M.bottom;
  const [active, setActive] = useState<number | null>(null);

  const numeric =
    series.length > 0 &&
    series.every((s) => s.points.every((p) => typeof p.x === "number"));

  const allPoints = useMemo(() => series.flatMap((s) => s.points), [series]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(allPoints.map((p) => String(p.x))),
      ),
    [allPoints],
  );

  const catIndex = useMemo(() => {
    const m = new Map<string, number>();
    categories.forEach((c, i) => m.set(c, i));
    return m;
  }, [categories]);

  const { minY, maxY, minX, maxX } = useMemo(() => {
    let minY = Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let maxX = -Infinity;
    for (const p of allPoints) {
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
      if (typeof p.x === "number") {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
      }
    }
    return { minY, maxY, minX, maxX };
  }, [allPoints]);

  const yDomain: [number, number] =
    minY < 0
      ? [minY * 1.08, Math.max(maxY * 1.08, 1)]
      : [0, Math.max(maxY * 1.08, 1e-9)];

  const yFormat = useMemo(
    () =>
      Math.abs(maxY) < 1
        ? d3.format(".3f")
        : Math.abs(maxY) < 100
          ? d3.format(".1f")
          : d3.format(",.0f"),
    [maxY],
  );

  const x = useMemo(() => {
    if (numeric) {
      const pad =
        maxX === minX
          ? (Math.abs(maxX) || 1) * 0.1
          : (maxX - minX) * 0.03;
      return d3
        .scaleLinear()
        .domain([minX - pad, maxX + pad])
        .range([0, innerW]);
    }
    return d3
      .scaleLinear()
      .domain([0, Math.max(categories.length - 1, 0)])
      .range([0, innerW]);
  }, [numeric, minX, maxX, categories, innerW]);

  const y = d3.scaleLinear().domain(yDomain).range([innerH, 0]).nice();
  const yTicks = y.ticks(5);

  const pos = (p: LinePoint): number => {
    if (numeric) return x(p.x as number);
    return x(catIndex.get(String(p.x)) ?? 0);
  };

  const line = d3
    .line<LinePoint>()
    .x(pos)
    .y((p) => y(p.y))
    .defined((p) => Number.isFinite(p.y));

  const area = !numeric
    ? d3
        .area<LinePoint>()
        .x(pos)
        .y0(innerH)
        .y1((p) => y(p.y))
        .defined((p) => Number.isFinite(p.y))
    : null;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width - M.left;
    if (numeric) {
      const v = x.invert(Math.max(0, Math.min(innerW, px)));
      let bestIdx = -1;
      let bestD = Infinity;
      allPoints.forEach((p, i) => {
        const d = Math.abs((p.x as number) - v);
        if (d < bestD) {
          bestD = d;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    } else {
      const idx = Math.round(x.invert(Math.max(0, Math.min(innerW, px))));
      setActive(Math.max(0, Math.min(categories.length - 1, idx)));
    }
  };

  const hover = useMemo(() => {
    if (active === null || active < 0) return null;
    const label = numeric ? String(allPoints[active]?.x) : categories[active];
    if (!label) return null;
    const px = numeric ? x(Number(label)) : x(catIndex.get(label) ?? 0);
    const rows = series.map((s, si) => {
      const hit = numeric
        ? s.points.find((p) => p.x === allPoints[active]?.x)
        : s.points.find((p) => String(p.x) === label);
      return {
        name: s.name,
        color: colorFor(si, s.color),
        value: hit ? yFormat(hit.y) : "—",
      };
    });
    return { label, x: px, rows };
  }, [active, numeric, categories, series, allPoints, catIndex, x, yFormat]);

  if (series.length === 0 || allPoints.length === 0) return null;

  const xTickValues = numeric ? x.ticks(6) : categories.map((_, i) => i);
  const xTickLabel = (v: number) =>
    numeric ? String(v) : categories[Math.round(v)] ?? "";

  return (
    <ChartFrame title={title} caption={caption} source={source}>
      {series.length > 1 ? (
        <ul className="mb-5 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          {series.map((s, i) => (
            <li
              key={s.name}
              className="flex items-center gap-2 text-body-sm text-ink-muted"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-pill"
                style={{ backgroundColor: colorFor(i, s.color) }}
                aria-hidden
              />
              {s.name}
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
          <defs>
            <clipPath id={`clip-${uid}`}>
              <rect x="0" y="0" width={innerW} height={innerH} />
            </clipPath>
          </defs>

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

            {series.map((s, si) => (
              <path
                key={s.name}
                d={line(s.points) ?? undefined}
                fill="none"
                stroke={colorFor(si, s.color)}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={s.dashed ? "6 5" : undefined}
              />
            ))}

            {area && series.length === 1 ? (
              <path
                d={area(series[0].points) ?? undefined}
                fill={colorFor(0)}
                opacity="0.08"
              />
            ) : null}

            {hover ? (
              <line
                x1={hover.x}
                x2={hover.x}
                y1="0"
                y2={innerH}
                stroke={GRID.axis}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ) : null}

            <g clipPath={`url(#clip-${uid})`}>
              {series.map((s, si) =>
                s.points.map((p, pi) => {
                  const px = pos(p);
                  const lit = hover !== null && String(p.x) === hover.label;
                  return (
                    <circle
                      key={`${s.name}-${pi}`}
                      cx={px}
                      cy={y(p.y)}
                      r={lit ? 5 : 3}
                      fill={colorFor(si, s.color)}
                      stroke={lit ? GRID.axis : "none"}
                      strokeWidth={lit ? 1.5 : 0}
                      style={{ pointerEvents: "none" }}
                    />
                  );
                }),
              )}
            </g>

            {yTicks.map((t) => (
              <text
                key={`y-${t}`}
                x={-10}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="central"
                style={AXIS_STYLE}
              >
                {yFormat(t)}
              </text>
            ))}

            {xTickValues.map((v) => (
              <text
                key={`x-${v}`}
                x={x(v)}
                y={innerH + 26}
                textAnchor="middle"
                style={AXIS_STYLE}
              >
                {xTickLabel(v)}
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
          {yLabel ? (
            <text x={0} y={16} textAnchor="start" style={AXIS_STYLE}>
              {yLabel}
            </text>
          ) : null}
        </svg>

        {hover ? (
          <div className="absolute right-0 top-0 sm:right-auto sm:left-6">
            <ChartTooltip label={hover.label} rows={hover.rows} />
          </div>
        ) : null}
      </div>
    </ChartFrame>
  );
}