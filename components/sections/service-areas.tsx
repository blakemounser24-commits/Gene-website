"use client";

import { TextType } from "@/components/ui/text-type";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock3, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { content } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = { Clock3, ShieldCheck };

export function ServiceAreas() {
  const { serviceAreas } = content;

  return (
    <section id="service-areas" className="relative overflow-hidden bg-lawn-700 py-28 sm:py-32">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-bronze-600">{serviceAreas.eyebrow}</p>
          {/* Real text in the h2; the typed copy alongside it is decorative. */}
          <h2 className="font-display text-3xl font-medium leading-[1.15] text-stone-50 sm:text-4xl md:text-5xl">
            <span className="sr-only">{serviceAreas.heading}</span>
            <TextType
              as="span"
              aria-hidden="true"
              text={[serviceAreas.heading]}
              loop={false}
              showCursor={false}
              typingSpeed={35}
              startOnVisible
              className="block"
            />
          </h2>
          <p className="mt-6 max-w-lg text-base leading-[1.7] text-slate-500">{serviceAreas.description}</p>

          {/* The suburbs are listed in plain text on purpose. Local search ranks on
              the words a page actually shows, so naming them here does work that
              the structured data alone cannot. */}
          <ul className="mt-7 flex max-w-lg flex-wrap gap-2">
            {serviceAreas.suburbs.map((suburb) => (
              <li
                key={suburb}
                className="rounded-full border border-teal-800/12 bg-cream-100 px-3.5 py-1.5 text-xs font-medium text-teal-700 shadow-[var(--shadow-surface)]"
              >
                {suburb}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-5">
            {serviceAreas.points.map((point, index) => {
              const Icon = ICONS[point.icon];
              return (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-cream-50">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500">{point.text}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button href={serviceAreas.cta.href} variant="primary">
              {serviceAreas.cta.label}
            </Button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-stone-50"
            >
              <MapPin size={16} className="text-bronze-600" />
              {siteConfig.address}
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] ring-1 ring-stone-100/10"
        >
          <iframe
            title={`${siteConfig.fullName} location map`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`}
            className="h-[22rem] w-full sm:h-[26rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
