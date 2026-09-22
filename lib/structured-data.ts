import { siteConfig } from "@/lib/site-config";
import { content } from "@/lib/content";

/**
 * schema.org JSON-LD for the business.
 *
 * `Painter` is a recognised LocalBusiness subtype, which is what gets this into
 * local packs and rich results rather than being treated as a generic page. The
 * aggregateRating and the FAQ block are the two pieces that can actually change
 * how the listing renders in search.
 *
 * Everything here is derived from site-config and content, so the copy on the
 * page and the data given to search engines cannot drift apart.
 */
export function buildStructuredData() {
  const businessId = `${siteConfig.url}/#business`;

  const business = {
    "@type": "Painter",
    "@id": businessId,
    name: siteConfig.fullName,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/opengraph-image`,
    logo: `${siteConfig.url}${siteConfig.logo.primary}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.street,
      addressLocality: siteConfig.locality,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postcode,
      addressCountry: siteConfig.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
      },
    ],
    areaServed: siteConfig.areasServed.map((name) => ({ "@type": "Place", name })),
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating.value,
      reviewCount: siteConfig.rating.count,
      bestRating: "5",
    },
    // The real Google reviews already on the page.
    review: content.testimonials.items.slice(0, 5).map((item) => ({
      "@type": "Review",
      author: { "@type": "Person", name: item.name },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: item.quote,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting and decorating services",
      itemListElement: content.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          ...(service.description ? { description: service.description } : {}),
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.fullName,
    publisher: { "@id": businessId },
    inLanguage: "en-AU",
  };

  // Mirrors the on-page FAQ so it stays eligible for the FAQ rich result.
  const faq = {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [business, website, faq] };
}
