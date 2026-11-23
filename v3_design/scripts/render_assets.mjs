// Uses the website's existing sharp dependency; no package changes required.
import sharp from 'sharp';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = JSON.parse(await readFile(path.join(root, 'logos/manifest.json'), 'utf8'));
const inks = {navy:[12,35,75], red:[171,5,32], white:[255,255,255]};
async function raster(buffer, dimensions, tone) {
  const {data, info} = await sharp(buffer).resize(dimensions).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  // The mask rasterizer can round RGB values during premultiplication. These
  // single-ink marks retain the rendered alpha, with the exact specified ink.
  const [r,g,b] = inks[tone];
  for (let i=0; i<data.length; i+=4) { data[i]=r; data[i+1]=g; data[i+2]=b; }
  return sharp(data, {raw:{width:info.width,height:info.height,channels:4}}).png().toBuffer();
}
for (const asset of assets) {
  const buffer = await readFile(path.join(root, asset.svg));
  const width = asset.form === 'mark' ? 512 : asset.form === 'stacked' ? 960 : 1600;
  await writeFile(path.join(root, asset.png), await raster(buffer, {width}, asset.tone));
  if (asset.form === 'mark') {
    for (const size of [16, 24, 48, 128]) {
      await writeFile(path.join(root, `logos/${asset.concept}/icon-${asset.tone}-${size}.png`),
        await raster(buffer, {width:size,height:size}, asset.tone));
    }
    if (asset.tone === 'navy') {
      await writeFile(path.join(root, `logos/${asset.concept}/favicon-32.png`),
        await raster(buffer, {width:32,height:32}, 'navy'));
    }
  }
}
// Contact sheet also proves white exports are visible on dark backgrounds.
const background = '#FFFFFF';
const overlays = [];
const concepts = ['field-of-view', 'foz-monogram', 'academic-wordmark'];
for (const [row, slug] of concepts.entries()) {
  for (const [col, tone] of ['navy', 'red', 'white'].entries()) {
    const ink = tone === 'white' ? '#0C234B' : '#FFFFFF';
    const tile = await sharp({create:{width:360,height:240,channels:4,background:ink}})
      .composite([{input:await sharp(path.join(root, `logos/${slug}/mark-${tone}.svg`)).resize(160).toBuffer(),left:100,top:40}])
      .png().toBuffer();
    overlays.push({input:tile,left:col*360,top:row*240});
  }
}
await mkdir(path.join(root, 'review'), {recursive:true});
await sharp({create:{width:1080,height:720,channels:4,background}}).composite(overlays)
  .png().toFile(path.join(root, 'review/logo-contact-sheet.png'));
console.log('Rendered 27 transparent PNGs, 36 size proofs, 3 favicons, and the contact sheet.');
