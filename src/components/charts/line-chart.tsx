"use client";

import { useId, useMemo, useState } from "react";
import { scaleLinear } from "@visx/scale";
import { Area, LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { format } from "d3-format";
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

const tickLabel = {
  ...AXIS_STYLE,
  textAnchor: "middle",
} as const;

const tickLabelLeft = {
  ...AXIS_STYLE,
  textAnchor: "end",
} as const;

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
    () => Array.from(new Set(allPoints.map((p) => String(p.x)))),
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

  const yFormat = useMemo(() => {
    if (Math.abs(maxY) < 1) return format(".3f");
    if (Math.abs(maxY) < 100) return format(".1f");
    return format(",.0f");
  }, [maxY]);

  const xScale = useMemo(() => {
    if (numeric) {
      const pad =
        maxX === minX ? (Math.abs(maxX) || 1) * 0.1 : (maxX - minX) * 0.03;
      return scaleLinear<number>({
        domain: [minX - pad, maxX + pad],
        range: [0, innerW],
      });
    }
    return scaleLinear<number>({
      domain: [0, Math.max(categories.length - 1, 0)],
      range: [0, innerW],
    });
  }, [numeric, minX, maxX, categories, innerW]);

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: yDomain,
        range: [innerH, 0],
        nice: true,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [yDomain[0], yDomain[1], innerH],
  );

  const pos = (p: LinePoint): number => {
    if (numeric) return xScale(p.x as number);
    return xScale(catIndex.get(String(p.x)) ?? 0);
  };

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width - M.left;
    if (numeric) {
      const v = xScale.invert(Math.max(0, Math.min(innerW, px)));
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
      const idx = Math.round(xScale.invert(Math.max(0, Math.min(innerW, px))));
      setActive(Math.max(0, Math.min(categories.length - 1, idx)));
    }
  };

  const hover = useMemo(() => {
    if (active === null || active < 0) return null;
    const label = numeric ? String(allPoints[active]?.x) : categories[active];
    if (!label) return null;
    const px = numeric ? xScale(Number(label)) : xScale(catIndex.get(label) ?? 0);
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
  }, [active, numeric, categories, series, allPoints, catIndex, xScale, yFormat]);

  if (series.length === 0 || allPoints.length === 0) return null;

  const xTickValues = numeric ? undefined : categories.map((_, i) => i);
  const xTickFormat = (v: number) =>
    numeric ? String(v) : (categories[Math.round(v)] ?? "");

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

          <Group left={M.left} top={M.top}>
            <GridRows
              scale={yScale}
              width={innerW}
              numTicks={5}
              stroke={GRID.hairline}
              strokeWidth={1}
              strokeDasharray="3 4"
            />

            {!numeric && series.length === 1 ? (
              <Area<LinePoint>
                data={series[0].points.filter((p) => Number.isFinite(p.y))}
                x={(p) => pos(p)}
                y0={innerH}
                y1={(p) => yScale(p.y)}
                fill={colorFor(0)}
                opacity={0.08}
              />
            ) : null}

            {series.map((s, si) => (
              <LinePath<LinePoint>
                key={s.name}
                data={s.points}
                defined={(p) => Number.isFinite(p.y)}
                x={(p) => pos(p)}
                y={(p) => yScale(p.y)}
                stroke={colorFor(si, s.color)}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={s.dashed ? "6 5" : undefined}
              />
            ))}

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
                      cy={yScale(p.y)}
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

            <AxisLeft
              scale={yScale}
              numTicks={5}
              hideAxisLine
              hideTicks
              tickFormat={(v) => yFormat(Number(v))}
              tickLabelProps={() => tickLabelLeft}
              stroke="transparent"
            />
            <AxisBottom
              top={innerH}
              scale={xScale}
              numTicks={numeric ? 6 : categories.length}
              tickValues={xTickValues}
              tickFormat={(v) => xTickFormat(Number(v))}
              hideAxisLine
              hideTicks
              tickLabelProps={() => tickLabel}
              stroke="transparent"
            />
          </Group>

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
