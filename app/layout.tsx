import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { SmoothScroll } from "@/components/smooth-scroll";
import { buildStructuredData } from "@/lib/structured-data";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Local-intent title and description. Searches that matter here are
 * "painters kirrawee", "painters sutherland shire", "house painters sydney" —
 * so the suburb and region lead rather than the brand name alone.
 */
const title = `Painters in Kirrawee & the Sutherland Shire | ${siteConfig.fullName}`;
const description =
  `Family-run painters based in ${siteConfig.locality}, servicing the Sutherland Shire and greater Sydney. ` +
  `Interior and exterior painting, spray work, decorative finishes and heritage restoration. ` +
  `Rated ${siteConfig.rating.value} from ${siteConfig.rating.count} Google reviews — call ${siteConfig.phone} for a quote.`;

export const metadata: Metadata = {
  // Required for Next to resolve the relative URLs below into absolute ones.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.fullName}`,
  },
  description,
  applicationName: siteConfig.fullName,
  keywords: [
    "painters Kirrawee",
    "painters Sutherland Shire",
    "house painters Sydney",
    "interior painting Sydney",
    "exterior painting Sutherland Shire",
    "commercial painters Sydney",
    "spray painting Sydney",
    "heritage painting restoration",
    siteConfig.fullName,
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${siteConfig.fullName} — painters in ${siteConfig.locality}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "Home Improvement",
  formatDetection: { telephone: true, address: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-lawn-700 font-sans text-stone-100">
        {/* schema.org graph: the business, the site, and the on-page FAQ. */}
        <script
          type="application/ld+json"
          // The payload is built from our own config at build time, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
