"""Package the usable kit; exclude transient review captures and this archive itself."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "foz-v3-brand-kit.zip"
ASSETS = ROOT / "downloads/foz-v3-assets.zip"
ASSETS.parent.mkdir(exist_ok=True)

# The page links to this asset-only archive, which is included in the complete
# package. Its downloads therefore still work after extracting the full kit.
with ZipFile(ASSETS, "w", ZIP_DEFLATED, compresslevel=9) as archive:
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        relative = path.relative_to(ROOT)
        if relative.parts[0] in ("logos", "sources", "fonts") or relative.name in ("guidelines.md", "tokens.css"):
            archive.write(path, Path("v3_design") / relative)

with ZipFile(TARGET, "w", ZIP_DEFLATED, compresslevel=9) as archive:
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or path == TARGET or "__pycache__" in path.parts:
            continue
        relative = path.relative_to(ROOT)
        if relative.parts[0] == "review" and path.name != "logo-contact-sheet.png":
            continue
        archive.write(path, Path("v3_design") / relative)
print(f"Packaged {TARGET.name}: {TARGET.stat().st_size:,} bytes")
