"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ScrollFloat } from "@/components/ui/scroll-float";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { TextEffect } from "@/components/ui/text-effect";
import { content } from "@/lib/content";

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
        {gallery.items.map((item, index) => (
          <motion.figure
            key={item.image}
            style={reduceMotion ? undefined : { skewX }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-72 transform-gpu overflow-hidden rounded-xl shadow-[var(--shadow-surface)] will-change-transform sm:h-80"
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
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900/85 via-teal-900/10 via-45% to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="mb-1.5 block font-sans text-[10px] font-semibold tracking-[0.3em] text-orange-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-lg font-medium leading-tight text-cream-50">{item.label}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
