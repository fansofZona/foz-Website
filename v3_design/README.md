# FoZ V3 brand exploration

Open **index.html** in a browser to compare the three developed identity directions, change backgrounds and logo arrangements, and download individual SVGs and PNGs. The page and its controls work from disk and do not need the Next.js app or an internet connection.

For the full package, use **foz-v3-brand-kit.zip**. All files remain inside this folder; the existing website and Paper designs are unchanged.

## Directions

| Direction | Core idea | Strongest use |
| --- | --- | --- |
| Field of View | Open boundaries around a central observation | A research identity that extends across sports and tools |
| FoZ Monogram | The F and Z share an open circular o | Club recognition, avatars, apparel |
| Academic Wordmark | A serif full-name signature and compact FoZ imprint | The simple academic V3 website and research reports |

**Recommendation: Academic Wordmark.** It most directly supports the reading-focused website and the selected Geist Serif / Geist Sans pairing. The tradeoff is small-scale legibility: use the compact mark at 24px or more. FoZ Monogram is the stronger option if recognition in small club placements takes priority.

## What is included

- `index.html`, `styles.css`, `app.js`: the static comparison page, with background and arrangement controls and asset downloads.
- `guidelines.md`: shared color, type, layout, accessibility, chart, and logo rules, including each direction’s clear space and minimum sizes.
- `tokens.css`: reusable palette, font declarations, typography, and spacing tokens. Font paths resolve from this folder.
- `logos/`: 27 outlined SVGs, 27 corresponding transparent PNGs, 36 size proofs, 3 favicons, and `manifest.json`.
- `sources/`: 9 editable SVG masters. Install the bundled TTF fonts when editing their live text.
- `fonts/`: Geist Regular, Geist Medium, and standard Geist Serif Regular, each in TTF and WOFF2; the license and provenance accompany them.
- `review/`: logo contact sheet and browser-validation evidence.
- `scripts/`: reproducible vector, raster, page, packaging, and validation tools.
- `downloads/foz-v3-assets.zip`: the artwork, fonts, tokens, and guidelines in one download. This is the archive linked from the comparison page; the full kit also includes the page and its source tools.

Asset paths follow `logos/<direction>/<arrangement>-<color>.svg` (or `.png`). Directions are `field-of-view`, `foz-monogram`, and `academic-wordmark`; arrangements are `horizontal`, `stacked`, and `mark`; colors are `navy`, `red`, and `white`.

Use outlined SVGs for production handoff. Transparent white PNGs and SVGs need a navy or red background to be visible. The academic 16px proof illustrates a size below its approved minimum; use the included 32px favicon instead.

## Rebuilding

No rebuild is required to use this kit. If changing the artwork:

```sh
# Use an isolated Python environment, with fonttools, brotli, and Pillow installed.
python3 v3_design/scripts/build_assets.py
node v3_design/scripts/render_assets.mjs
python3 v3_design/scripts/build_page.py
python3 v3_design/scripts/package_kit.py
python3 v3_design/scripts/validate_kit.py
```

The SVG generator reads the bundled fonts, not an absolute path on the author’s computer. The raster generator uses the website’s existing `sharp` dependency. Neither tool modifies the app or its package manifest.

Optional local preview from this folder:

```sh
python3 -m http.server 8763 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8763/`.

## Provenance

The exploration method is informed by [Area’s OpenAI identity study](https://www.area.tech/openai). The marks are original FoZ constructions; the reference’s artwork is not bundled. Type comes from [Vercel’s Geist family](https://vercel.com/font); see `fonts/OFL.txt` and `fonts/provenance.json`. Research examples use existing FoZ titles, authors, and years.
