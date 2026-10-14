"use client";

import { useMemo, useState } from "react";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { max, min } from "d3-array";
import { format } from "d3-format";
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

  const values = useMemo(() => ordered.map((d) => d.value), [ordered]);
  const maxV = max(values) ?? 0;
  const minV = min(values) ?? 0;
  const colorHex = colorFor(0, color);

  const innerW = width - M.left - M.right;
  const innerH = height - M.top - M.bottom;

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain:
          minV < 0
            ? [minV * 1.1, Math.max(maxV * 1.08, 1)]
            : [0, Math.max(maxV * 1.08, 1)],
        range: [innerH, 0],
        nice: true,
      }),
    [minV, maxV, innerH],
  );

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        domain: ordered.map((d) => d.label),
        range: [0, innerW],
        padding: 0.3,
      }),
    [ordered, innerW],
  );

  const tickFormat = useMemo(() => {
    const span = Math.max(Math.abs(minV), Math.abs(maxV));
    return span < 10 ? format(",.1f") : format("+,.0f");
  }, [minV, maxV]);
  const barLabelFormat = useMemo(() => format(",.2s"), []);
  const tooltipFormat = useMemo(() => format(",.3s"), []);

  if (ordered.length === 0) return null;

  const zero = yScale(0);

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
          <Group left={M.left} top={M.top}>
            <GridRows
              scale={yScale}
              width={innerW}
              numTicks={5}
              stroke={GRID.hairline}
              strokeWidth={1}
              strokeDasharray="3 4"
            />

            <line
              x1="0"
              x2={innerW}
              y1={zero}
              y2={zero}
              stroke={GRID.axis}
              strokeWidth="1"
            />

            {ordered.map((d, i) => {
              const bw = xScale.bandwidth();
              const bx = xScale(d.label) ?? 0;
              const top = yScale(Math.max(d.value, 0));
              const bottom = yScale(Math.min(d.value, 0));
              const isActive = i === active;
              return (
                <g key={d.label}>
                  <Bar
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
                    {barLabelFormat(d.value)}
                  </text>
                </g>
              );
            })}

            <AxisLeft
              scale={yScale}
              numTicks={5}
              hideAxisLine
              hideTicks
              tickFormat={(v) => tickFormat(Number(v))}
              tickLabelProps={() => ({
                ...AXIS_STYLE,
                textAnchor: "end",
                dx: "-0.6em",
                dy: "0.32em",
              })}
              stroke="transparent"
            />
            <AxisBottom
              top={innerH}
              scale={xScale}
              hideAxisLine
              hideTicks
              tickLabelProps={() => ({
                ...AXIS_STYLE,
                textAnchor: "middle",
                dy: "0.6em",
              })}
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
        </svg>

        {hovered ? (
          <div className="absolute right-0 top-0 sm:right-auto sm:left-6">
            <ChartTooltip
              label={hovered.label}
              rows={[
                {
                  name: yLabel ?? "Value",
                  value: `${tooltipFormat(hovered.value)}${unit ? ` ${unit}` : ""}`,
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
