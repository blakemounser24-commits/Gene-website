"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { FlippingCard } from "@/components/ui/flipping-card";
import { TextEffect } from "@/components/ui/text-effect";
import { ArrowRight, ShieldCheck, Users, Gem, BadgeDollarSign, type LucideIcon } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

const PROMISE_ICONS: LucideIcon[] = [ShieldCheck, Users, Gem, BadgeDollarSign];

const PHOTO_ALT = [
  "The GJ Paint Partners team",
  "Two of the GJ Paint Partners painters on site",
  "GJ Paint Partners painters at work",
];

const revealVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.3, duration: 0.7 },
  }),
  hidden: { y: 40, opacity: 0 },
};

const revealVariants3: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.3, duration: 0.7 },
  }),
  hidden: { opacity: 0 },
};

/**
 * Body copy, not a headline — the words ripple in over about a third of a second
 * rather than arriving one at a time. Slow enough to notice, fast enough that
 * the sentence is readable almost immediately.
 */
const PARAGRAPH_VARIANTS = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.014 } } },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const } },
  },
};

export function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLVideoElement>(null);

  // Autoplay only while it is actually on screen. A video decoding away below the
  // fold costs frames for the rest of the page.
  useEffect(() => {
    const video = reelRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  const { about } = content;
  const [group, ...portraits] = about.images;

  return (
    <section id="about" className="relative overflow-hidden bg-lawn-700 px-4 py-28 sm:py-32" ref={heroRef}>
      {/* Copy and photos share a row, so the claims and the faces making them read
          together instead of sitting a screen apart. */}
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <TimelineContent
            as="p"
            animationNum={-1}
            customVariants={revealVariants3}
            timelineRef={heroRef}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-bronze-600"
          >
            {about.eyebrow}
          </TimelineContent>

          <h2 className="mb-6 font-display text-3xl font-medium leading-[1.15] text-stone-50 sm:text-4xl md:text-[2.75rem]">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 250, damping: 30, delay: 0.2 }}
            >
              {about.heading}
            </VerticalCutReveal>
          </h2>

          <TextEffect
            as="p"
            per="word"
            variants={PARAGRAPH_VARIANTS}
            className="max-w-lg text-base leading-[1.75] text-slate-500"
          >
            {about.paragraph}
          </TextEffect>

          <TimelineContent
            as="div"
            animationNum={1}
            customVariants={revealVariants3}
            timelineRef={heroRef}
            className="mt-9 grid grid-cols-3 gap-4 border-y border-teal-800/10 py-6"
          >
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-medium leading-none text-teal-600 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs leading-snug text-slate-500">{stat.label}</p>
              </div>
            ))}
          </TimelineContent>

          <TimelineContent as="div" animationNum={2} customVariants={revealVariants3} timelineRef={heroRef}>
            <a
              href={about.cta.href}
              className="group mt-9 flex w-fit items-center gap-2 rounded-full border border-orange-600/30 bg-cream-100 px-6 py-3 text-sm text-teal-600 shadow-[var(--shadow-surface)] transition-transform duration-300 hover:gap-4 active:scale-[0.97]"
            >
              {about.cta.label}
              <ArrowRight size={16} className="text-gold-400" />
            </a>
          </TimelineContent>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* The whole crew, across the top — the one shot that needs width. */}
          <motion.figure
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] ring-1 ring-stone-100/10 transition-shadow duration-300 hover:shadow-[var(--shadow-floating)] hover:ring-orange-600/40"
          >
            <img
              src={group}
              alt={PHOTO_ALT[0]}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-teal-900/15 opacity-100 transition-opacity duration-500 group-hover:opacity-0"
              aria-hidden="true"
            />
          </motion.figure>

          {/* The reel spans both rows below, so its 9:16 shape sets the height and
              the two portraits split it alongside. */}
          <motion.figure
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative row-span-2 aspect-[3/4] overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] ring-1 ring-stone-100/10 transition-shadow duration-300 hover:shadow-[var(--shadow-floating)] hover:ring-orange-600/40"
          >
            <video
              ref={reelRef}
              className="h-full w-full object-cover"
              src={about.video}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="The GJ Paint Partners team on a job"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-teal-900/15 opacity-100 transition-opacity duration-500 group-hover:opacity-0"
              aria-hidden="true"
            />
          </motion.figure>

          {portraits.map((src, index) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: (index + 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] ring-1 ring-stone-100/10 transition-shadow duration-300 hover:shadow-[var(--shadow-floating)] hover:ring-orange-600/40"
            >
              <img
                src={src}
                alt={PHOTO_ALT[index + 1] ?? "The GJ Paint Partners team"}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-teal-900/15 opacity-100 transition-opacity duration-500 group-hover:opacity-0"
                aria-hidden="true"
              />
            </motion.figure>
          ))}
        </div>
      </div>

      {/* The promise cards get their own row below, clear of the photos */}
      <div className="relative z-10 mx-auto mt-20 flex max-w-6xl flex-wrap items-center justify-center gap-8">
        {about.promiseCards.map((card, index) => {
          const Icon = PROMISE_ICONS[index % PROMISE_ICONS.length];
          return (
            <TimelineContent
              key={card.front}
              as="div"
              animationNum={3 + index}
              customVariants={revealVariants}
              timelineRef={heroRef}
            >
              <FlippingCard
                height={220}
                width={260}
                frontContent={
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-cream-50 shadow-[var(--shadow-surface)]">
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <p className="font-display text-lg font-medium text-stone-50">{card.front}</p>
                  </div>
                }
                backContent={
                  <div className="flex h-full w-full items-center justify-center bg-cream-100 p-6 text-center">
                    <p className="text-sm leading-relaxed text-stone-200/90">{card.back}</p>
                  </div>
                }
              />
            </TimelineContent>
          );
        })}
      </div>
    </section>
  );
}
