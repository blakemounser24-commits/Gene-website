/**
 * Rebuilds /public/work from the full-resolution masters in /assets-source/work.
 *
 * The originals come straight off Instagram at up to 3024x4032 — twelve
 * megapixels for a card that renders 400px wide. The browser has to decode
 * every one of those on the main thread, which is what made scrolling into the
 * services rail and the gallery stutter. Capping the long edge at 1200px keeps
 * them sharp on a 2x display (the largest slot renders ~600px wide) while
 * cutting the decode cost by roughly 25x.
 *
 *   node scripts/build-images.mjs
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import ffmpeg from "ffmpeg-static";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets-source", "work");
const OUT = path.join(ROOT, "public", "work");

const MAX_EDGE = 1200;
const QUALITY = 4; // ffmpeg mjpeg scale, 2 (best) – 31 (worst)

if (!fs.existsSync(SRC)) {
  console.error(`Missing masters: ${SRC}`);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

// Only build what the site actually references. The masters folder is the full
// library pulled from the client's feed; shipping all of it would put ~20 unused
// photos into /public.
const content = fs.readFileSync(path.join(ROOT, "lib", "content.ts"), "utf8");
const referenced = new Set([...content.matchAll(/\/work\/([^"']+\.jpg)/g)].map((m) => m[1]));

const masters = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f));
const files = masters.filter((f) => referenced.has(f));

const missing = [...referenced].filter((f) => !masters.includes(f));
if (missing.length) {
  console.error(`Referenced but missing from masters: ${missing.join(", ")}`);
  process.exit(1);
}

let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(SRC, file);
  const out = path.join(OUT, file);
  // Cap the long edge without upscaling anything already smaller.
  const filter = `scale='if(gt(iw,ih),min(${MAX_EDGE},iw),-2)':'if(gt(iw,ih),-2,min(${MAX_EDGE},ih))':flags=lanczos`;
  execFileSync(
    ffmpeg,
    ["-hide_banner", "-loglevel", "error", "-y", "-i", src, "-vf", filter, "-q:v", String(QUALITY), out],
    { stdio: "inherit" }
  );
  before += fs.statSync(src).size;
  after += fs.statSync(out).size;
}

const mb = (n) => (n / 1024 / 1024).toFixed(1) + "MB";
console.log(
  `${files.length} of ${masters.length} masters used: ${mb(before)} -> ${mb(after)} ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`
);
