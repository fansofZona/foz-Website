# FANS of Zona — V3 identity guidelines

Three developed identity directions for a student sports analytics club at the University of Arizona.
These are alternatives for review. Select one direction as the primary identity before applying it to the public website.

## The common foundation

The work should feel simple, academic, and open to scrutiny. Lead with the question and the publication, keep methods and caveats easy to find, and give the reader enough room to think.

The club name is **FANS of Zona**. The short form is **FoZ**, retaining the lowercase o. Do not substitute a University of Arizona seal or imply institutional endorsement.

The visual approach takes inspiration from [Area’s OpenAI identity exploration](https://www.area.tech/openai): start with a core idea, explore its variations, and show it working in actual applications. The FoZ artwork in this folder is newly constructed for this project. No Area or OpenAI logo artwork is included.

## Palette

| Color | Hex | RGB | Role |
| --- | --- | --- | --- |
| White | `#FFFFFF` | 255, 255, 255 | Primary canvas and reversed artwork |
| Navy | `#0C234B` | 12, 35, 75 | Text, identity, navigation, chart baseline |
| Red | `#AB0520` | 171, 5, 32 | Links, selected controls, a meaningful highlight |

White is the dominant website surface. Navy carries the text. Use red sparingly, where it communicates an action or a selected state. Use either navy or red for a standalone mark, not both within one mark.

Thin dividers may use navy at 18% opacity over white. Supporting text uses navy at 78% opacity over white. These are derivatives of the brand ink, not additional palette colors. Keep essential small labels in solid navy.

Navy and red each provide strong text contrast on white; white works on both. Do not set red text on navy, or navy text on red. Use the white export on those backgrounds. Color must not be the only signal of selection or a chart series.

Print exports retain the specified RGB values. Convert through the printer’s supplied color profile when preparing a print job; this kit does not invent universal CMYK equivalents.

## Typography

| Role | Family and weight | Size / line height |
| --- | --- | --- |
| Desktop page title | Geist Serif Regular | 60 / 68px |
| Mobile page title | Geist Serif Regular | 40 / 46px |
| Section title | Geist Serif Regular | 36 / 44px |
| Publication title | Geist Serif Regular | 28 / 36px |
| Body | Geist Sans Regular | 18 / 29px |
| Navigation and metadata | Geist Sans Regular or Medium | 16 / 24px |
| Supporting caption | Geist Sans Regular | 14 / 22px |

The comparison page uses a larger 84px maximum title as a presentation treatment. The website and report hierarchy follows the scale above. Its miniature website and cover examples are scaled applications, not additional typography rules.

Use the standard Geist Serif Regular style. The decorative Heart, Square, and Triangle styles are outside this identity. Use 400 and 500 for Geist Sans; do not synthesize bold or italic styles absent from the bundled fonts.

Keep headlines in sentence case and left-aligned. Use slightly tighter display spacing, between -0.02em and -0.035em. Leave body text and small labels at normal tracking. Keep prose near 65 characters per line. Use actual author names and publication years. Avoid invented issue numbers, metrics, and affiliation claims.

The local font files are in `fonts/`, along with `OFL.txt` and `provenance.json`. The comparison page loads its WOFF2 files locally; no CDN or network connection is needed. The TTFs support editing the lettering masters. Exported logos contain outlined letterforms and do not require fonts.

## Direction: Field of View

**Idea:** an open field and an observation at its center.

Two opposing boundary corners occupy a 128 × 128-unit drawing space. The corners have a 12-unit weight; the central circle has a 24-unit diameter. The tension between the open frame and a fixed observation connects a playing surface to an analytical viewpoint.

Use this direction for an identity that needs to extend across sports, data tools, and research topics. The symbol is deliberately abstract, so introduce it with the full name. The wordmark uses optically spaced Geist Sans Medium, with the research content retaining Geist Serif titles.

**Clear space:** at least 32 units beyond every side of the 128-unit mark canvas, scaled with the logo. For the horizontal lockup, use one quarter of the symbol’s displayed width around the entire lockup. Built-in SVG padding does not replace external clear space.

**Minimums:** compact mark 16px wide; horizontal lockup 160px wide; stacked lockup 160px wide. Use the compact mark where the full name is already visible. Below 16px, prefer a text label rather than the mark.

Do not rotate the corners, add a second dot, close the frame, or turn the symbol into a chart or a targeting animation.

## Direction: FoZ Monogram

**Idea:** three letters sharing one structure.

The F and Z use 14-unit stems. An 18-unit-radius circle connects the midline; a 9-unit-radius counter cuts through the union to create the o. The diagonal of the Z supplies direction while the shared counter keeps the mark compact.

Use it for club recognition, social profiles, apparel, and other small placements. Pair it with the full-name Geist Sans Medium wordmark at first introduction. Its athletic character needs a quiet editorial setting: serif article titles, open white space, and no extra badges.

**Clear space:** the same rule as Field of View: at least one quarter of the displayed compact mark width, or one quarter of the symbol width for a lockup.

**Minimums:** compact mark 16px wide; horizontal and stacked lockups 160px wide. The exported size proofs demonstrate the open counter at 16, 24, 48, and 128px. Prefer 24px or more when space permits.

The o is a transparent opening. Never fill it with white as a shortcut: it must reveal the actual background. Preserve the gap between the upper F and Z; avoid adding outlines or changing stem weights independently.

## Direction: Academic Wordmark

**Idea:** the club name reads like a publication’s signature.

The primary form is the full name in Geist Serif Regular, with tightened spacing. The stacked form sets FANS above “of Zona.” A compact FoZ signature carries the same serif voice into avatars, footers, and small imprints.

This is the recommended direction for the planned academic website: it places the research before a graphic emblem and works naturally with the V3 publication hierarchy. Its limitation is smaller-scale use; serif details need more space than the other two marks.

**Clear space:** at least half the capital-letter height around the full wordmark. Around the compact FoZ mark, use at least one quarter of its displayed width. Preserve the supplied spacing between the letters.

**Minimums:** compact mark 24px wide; horizontal wordmark 180px wide; stacked wordmark 160px wide. The 16px proof is intentionally included as a stress example and is not an approved production size. The 32px favicon is the smallest supplied recommended favicon for this direction.

Do not typeset a replacement using a fallback serif. Use the outlined export for consistent spacing. Do not add a separate abstract emblem beside the academic wordmark or combine it with the other directions.

## Logo arrangements and files

Each direction has the same file structure:

```text
logos/<direction>/
  horizontal-{navy,red,white}.svg   Primary full-name lockup
  stacked-{navy,red,white}.svg      Vertical full-name lockup
  mark-{navy,red,white}.svg         Compact identity
  [matching .png files]            Transparent raster counterparts
  icon-{navy,red,white}-{size}.png  16, 24, 48, 128px size proofs
  favicon-32.png                    Navy compact mark at 32px
sources/<direction>/
  horizontal.svg
  stacked.svg
  mark.svg
```

Use SVG for websites and vector workflows. Use PNG when a platform cannot accept SVG. Horizontal PNGs are 1600px wide, stacked PNGs 960px wide, and compact PNGs 512px square. All PNG exports are transparent, including the white artwork; place the white files on a colored surface to view them.

The SVGs in `logos/` use paths for lettering. The masters in `sources/` retain editable text alongside geometric shapes. Install or select the bundled font before editing a master. The monogram’s counter is represented by a vector mask; preserve that mask when editing or flatten it through a vector boolean operation before a fabrication workflow.

Do not stretch, skew, add shadows, add gradients, introduce other colors, or put the logo on busy imagery. Keep clear space free of copy and graphic detail. Use a single direction consistently within a publication or page.

## Website and publication layout

The main navigation has three destinations: Home, Publications, and About. Individual articles may still open separately. The brand kit is a standalone review document; it does not change the current site routes.

Use a maximum content width around 1120px on the website, with 24px mobile gutters and generous desktop margins. Group related information with 8, 16, and 24px gaps. Separate major sections with 64–96px of space. Reduce section spacing to 40–56px on phones.

Let publication titles lead. Place type, sport, year, authors, and a useful summary nearby. Use consistent metadata columns on desktop and stack them on mobile. Prefer simple lists and rules to repeated cards. In report covers, place the identity at the top, the title and authors in the body, and type/year at the foot.

Use red underlined text links. A current navigation item has an underline as well as red text. Focus indicators use a visible 2px red outline with space around it; reverse the focus indicator to white on a dark brand surface. Interactive targets should be at least 44px high. Default content remains visible without entrance animation.

## Research figures

- Begin with a white plot surface and navy labels. Use red to emphasize the series or finding under discussion.
- Identify series directly when possible. Distinguish multiple series with solid/dashed lines, markers, or patterns as well as color.
- Use Geist Sans for labels and tabular figures for numeric columns. Keep labels readable at the final publication size.
- State units and label axes. A bar chart’s quantitative axis starts at zero; another chart may use a tighter range when the range is explicit and the comparison remains honest.
- Show uncertainty where the method supports it. Include the source, definition of the metric, and relevant caveats in the caption.
- Avoid decorative charts, invented measurements, gradients, and 3D treatments. A brand motif is not research evidence.

## Sources and attribution

- Reference process: [Area Technology, OpenAI identity exploration](https://www.area.tech/openai).
- Typeface family: [Vercel Geist](https://vercel.com/font), distributed under SIL OFL 1.1; see the included license and font provenance.
- Publication titles, author names, and years in the application examples come from the existing FoZ content files. Mockups demonstrate design, not a newly published report or a live website change.
