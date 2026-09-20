"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ScrollFloat } from "@/components/ui/scroll-float";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { TextEffect } from "@/components/ui/text-effect";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Scroll-reactive photo grid: the faster the page moves, the further each tile
 * skews, settling back to square when the scroll stops. The skew is driven by
 * one shared spring rather than one per tile, so twelve images cost a single
 * animation frame's worth of work.
 */
export function Gallery() {
  const { gallery } = content;
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothed = useSpring(velocity, { mass: 0.1, stiffness: 80, damping: 40 });
  const skewX = useTransform(smoothed, [-1500, 0, 1500], [-8, 0, 8], { clamp: true });

  return (
    <section id="gallery" className="relative bg-cream-50 py-28 sm:py-32">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-orange-600">
          <VerticalCutReveal
            splitBy="chars"
            staggerDuration={0.03}
            staggerFrom="center"
            containerClassName="justify-center"
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            {gallery.eyebrow}
          </VerticalCutReveal>
        </p>
        <ScrollFloat containerClassName="justify-center" textClassName="font-display font-medium text-teal-600">
          {gallery.heading}
        </ScrollFloat>
        <TextEffect
          as="p"
          per="word"
          preset="slide"
          className="mx-auto mt-4 max-w-xl justify-center text-base leading-[1.7] text-slate-500"
        >
          {gallery.subhead}
        </TextEffect>
      </div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.items.map((item, index) => {
          /* Published work is the strongest proof on the page, so it does not
             hide behind a hover: the credit and caption sit on the tile from the
             start, over a permanent scrim, inside an orange hairline that marks
             the set out from the rest of the grid. */
          const credit = "credit" in item ? item.credit : undefined;

          return (
            <motion.figure
              key={item.image}
              style={reduceMotion ? undefined : { skewX }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative h-72 transform-gpu overflow-hidden rounded-xl will-change-transform sm:h-80",
                credit
                  ? "shadow-[var(--shadow-elevated)] ring-1 ring-orange-600/35"
                  : "shadow-[var(--shadow-surface)]"
              )}
            >
              <img
                src={item.image}
                alt={item.label}
                // The first row is above the fold once the section is reached
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                width={900}
                height={720}
                // Slightly oversized so the skew never exposes the tile's edges
                className="absolute inset-0 h-full w-full scale-[1.15] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.22]"
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900 via-teal-900/25 to-transparent transition-opacity duration-500",
                  credit ? "via-55% opacity-100" : "via-45% opacity-0 group-hover:opacity-100"
                )}
                aria-hidden="true"
              />

              {credit && (
                <span className="absolute left-5 top-5 rounded-full bg-cream-50/95 px-3 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-teal-800 shadow-[var(--shadow-surface)]">
                  Published
                </span>
              )}

              <figcaption
                className={cn(
                  "absolute inset-x-0 bottom-0 p-6 transition-all duration-500",
                  credit ? "" : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                <span
                  className={cn(
                    "mb-1.5 block font-sans font-semibold text-orange-500",
                    credit ? "text-[11px] uppercase tracking-[0.24em]" : "text-[10px] tracking-[0.3em]"
                  )}
                >
                  {credit ?? String(index + 1).padStart(2, "0")}
                </span>
                <p
                  className={cn(
                    "font-display font-medium leading-tight text-cream-50",
                    credit ? "text-xl sm:text-[22px]" : "text-lg"
                  )}
                >
                  {item.label}
                </p>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
