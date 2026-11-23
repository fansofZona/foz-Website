"""Check the deliverable's actual links, vector geometry, and raster exports."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
from zipfile import ZipFile
from xml.etree import ElementTree as ET
import json
import struct
import zlib
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SVG = "{http://www.w3.org/2000/svg}"


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"Duplicate id: {attrs['id']}"
            self.ids.add(attrs["id"])
        for key in ("href", "src"):
            if key in attrs:
                self.links.append(attrs[key])


def png_header(path):
    raw = path.read_bytes()
    assert raw[:8] == b"\x89PNG\r\n\x1a\n", path
    width, height, depth, color, *_ = struct.unpack(">IIBBBBB", raw[16:29])
    # Every export must contain an alpha channel (RGBA, or grayscale+alpha).
    assert color in (4, 6), f"Missing alpha channel: {path} (type {color})"
    return width, height


parser = Links()
parser.feed((ROOT / "index.html").read_text())
for link in parser.links:
    url = urlsplit(link)
    if url.scheme or url.netloc:
        continue
    if url.path:
        assert (ROOT / unquote(url.path)).is_file(), f"Missing file: {link}"
    elif url.fragment:
        assert unquote(url.fragment) in parser.ids, f"Missing anchor: {link}"

manifest = json.loads((ROOT / "logos/manifest.json").read_text())
assert len(manifest) == 27
for asset in manifest:
    vector = ET.parse(ROOT / asset["svg"]).getroot()
    assert vector.tag == SVG + "svg"
    assert vector.find(SVG + "title") is not None
    assert not vector.findall(".//" + SVG + "text"), f"Unoutlined lettering: {asset['svg']}"
    assert not vector.findall(".//" + SVG + "image"), f"Embedded raster: {asset['svg']}"
    width, height = png_header(ROOT / asset["png"])
    raster = Image.open(ROOT / asset["png"]).convert("RGBA")
    alpha = raster.getchannel("A")
    bounds = alpha.getbbox()
    assert bounds and bounds[0] > 0 and bounds[1] > 0 and bounds[2] < width and bounds[3] < height, f"Clipped artwork: {asset['png']}"
    assert alpha.getextrema() == (0, 255), f"Transparency missing: {asset['png']}"
    ink = {"navy": (12,35,75), "red": (171,5,32), "white": (255,255,255)}[asset["tone"]]
    assert all(pixel[:3] == ink for count, pixel in raster.getcolors(width * height) if pixel[3]), f"Incorrect brand color: {asset['png']}"
    assert width == {"mark": 512, "horizontal": 1600, "stacked": 960}[asset["form"]]
    if asset["form"] == "mark":
        assert height == 512
        for size in (16, 24, 48, 128):
            assert png_header(ROOT / f"logos/{asset['concept']}/icon-{asset['tone']}-{size}.png") == (size, size)

for slug in {a["concept"] for a in manifest}:
    assert png_header(ROOT / f"logos/{slug}/favicon-32.png") == (32, 32)
    for form in ("mark", "horizontal", "stacked"):
        ET.parse(ROOT / f"sources/{slug}/{form}.svg")

counter = Image.open(ROOT / "logos/foz-monogram/mark-navy.png").convert("RGBA")
assert counter.getpixel((260,256))[3] == 0, "The monogram counter must remain transparent"

with ZipFile(ROOT / "foz-v3-brand-kit.zip") as archive:
    assert archive.testzip() is None
    names = set(archive.namelist())
    for relative in ("index.html", "guidelines.md", "tokens.css", "fonts/OFL.txt"):
        assert "v3_design/" + relative in names
    assert "v3_design/downloads/foz-v3-assets.zip" in names
    for asset in manifest:
        assert "v3_design/" + asset["svg"] in names
        assert "v3_design/" + asset["png"] in names

print(f"PASS: {len(parser.links)} page references, 27 SVG/PNG pairs, 36 size proofs, 3 favicons, 9 masters, and archive integrity.")
