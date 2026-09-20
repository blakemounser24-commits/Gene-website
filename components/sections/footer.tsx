"use client";

import { TextEffect } from "@/components/ui/text-effect";
import { Button } from "@/components/ui/button";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { content } from "@/lib/content";

// Structural nav — tied to actual section ids on the page, not business content.
const NAVIGATION_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { footer } = content;

  return (
    <footer className="relative overflow-hidden bg-teal-900 pt-24">
      {/* Oversized brandmark bleeding off the bottom edge, barely there */}
      <img
        src={siteConfig.logo.markCream}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-24 z-0 hidden w-[42rem] max-w-none opacity-[0.06] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="border-b border-cream-50/15 pb-16 text-center">
          <TextEffect
            as="h2"
            per="word"
            variants={{
              container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
              item: {
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
              },
            }}
            className="mx-auto max-w-2xl justify-center font-display text-2xl font-medium leading-[1.3] text-cream-50 sm:text-3xl"
          >
            {footer.tagline}
          </TextEffect>
          <div className="mt-8 flex justify-center">
            <Button href="#contact" variant="primary">
              {footer.ctaLabel}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-4">
          <div>
            {/* Full stacked lockup — the footer is the one place with room for it */}
            <a href="#home" className="inline-block" aria-label={siteConfig.fullName}>
              <img
                src={siteConfig.logo.primaryCream}
                alt=""
                aria-hidden="true"
                className="h-24 w-auto sm:h-28"
              />
            </a>
            <p className="mt-5 text-sm leading-relaxed text-cream-50/65">{footer.blurb}</p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Navigation</p>
            <ul className="space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-cream-50/70 transition-colors duration-300 hover:text-cream-50">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Services</p>
            <ul className="space-y-3">
              {footer.serviceLinks.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-sm text-cream-50/70 transition-colors duration-300 hover:text-cream-50">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Get In Touch</p>
            <ul className="space-y-3 text-sm text-cream-50/70">
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 shrink-0 text-orange-500" />
                <a href={siteConfig.phoneHref} className="transition-colors duration-300 hover:text-cream-50">{siteConfig.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0 text-orange-500" />
                <a href={`mailto:${siteConfig.email}`} className="transition-opacity duration-300 hover:opacity-100">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-orange-500" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock3 size={15} className="mt-0.5 shrink-0 text-orange-500" />
                <span>{siteConfig.hours.display}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream-50/15 py-8 text-xs text-cream-50/55 sm:flex-row">
          <p>&copy; {year} &ndash; All rights reserved. &bull; {siteConfig.fullName}</p>
          <div className="flex gap-6">
            {footer.legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition-opacity duration-300 hover:opacity-100">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
