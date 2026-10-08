# FANS of Zona Design System

This design system is built on principles inspired by **Astryx** (Meta's design system for scientific and data-driven interfaces) and tailored for a student sports analytics club.

## Typography

### Font Stack
- **Display/Headlines**: Libron (custom serif font)
  - Large x-height, open counters
  - Used for posters, headings, and hero text
  - Weights: 400 (light), 700 (bold)

- **Body/Meta**: Source Sans Pro (Google Fonts)
  - Clean, readable sans-serif
  - Used for body copy, navigation, metadata, and figures
  - Weights: 400, 500, 600, 700

### Type Scale
```
Display (88px)     → Hero headlines
Heading 3XL (68px) → Section titles
Heading 2XL (56px) → Major section heads
Heading Large (44px)
Heading (30px)
Heading Small (24px)
Subheading (20px)  → Card titles
Body Large (18px)
Body (16px)        → Primary body text
Body Small (14px)  → Secondary copy
Caption (12px)     → Metadata, labels
```

## Color Palette

### Arizona Brand Colors
- **Arizona Red** (#ab0520) - Primary action, highlights
- **Arizona Blue** (#0c234b) - Hero backgrounds, depth

### Extended Palette
- **Tinta** (#03132e) - Primary text
- **Azurite** (#1e5288) - Secondary highlights
- **Rain** (#81ceeb) - Category badges
- **Sonoran** (#850000) - Destructive actions
- **Saguaro** (#7f8b5a) - Accent
- **Shade** (#3f7a7a) - Tertiary accent

### Neutral Grays
- **Canvas** (#f2efea) - Page background
- **Surface** (#ffffff) - Cards, content blocks
- **Surface Muted** (#e5eff7) - Secondary fills
- **Hairline** (#d8d3cb) - Divider rules

## Component Patterns

### Cards
- Rounded corners (20px medium radius)
- Minimal shadows
- Dotted border rules for separation
- Hover effects: subtle lift (-translate-y-1)

### Buttons/Controls
- Pill-shaped (100px radius)
- Flat design, no emboss
- Three tones: primary (red), secondary (outline), text
- Hover states: opacity shift, background invert

### Dividers
- 1.5px dotted rules
- Color: `--color-hairline` or text color with reduced opacity
- Used to separate sections and ledger rows

### Tags/Badges
- Four variants: rain (primary), cloud (secondary), outline, solid
- Rounded corners (8px)
- Tabular figures for metadata

## Grid & Spacing

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Container Width
- Max width: 1280px
- Padding: 20px (mobile), 32px (tablet+)

### Spacing Scale
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px

## Data Visualization Principles

### Colors for Series
1. Arizona Red (#ab0520)
2. Azurite (#1e5288)
3. Arroyo (#106ab1)
4. Rain (#81ceeb)
5. Saguaro (#7f8b5a)

### Design Principles
- Honest axes (start where data starts)
- No zero-based inflation
- D3 `.nice()` domain for automatic scaling
- Tabular figures for all data
- Intentional color hierarchy

## Accessibility

### Color Contrast
- All text maintains 6.1:1 contrast ratio minimum
- Red (#ab0520) on white: 9.5:1
- Primary text (Tinta) on canvas: 11.2:1

### Motion
- Reduced motion respected via `prefers-reduced-motion`
- No auto-play animations
- Ticker pauses on hover/focus

### Focus Indicators
- 2px outline with 4px offset
- Color: `--color-ink` (#03132e)
- Visible on all interactive elements

## Implementation

### CSS Variables
All design tokens are available as CSS custom properties:
```css
var(--color-feature)
var(--color-ink)
var(--font-display)
var(--text-heading)
```

### Responsive Design
- Mobile-first approach
- Flex and grid for layout
- No horizontal scroll at any breakpoint

### Performance
- Font loading: `display: swap`
- Local fonts: `.woff2` format
- Asset optimization in `.next/static`
