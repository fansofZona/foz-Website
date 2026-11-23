# Design: FANS of Zona

Shared system for the club's publication, collections, and member profiles.

## System
- Genre: editorial.
- Shape: publication index; articles use a reading column.
- Theme: existing Arizona brand, read from DESIGN_SYSTEM.md and the original stylesheet.
- Signature: the soccer report's accumulated expected-threat chart, with its published values.
- The home page features research; collections are scannable indexes; profiles lead with people.

## Tokens
`src/app/tokens.css` owns palette, fonts, scale, spacing, and corner radii.
- Canvas: Arizona caliche, #f2efea.
- Ink: Tinta, #03132e. Supporting text: #4d5a6d.
- Primary action: Arizona red, #ab0520.
- Feature field: Arizona blue, #0c234b. Chart highlight: Rain, #81ceeb.
- Surface: warm chalk, #fcfcfa.
- Display and body: local Luciole; Luciole Math remains available for equations.
- Container: 1280px, centered; 32px desktop gutters, 20px phone gutters.
- Corners: 4px for surfaces and controls; solid rules provide structure.

## Controls
- Primary: red fill, chalk text, 4px radius, at least 44px tall.
- Secondary: ink outline or underlined text.
- Focus: red on canvas, Rain on navy; immediate visible outline.
- Filters wrap at phone widths. All existing handlers and destinations stay intact.

## Motion
Still by default. Short color transitions and pressed feedback only.
Reduced-motion preferences disable transitions and transforms used by motion.
Content is visible without entrance scripting.

## Content
Use existing publication metadata and article values. Never add unverified metrics.
Existing membership figures, names, biographies, publication claims, and external destinations
are carried over as found and should be verified by the club before launch.
Member SVG illustrations are existing assets, not photographs.

## Exports
- `src/app/tokens.css`: brand and role tokens, Tailwind utilities.
- `src/app/base.css`: shared accessible foundation.
- `src/app/globals.css`: site compositions and semantic shadcn bridges.
