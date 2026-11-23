"""Build the static review page; all content and assets work without a server."""
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
DIRECTIONS = [
    dict(slug="field-of-view", name="Field of View", idea="The question comes into focus.",
         summary="An open field, an observation at its center. Two opposing corners give the mark structure without closing it in.",
         why="The boundaries suggest a playing surface and the frame of an investigation. The central dot is the observation: a ball, an event, a question worth studying. The open corners leave room for the next finding.",
         use="Best for an identity that can grow across sports, data tools, and publications.",
         detail="12-unit boundary weight. 24-unit central observation. A 128-unit drawing space.",
         risk="The symbol is abstract; use the full club name when introducing it to a new audience.",
         title="Expected Threat in College Soccer", authors="Maya Chen and Diego Fuentes", year="2026"),
    dict(slug="foz-monogram", name="FoZ Monogram", idea="Three letters. One shared structure.",
         summary="The F and Z share a midline. A circular counter cuts through their meeting point to make room for the o.",
         why="The diagonal gives the mark direction, while the shared counter keeps the lettering connected. It is compact enough for an avatar and recognizable as FoZ when paired with the club name.",
         use="Best for club recognition, profile images, apparel, and small digital placements.",
         detail="14-unit stems. An 18-unit outer circle and a 9-unit open counter.",
         risk="Its athletic energy is stronger than the other directions; keep the surrounding typography quiet.",
         title="Shot Quality vs. Rebounding Luck", authors="Jordan Okafor and Lin Wei", year="2025"),
    dict(slug="academic-wordmark", name="Academic Wordmark", idea="Let the name do the work.",
         summary="A serif signature with carefully tightened spacing. The full name leads, with a FoZ imprint for smaller uses.",
         why="Geist Serif gives the name the cadence of a publication. The compact FoZ signature carries that same voice into footers and avatars, while Geist Sans keeps functional information clear.",
         use="Best for the simple, academic website direction and research report covers.",
         detail="Geist Serif Regular lettering. A shared baseline, optical spacing, and a compact FoZ signature.",
         risk="The letterforms need more room at small sizes; the compact signature starts at 24px.",
         title="Rotation Value in Volleyball", authors="Elena Varga and Chris Dunlap", year="2024"),
]


def concept(d):
    slug, name = d['slug'], d['name']
    return f'''
<section class="direction" id="{slug}" aria-labelledby="{slug}-title">
  <div class="direction-heading">
    <h2 id="{slug}-title">{name}</h2>
    <p>{d['idea']}</p>
  </div>
  <div class="concept-overview">
    <div class="concept-story">
      <p class="lead">{d['summary']}</p>
      <p>{d['why']}</p>
      <p class="best-use">{d['use']}</p>
      <p class="tradeoff"><span>Tradeoff</span> {d['risk']}</p>
    </div>
    <div class="asset-viewer" data-concept="{slug}">
      <div class="asset-stage" data-tone="navy" data-form="horizontal">
        <img class="asset-image" src="logos/{slug}/horizontal-navy.svg" alt="{name}: horizontal FANS of Zona logo" width="498" height="128">
      </div>
      <div class="asset-controls">
        <label>Arrangement<select data-form-select aria-label="{name} arrangement"><option value="horizontal">Horizontal</option><option value="stacked">Stacked</option><option value="mark">Compact mark</option></select></label>
        <label>Ink<select data-tone-select aria-label="{name} ink"><option value="navy">Navy</option><option value="red">Red</option><option value="white">White</option></select></label>
        <div class="asset-downloads"><a data-svg-download href="logos/{slug}/horizontal-navy.svg" download>SVG</a><a data-png-download href="logos/{slug}/horizontal-navy.png" download>PNG</a></div>
      </div>
      <p class="construction">{d['detail']}</p>
    </div>
  </div>
  <div class="applications">
    <figure class="website-application">
      <div class="site-preview">
        <div class="site-preview-header"><img src="logos/{slug}/horizontal-navy.svg" alt="{name} website masthead" width="210" height="54"><span>Home&nbsp;&nbsp; Publications&nbsp;&nbsp; About</span></div>
        <div class="site-preview-body"><h3>A closer look<br>at the game.</h3><p>Student sports analytics at the University of Arizona.</p><span class="sample-link">Explore our publications</span></div>
        <div class="site-preview-publication"><span>Research report / {d['year']}</span><h4>{d['title']}</h4><p>{d['authors']}</p></div>
      </div>
      <figcaption>Website masthead and publication hierarchy</figcaption>
    </figure>
    <figure class="report-application">
      <div class="report-cover">
        <img src="logos/{slug}/horizontal-navy.svg" alt="{name} report cover logo" width="210" height="54">
        <div class="report-title"><h3>{d['title']}</h3><p>{d['authors']}</p></div>
        <div class="report-meta"><span>Research report</span><span>{d['year']}</span></div>
      </div>
      <figcaption>Research report cover</figcaption>
    </figure>
  </div>
  <div class="small-sizes">
    <div><h3>Small, still clear.</h3><p>{'Minimum compact mark: 24px. The 16px proof shows its limit.' if slug == 'academic-wordmark' else 'Minimum compact mark: 16px. Use the full name nearby at first introduction.'}</p></div>
    <div class="size-proofs">{''.join(f'<figure><img src="logos/{slug}/icon-navy-{size}.png" alt="{name} at {size} pixels" width="{size}" height="{size}"><figcaption>{size}px</figcaption></figure>' for size in [16,24,48,128])}</div>
  </div>
</section>'''


