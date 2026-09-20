/**
 * Builds /public/hero-gj.mp4 (and its poster) from the master in /assets-source.
 *
 * The master is already 1920x1080 — native 16:9, the shape the hero actually
 * wants — so this does not crop, upscale or sharpen anything, unlike the earlier
 * pipeline that had to rescue a 720x1280 phone reel. It only:
 *
 *   1. re-encodes for the web at close to visually transparent quality;
 *   2. strips the audio, since it is a muted background;
 *   3. moves the moov atom to the front so playback can start before the whole
 *      file has arrived.
 *
 * Nothing here can add detail, so the job is simply to throw none away while
 * keeping the file light enough not to dominate the first load.
 *
 *   node scripts/build-hero-video.mjs
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import ffmpeg from "ffmpeg-static";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets-source", "hero-source.mp4");
const OUT = path.join(ROOT, "public", "hero-gj.mp4");
const POSTER = path.join(ROOT, "public", "hero-gj-poster.jpg");

// The original branded reel of the team on a job. Lives in the About section,
// where its 9:16 shape fits a column instead of fighting a 16:9 hero.
const REEL_SRC = path.join(ROOT, "assets-source", "hero-reel-720p-source.mp4");
const REEL_OUT = path.join(ROOT, "public", "team-reel.mp4");
const REEL_TRIM = 24; // the opening stretch, before the camera drifts onto packed-up gear

if (!fs.existsSync(SRC)) {
  console.error(`Missing source: ${SRC}`);
  process.exit(1);
}

const run = (args) =>
  execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });

run([
  "-i", SRC,
  "-c:v", "libx264",
  "-crf", "21",
  "-maxrate", "5000k",
  "-bufsize", "10000k",
  "-preset", "slower",
  "-pix_fmt", "yuv420p",
  "-an",
  "-movflags", "+faststart",
  OUT,
]);

// The reel stays at its native 720x1280 — it renders about 330px wide, so it is
// only ever downscaled. No crop or upscale, unlike when it was the background.
if (fs.existsSync(REEL_SRC)) {
  run([
    "-ss", "0",
    "-t", String(REEL_TRIM),
    "-i", REEL_SRC,
    "-c:v", "libx264",
    "-crf", "22",
    "-preset", "slower",
    "-pix_fmt", "yuv420p",
    "-an",
    "-movflags", "+faststart",
    REEL_OUT,
  ]);
}

// Poster is pulled from the encoded file so it matches the opening frames exactly.
run(["-ss", "1", "-i", OUT, "-frames:v", "1", "-q:v", "3", POSTER]);

const mb = (f) => (fs.statSync(f).size / 1024 / 1024).toFixed(1) + "mb";
console.log(`hero-gj.mp4        1920x1080  ${mb(OUT)}`);
console.log(`hero-gj-poster.jpg            ${mb(POSTER)}`);
if (fs.existsSync(REEL_OUT)) console.log(`team-reel.mp4       720x1280  ${mb(REEL_OUT)}`);
