# GJ Paint Partners

Marketing site for GJ Paint Partners Pty Ltd — painters in Kirrawee, servicing the
Sutherland Shire and greater Sydney.

Next.js (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · GSAP + Lenis.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

| Path | What it is |
| --- | --- |
| `lib/site-config.ts` | Business details — name, phone, email, address, hours, rating, service areas, logo paths. **Change the business here, not in components.** |
| `lib/content.ts` | All page copy and media paths. |
| `lib/structured-data.ts` | schema.org JSON-LD, derived from the two files above. |
| `components/sections/` | One file per page section. |
| `components/ui/` | Reusable animation and layout primitives. |
| `public/` | Only what the browser downloads. Generated — see below. |
| `assets-source/` | Full-resolution masters. Never served; the build scripts read from here. |
| `logo/` | The client's original logo PDFs. |

Content and config feed both the page and the structured data, so what a visitor
reads and what a search engine is told cannot drift apart.

## Asset pipeline

Everything in `public/` is generated. Re-run these after changing a master or a
path in `lib/content.ts`:

```bash
node scripts/build-images.mjs      # masters -> web-sized JPEGs (long edge 1200px)
node scripts/build-hero-video.mjs  # hero background + the About team reel
node scripts/build-logos.mjs       # logo SVGs + app/icon.svg, extracted from the PDFs
node scripts/build-og-image.mjs    # public/og.jpg social card (needs the dev server running)
```

`build-images.mjs` only emits photos that `lib/content.ts` actually references —
the masters folder holds the full library, and shipping all of it would put
around twenty unused photos into `public/`.

`build-logos.mjs` parses the vector artwork straight out of the supplied PDFs
(`scripts/extract-pdf-art.mjs`), so the logo on the site is the real artwork
rather than a trace or a screenshot.

## Before launch

- [ ] **Set the real domain.** `url` in `lib/site-config.ts` is currently
      `https://gjpaintpartners.com.au`, inferred from the contact email. Every
      canonical URL, Open Graph tag, sitemap entry and structured-data reference
      is built from it.
- [ ] Replace the contact form's submit handler — it currently only sets local
      state and does not send anything (`components/sections/contact.tsx`).
- [ ] Confirm two gallery photos that are credited to other accounts on Instagram
      ("Parker Studio" and "Level Built") are cleared for use.

## Performance notes

Worth knowing before changing anything in these areas:

- **Videos pause when off-screen.** A 1080p video decodes 30fps whether or not it
  is visible, and that comes out of the scroll budget. Removing the
  `IntersectionObserver` in `components/hero.tsx` or `about.tsx` reintroduces
  dropped frames across the whole page.
- **Avoid animating `filter`.** Per-word `blur()` reveals and `drop-shadow` on
  moving elements were the single largest source of jank here; reveals use
  opacity and transform instead, which composite for free.
- **Images are capped at 1200px.** The Instagram masters are up to 12 megapixels;
  decoding those on the main thread stalled scrolling for hundreds of
  milliseconds.
