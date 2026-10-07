export const CHART_COLORS = {
  feature: "#ab0520",
  plasma: "#0c234b",
  azurite: "#1e5288",
  arroyo: "#106ab1",
  rain: "#81ceeb",
  shade: "#3f7a7a",
  saguaro: "#7f8b5a",
  brick: "#85372b",
  ink: "#03132e",
  muted: "#4d5a6d",
  hairline: "#d8d3cb",
} as const;

export type ChartColor = keyof typeof CHART_COLORS;

export const SERIES_PALETTE: ChartColor[] = [
  "feature",
  "plasma",
  "azurite",
  "arroyo",
  "shade",
  "saguaro",
  "brick",
];

export function colorFor(index: number, color?: ChartColor): string {
  if (color) return CHART_COLORS[color];
  return CHART_COLORS[SERIES_PALETTE[index % SERIES_PALETTE.length]];
}

export const CHART_SIZE = { width: 800 } as const;

export const GRID = {
  hairline: CHART_COLORS.hairline,
  label: CHART_COLORS.muted,
  axis: CHART_COLORS.ink,
};

export const AXIS_STYLE = {
  fontSize: 12,
  fontFamily: "var(--font-fira-code), ui-monospace, monospace",
  fill: GRID.label,
} as const;