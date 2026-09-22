/**
 * Central place to rebrand this template for a new client.
 * Update these values and the whole site (nav, footer, contact, map) follows.
 */
export const siteConfig = {
  // Set this to the live domain before launch — every canonical URL, Open Graph
  // tag, sitemap entry and structured-data reference is built from it.
  url: "https://gjpaintpartners.com.au",
  name: "GJ Paint Partners",
  legalName: "GJ Paint Partners Pty Ltd",
  suffix: "Painting & Decorating",
  fullName: "GJ Paint Partners",
  tagline: "Painting & Decorating",
  description:
    "Considered colour and meticulous finishes — interiors and exteriors prepared with care and painted to last.",
  phone: "0415 469 983",
  phoneHref: "tel:0415469983",
  email: "gene@gjpaintpartners.com.au",
  address: "4-6 Bligh St, Kirrawee NSW 2232",
  rating: { value: "5.0", count: 24 },
  // Seven days, 7am–6pm. Mirrored into the structured data so the hours shown on
  // the page and the ones given to search engines can never disagree.
  hours: { days: "Monday to Sunday", opens: "07:00", closes: "18:00", display: "7am – 6pm, seven days" },
  // Structured-data fields. Suburb/region are split out because schema.org wants
  // them separately, and search engines match local intent on them.
  locality: "Kirrawee",
  region: "NSW",
  postcode: "2232",
  street: "4-6 Bligh St",
  country: "AU",
  // Suburbs the business covers, used for areaServed in the structured data.
  areasServed: [
    "Kirrawee",
    "Sutherland Shire",
    "Cronulla",
    "Miranda",
    "Caringbah",
    "Sylvania",
    "Gymea",
    "Engadine",
    "Como",
    "Oatley",
    "Hurstville",
    "Sydney",
  ],
  social: {
    instagram: "https://www.instagram.com/gjpaintpartners/",
    facebook: "https://www.facebook.com/people/GJ-Paint-Partners/100095083085322/",
  },
  /**
   * Brand artwork, generated from /logo by `node scripts/build-logos.mjs`.
   * `primary` is the lockup exactly as supplied (teal + orange) for cream
   * surfaces; the `-cream` variants swap the teal for cream so it reads on the
   * deep-teal footer and over the hero video.
   */
  logo: {
    primary: "/logo-primary.svg",
    primaryCream: "/logo-primary-cream.svg",
    markCream: "/logo-mark-cream.svg",
  },
};
