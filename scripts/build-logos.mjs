/**
 * Rebuilds /public/logo-*.svg from the client artwork in /logo.
 *
 * The supplied PDFs are two-colour (teal artwork + orange accents on a cream
 * card). This strips the card and crops to the artwork's true bounding box,
 * leaving the brand inks exactly as drawn — the site palette is built from
 * these colours, not the other way round. The `-cream` variants swap the teal
 * for cream so the logo still reads on the deep-teal footer.
 *
 *   node scripts/build-logos.mjs
 */
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { extractPage } from "./extract-pdf-art.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "logo");
const OUT = path.join(ROOT, "public");

// Inks as they appear in the supplied artwork.
const INK = "#007b80"; // teal — line work and "GJ Paint"
const ACCENT = "#c15400"; // burnt orange — "Partners", "EST 18'"
const CARD = "#f6f4f1"; // the cream background card, dropped entirely

// Site palette (app/globals.css) — built from the inks above.
const CREAM = "#f6f4f1";
const ORANGE_LIFTED = "#d9691a"; // the accent, lifted enough to hold on deep teal
const TEAL_DEEP = "#022b2e";

const SOURCES = {
  primary: "GJ Paint Partners Logo Primary.pdf",
  mark: "GJ Paint Partners Logo Brandmark.pdf",
  wordmark: "GJ Paint Partners Logo Wordmark.pdf",
};

// Every asset we ship, and how the two source inks are treated for it.
const TARGETS = [
  // On cream — the logo exactly as supplied.
  { name: "logo-primary", source: "primary", ink: INK, accent: ACCENT, pad: 0 },
  // On deep teal / over the hero video — teal line work swapped for cream.
  { name: "logo-primary-cream", source: "primary", ink: CREAM, accent: ORANGE_LIFTED, pad: 0 },
  { name: "logo-mark-cream", source: "mark", ink: CREAM, accent: CREAM, pad: 0 },
];

const extracted = Object.fromEntries(
  Object.entries(SOURCES).map(([key, file]) => [key, extractPage(path.join(SRC, file), 0)])
);

function body({ paths }, ink, accent) {
  return paths
    .filter((p) => p.fill.toLowerCase() !== CARD)
    .map((p) => {
      const fill = p.fill.toLowerCase() === INK ? ink : p.fill.toLowerCase() === ACCENT ? accent : p.fill;
      const rule = p.rule === "evenodd" ? ' fill-rule="evenodd"' : "";
      return `<path fill="${fill}"${rule} d="${p.d}"/>`;
    })
    .join("");
}

const browser = await puppeteer.launch();
const page = await browser.newPage();

const r = (v) => Math.round(v * 100) / 100;

async function measure(inner, [, , w, h]) {
  await page.setContent(
    `<svg id="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><g id="g">${inner}</g></svg>`
  );
  return page.evaluate(() => {
    const b = document.getElementById("g").getBBox();
    return { x: b.x, y: b.y, width: b.width, height: b.height };
  });
}

for (const target of TARGETS) {
  const art = extracted[target.source];
  const inner = body(art, target.ink, target.accent);

  // Measure the artwork's real extents (curves included) in the browser.
  const box = await measure(inner, art.mediaBox);

  const pad = target.pad;
  const vb = [r(box.x - pad), r(box.y - pad), r(box.width + pad * 2), r(box.height + pad * 2)];

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(" ")}" ` +
    `width="${vb[2]}" height="${vb[3]}" role="img" aria-label="GJ Paint Partners">` +
    inner +
    `</svg>\n`;

  const file = path.join(OUT, `${target.name}.svg`);
  fs.writeFileSync(file, svg);
  console.log(`${target.name}.svg  ${vb[2]}×${vb[3]}  ${(svg.length / 1024).toFixed(1)}kb`);
}

/* Browser tab icon and Apple touch icon: the full lockup in its supplied inks,
   centred on a cream tile so the teal reads on both light and dark browser
   chrome. Written as SVG so it stays sharp at every size a browser asks for. */
{
  const inner = body(extracted.primary, INK, ACCENT);
  const box = await measure(inner, extracted.primary.mediaBox);

  const size = 64;
  const scale = (size * 0.84) / Math.max(box.width, box.height);
  const tx = size / 2 - (box.x + box.width / 2) * scale;
  const ty = size / 2 - (box.y + box.height / 2) * scale;

  const icon = (tile) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">` +
    `<rect width="${size}" height="${size}" rx="${tile}" fill="${CREAM}"/>` +
    `<g transform="translate(${r(tx)} ${r(ty)}) scale(${r(scale)})">${inner}</g>` +
    `</svg>\n`;

  fs.writeFileSync(path.join(ROOT, "app", "icon.svg"), icon(12));
  console.log(`app/icon.svg  ${size}×${size}`);

  // Apple wants a raster at 180px and applies its own corner rounding, so this
  // one is square-cornered.
  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
  await page.setContent(
    `<body style="margin:0">${icon(0).replace("<svg ", '<svg style="width:180px;height:180px" ')}</body>`
  );
  await page.screenshot({ path: path.join(ROOT, "app", "apple-icon.png") });
  console.log("app/apple-icon.png  180×180");
}

await browser.close();