def build():
    previews = ''.join(f'''<a class="direction-preview" href="#{d['slug']}"><div class="preview-stage"><img data-preview-mark="{d['slug']}" src="logos/{d['slug']}/mark-navy.svg" alt="{d['name']} compact logo" width="160" height="160"></div><h2>{d['name']}</h2><p>{d['summary'].split('. ')[0]}.</p><span class="preview-link">Explore direction</span></a>''' for d in DIRECTIONS)
    content = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#FFFFFF">
  <title>FoZ V3 — Identity studies</title>
  <meta name="description" content="Three original logo directions and an academic visual system for FANS of Zona.">
  <link rel="icon" href="logos/academic-wordmark/favicon-32.png" type="image/png">
  <link rel="preload" href="fonts/geist-serif-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="fonts/geist-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="styles.css">
  <script src="app.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to the identity studies</a>
<div class="page">
  <header class="masthead"><a class="brand-name" href="#main">FANS of Zona</a><span>V3 / Identity studies</span><a href="downloads/foz-v3-assets.zip" download>Download the assets</a></header>
  <main id="main">
    <section class="introduction" aria-labelledby="page-title">
      <h1 id="page-title">Three ways to<br>see the game.</h1>
      <div><p class="lead">An identity for the questions, the research, and the people behind it.</p><p>Three directions for FANS of Zona. One shared palette and type system, built around a simple academic website.</p><a href="#system">View the shared guidelines</a></div>
    </section>
    <section class="comparison" aria-label="Compare the three logo directions">
      <div class="comparison-toolbar"><p>Start with the mark.</p><fieldset class="background-control"><legend>Background</legend><button type="button" data-background="white" aria-pressed="true">White</button><button type="button" data-background="navy" aria-pressed="false">Navy</button><button type="button" data-background="red" aria-pressed="false">Red</button></fieldset></div>
      <div class="direction-previews" data-background="white">''' + previews + '''</div>
    </section>
    <aside class="recommendation"><h2>Our recommendation</h2><div><p class="lead">Academic Wordmark for the website.</p><p>It gives the research a clear editorial voice and matches the restrained V3 layouts. Choose FoZ Monogram if a compact club emblem matters most; choose Field of View for a more abstract research identity.</p></div></aside>
    ''' + ''.join(concept(d) for d in DIRECTIONS) + '''
    <section class="shared-system" id="system" aria-labelledby="system-title">
      <div class="direction-heading"><h2 id="system-title">One shared system.</h2><p>White space. Clear hierarchy. Evidence first.</p></div>
      <div class="palette">
        <div class="swatch white"><h3>White</h3><p>#FFFFFF<br>RGB 255, 255, 255</p><span>Primary canvas</span></div>
        <div class="swatch navy"><h3>Navy</h3><p>#0C234B<br>RGB 12, 35, 75</p><span>Text and identity</span></div>
        <div class="swatch red"><h3>Red</h3><p>#AB0520<br>RGB 171, 5, 32</p><span>Links and emphasis</span></div>
      </div>
      <div class="type-system"><div><h3>Geist Serif</h3><p class="serif-specimen">A question worth<br>checking.</p><p>Regular. Headlines, publication titles, and the academic wordmark.</p></div><div><h3>Geist Sans</h3><p class="sans-specimen">The question.<br>The method.<br>The caveats.</p><p>Regular and Medium. Body copy, navigation, labels, authors, and dates.</p></div></div>
      <div class="type-scale"><div><span>Page title</span><strong class="scale-title">A closer look.</strong><span>60 / 68px desktop · 40 / 46px mobile</span></div><div><span>Section title</span><strong class="scale-section">Selected research</strong><span>36 / 44px</span></div><div><span>Body</span><strong class="scale-body">Show the question, the method, and the limits.</strong><span>18 / 29px</span></div><div><span>Interface</span><strong class="scale-ui">Publications / About / Contact</strong><span>16 / 24px</span></div></div>
      <div class="usage-rules"><div><h3>Give the mark room.</h3><p>Keep at least one quarter of the compact mark’s width clear on every side. Use the same unit for symbol lockups; use half the capital height for the academic wordmark.</p></div><div><h3>Keep color purposeful.</h3><p>Use navy for reading and red for links or a single point of emphasis. Reverse the logo to white on navy or red. A mark uses one ink at a time.</p></div><div><h3>Make the work legible.</h3><p>Left-align text. Keep reading columns around 65 characters. Label charts directly and distinguish series with line styles as well as color.</p></div></div>
      <div class="usage-examples"><figure class="clear-space-demo"><div class="clear-space-box"><img src="logos/field-of-view/mark-navy.svg" alt="Field of View mark surrounded by a clear space equal to one quarter of the mark width" width="128" height="128"></div><figcaption>Clear space stays empty.</figcaption></figure><figure class="reverse-demo navy"><img src="logos/academic-wordmark/horizontal-white.svg" alt="White academic wordmark on navy" width="300" height="67"><figcaption>White on navy</figcaption></figure><figure class="reverse-demo red"><img src="logos/academic-wordmark/horizontal-white.svg" alt="White academic wordmark on red" width="300" height="67"><figcaption>White on red</figcaption></figure></div>
      <p class="guideline-link"><a href="guidelines.md" download>Download the complete guidelines</a><a href="tokens.css" download>Download the design tokens</a></p>
    </section>
    <section class="files" id="files"><h2>Ready to work with.</h2><div><p>Outlined SVGs, transparent PNGs, editable masters, small-size proofs, local fonts, and the guidelines. Each logo arrangement is available in navy, red, and white.</p><div class="file-links"><a class="download-kit" href="downloads/foz-v3-assets.zip" download>Download the logo assets</a><a href="README.md">Read the asset guide</a></div><p class="file-note">These are design explorations. The current website and earlier Paper versions are unchanged.</p></div></section>
  </main>
  <footer><p>FANS of Zona / V3</p><p>Original FoZ artwork. Exploration approach informed by <a href="https://www.area.tech/openai" target="_blank" rel="noreferrer">Area’s OpenAI identity study</a>.</p></footer>
</div>
<p id="preview-status" class="sr-only" role="status" aria-live="polite"></p>
</body></html>'''
    (ROOT/'index.html').write_text(content)
    print('Built the static comparison page.')

if __name__ == '__main__':
    build()
