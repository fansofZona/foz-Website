"""Rebuild FoZ vector assets using the bundled fonts. Requires fonttools + brotli.

Run from any directory: python3 v3_design/scripts/build_assets.py
Export PNGs afterward with: node v3_design/scripts/render_assets.mjs
"""
from pathlib import Path
from html import escape
import json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[1]
COLORS = {"navy": "#0C234B", "red": "#AB0520", "white": "#FFFFFF"}
FONTS = {"sans": TTFont(ROOT / "fonts/geist-regular.ttf"),
         "medium": TTFont(ROOT / "fonts/geist-medium.ttf"),
         "serif": TTFont(ROOT / "fonts/geist-serif-regular.ttf")}
CONCEPTS = [("field-of-view", "Field of View"), ("foz-monogram", "FoZ Monogram"),
            ("academic-wordmark", "Academic Wordmark")]


def text(label, x, baseline, size, color, family="sans", editable=False, tracking=0):
    font = FONTS[family]
    if editable:
        fam = "Geist Serif" if family == "serif" else "Geist"
        return (f'<text x="{x}" y="{baseline}" fill="{color}" font-family="{fam}" '
                f'font-weight="{500 if family == "medium" else 400}" font-size="{size}" '
                f'letter-spacing="{tracking}">{escape(label)}</text>')
    scale = size / font["head"].unitsPerEm
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    paths = []
    for character in label:
        glyph_name = cmap[ord(character)]
        pen = SVGPathPen(glyphs)
        glyphs[glyph_name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
        d = pen.getCommands()
        if d:
            paths.append(f'<path d="{d}"/>')
        x += font["hmtx"].metrics[glyph_name][0] * scale + tracking
    return f'<g fill="{color}">{"".join(paths)}</g>'


def text_width(label, size, family="sans", tracking=0):
    font = FONTS[family]
    cmap = font.getBestCmap()
    return sum(font["hmtx"].metrics[cmap[ord(c)]][0] for c in label) * size / font["head"].unitsPerEm + max(0, len(label)-1) * tracking


def symbol(slug, color, editable=False):
    if slug == "field-of-view":
        # Two opposing boundary corners; an observation at the shared center.
        return (f'<g fill="{color}"><path d="M16 16H76V28H28V76H16Z"/>'
                '<path d="M112 112H52V100H100V52H112Z"/>'
                '<circle cx="64" cy="64" r="12"/></g>')
    if slug == "foz-monogram":
        # A shared midline connects F and Z. The o is cut through the union.
        return ('<defs><mask id="o-counter" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">'
                '<rect width="128" height="128" fill="white"/>'
                '<circle cx="65" cy="64" r="9" fill="black"/></mask></defs>'
                f'<g fill="{color}" mask="url(#o-counter)">'
                '<path d="M16 20H62V34H30V57H62V71H30V108H16Z"/>'
                '<path d="M68 20H112V34L80 94H112V108H60V94L92 34H68Z"/>'
                '<circle cx="65" cy="64" r="18"/></g>')
    # Keep the familiar FoZ spelling, optically tightened for an editorial imprint.
    return text("FoZ", 6.45, 89, 70, color, "serif", editable, tracking=-3)


def composition(slug, form, color, editable=False):
    if form == "mark":
        return 128, 128, symbol(slug, color, editable)
    if slug == "academic-wordmark":
        if form == "horizontal":
            return 494, 110, text("FANS of Zona", 16, 83, 73, color, "serif", editable, -.7)
        return 480, 280, (text("FANS", 20, 134, 128, color, "serif", editable, -1.2)
                          + text("of Zona", 20, 248, 120, color, "serif", editable, -1.2))
    if form == "horizontal":
        return 498, 128, (symbol(slug, color, editable)
                          + text("FANS of Zona", 156, 82, 51, color, "medium", editable, -.8))
    label = "FANS of Zona"
    title_x = (440 - text_width(label, 48, "medium", -.7)) / 2
    return 440, 224, (f'<g transform="translate(156 4)">{symbol(slug, color, editable)}</g>'
                       + text(label, title_x, 193, 48, color, "medium", editable, -.7))


def svg_doc(slug, title, form, color, editable=False):
    width, height, drawing = composition(slug, form, color, editable)
    desc = "Editable lettering master; requires the bundled Geist fonts." if editable else "Outlined vector artwork; no fonts required."
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">\n'
            f'<title id="title">FANS of Zona — {escape(title)}, {form}</title>\n'
            f'<desc id="desc">{desc}</desc>\n{drawing}\n</svg>\n')


def build():
    assets = []
    for slug, title in CONCEPTS:
        out = ROOT / "logos" / slug
        out.mkdir(parents=True, exist_ok=True)
        source = ROOT / "sources" / slug
        source.mkdir(parents=True, exist_ok=True)
        for form in ["mark", "horizontal", "stacked"]:
            for tone, color in COLORS.items():
                name = f"{form}-{tone}.svg"
                (out / name).write_text(svg_doc(slug, title, form, color))
                assets.append({"concept": slug, "form": form, "tone": tone,
                               "svg": f"logos/{slug}/{name}",
                               "png": f"logos/{slug}/{form}-{tone}.png"})
            (source / f"{form}.svg").write_text(svg_doc(slug, title, form, COLORS["navy"], True))
    (ROOT / "logos/manifest.json").write_text(json.dumps(assets, indent=2) + "\n")
    print(f"Created {len(assets)} outlined SVGs and 9 editable masters.")


if __name__ == "__main__":
    build()
