/**
 * Builds /public/og.jpg — the 1200x630 card shown when the site is shared on
 * Facebook, LinkedIn, WhatsApp, iMessage and X.
 *
 * Composed from assets already on the site: a project photo as the ground, the
 * brand scrim over it, the cream logo lockup and the rating. Rendered in the
 * browser so it uses the real fonts and the real palette.
 *
 *   node scripts/build-og-image.mjs
 */
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "og.jpg");
const PORT = process.env.PORT ?? "3001";

const BACKDROP = "/work/DckR8ZfE8Hd-7.jpg"; // the warm living room
const LOGO = "/logo-primary-cream.svg";

const html = `<!doctype html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@500;600&display=swap" rel="stylesheet" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1200px; height: 630px; overflow: hidden; }
      .card { position: relative; width: 1200px; height: 630px; background: #022b2e; }
      .shot { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .tint { position: absolute; inset: 0; background: rgba(2, 43, 46, 0.4); }
      .scrim {
        position: absolute; inset: 0;
        background: linear-gradient(100deg, rgba(2,43,46,0.95) 0%, rgba(2,43,46,0.82) 42%, rgba(2,43,46,0.18) 100%);
      }
      .body { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; }
      .logo { height: 150px; width: auto; align-self: flex-start; }
      h1 {
        font-family: "Playfair Display", serif; font-weight: 500; color: #f6f4f1;
        font-size: 60px; line-height: 1.08; letter-spacing: -0.02em; max-width: 15ch;
      }
      h1 em { font-style: italic; color: #d9691a; }
      .foot { display: flex; align-items: center; gap: 22px; }
      .pill {
        font-family: "DM Sans", sans-serif; font-weight: 600; font-size: 19px;
        letter-spacing: 0.18em; text-transform: uppercase; color: #fffefc;
        background: #c15400; padding: 14px 26px; border-radius: 2px;
      }
      .meta { font-family: "DM Sans", sans-serif; font-size: 21px; color: rgba(246,244,241,0.82); letter-spacing: 0.01em; }
    </style>
  </head>
  <body>
    <div class="card">
      <img class="shot" src="${BACKDROP}" />
      <div class="tint"></div>
      <div class="scrim"></div>
      <div class="body">
        <img class="logo" src="${LOGO}" />
        <div>
          <h1>Painters in Kirrawee &amp; the <em>Sutherland Shire</em></h1>
          <div class="foot" style="margin-top: 34px">
            <span class="pill">5.0 ★ · 24 Google reviews</span>
            <span class="meta">Interiors · Exteriors · Commercial</span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;

fs.writeFileSync(path.join(ROOT, "public", "_og.html"), html);

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(`http://localhost:${PORT}/_og.html`, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: OUT, type: "jpeg", quality: 88 });
await browser.close();

fs.unlinkSync(path.join(ROOT, "public", "_og.html"));
console.log(`og.jpg  1200x630  ${(fs.statSync(OUT).size / 1024).toFixed(0)}kb`);
