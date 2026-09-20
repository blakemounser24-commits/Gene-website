"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";

const ease = [0.16, 1, 0.3, 1] as const;

const stack: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
};

const words = (stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

// Each word slides up from behind its own mask
const wordUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.1, ease } },
};

// Softer entrance for the italic tagline. Opacity and transform only — animating
// a blur filter here costs a raster pass per word, per frame.
const wordBlur: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease, staggerChildren: 0.05 } },
};

function Words({ text, variants, mask = true }: { text: string; variants: Variants; mask?: boolean }) {
  return text.split(" ").map((word, i, all) => (
    <span key={i} aria-hidden="true">
      <span
        className={
          mask
            ? "-mb-[0.1em] -mr-[0.08em] inline-block overflow-hidden pb-[0.1em] pr-[0.08em] align-bottom"
            : "inline-block"
        }
      >
        <motion.span variants={variants} className="inline-block will-change-transform">
          {word}
        </motion.span>
      </span>
      {i < all.length - 1 && " "}
    </span>
  ));
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Pause the video once the hero scrolls away. Left running it keeps decoding
   * 1600x1000 frames for the whole page, which is what made scrolling into the
   * services rail and the gallery stutter — the sections themselves were never
   * the problem.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section id="home" className="relative flex h-[100svh] min-h-[560px] w-full flex-col overflow-hidden bg-navy-900">
        {/* The source reel is a 720x1280 phone video. Rather than let the browser
            stretch it across the viewport, it is pre-cropped to the band actually
            shown and resampled to 1600x1000 (lanczos + unsharp) by
            scripts/build-hero-video.mjs, so the browser only ever downscales it. */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-gj.mp4"
          poster="/hero-gj-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Scrims are confined to the corners the type actually occupies — bottom-left
            for the headline, a thin band up top for the nav. There is deliberately no
            wash across the whole frame, so the footage stays clear where nothing
            overlaps it. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-navy-900/75 via-navy-900/20 via-35% to-transparent lg:w-[58%]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-900/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-navy-900/85 via-navy-900/25 via-35% to-transparent" />
        {/* Orange hairline marks the seam where the video gives way to the cream page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-orange-600/70 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stack}
          className="relative z-10 mx-auto flex w-full max-w-[1560px] flex-1 flex-col justify-end px-6 pb-14 sm:pb-16 lg:px-12 lg:pb-20"
        >
          {/* Location above the headline: the hero is the most heavily weighted copy
              on the page, and it said nothing about where the business actually is. */}
          <motion.p
            variants={rise}
            className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-cream-50/85 sm:text-xs"
          >
            <span>Painters in {siteConfig.locality}</span>
            <span className="h-1 w-1 rounded-full bg-orange-500" aria-hidden="true" />
            <span>Sutherland Shire</span>
            <span className="h-1 w-1 rounded-full bg-orange-500" aria-hidden="true" />
            <span>Sydney</span>
          </motion.p>

          <motion.h1
            variants={words(0.07)}
            aria-label="GJ Paint Partners — Painting & Decorating"
            className="font-display text-[clamp(2.2rem,4.7vw,4.6rem)] font-medium leading-[1.04] tracking-[-0.02em] text-cream-50"
          >
            <Words text="GJ Paint Partners" variants={wordUp} />
            <br />
            <em className="font-medium text-orange-500">
              <Words text="Painting & Decorating" variants={wordUp} />
            </em>
          </motion.h1>
          <motion.p
            variants={words(0.06)}
            aria-label="Beautiful homes, beautifully finished."
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            className="mt-5 max-w-xl text-[clamp(1.35rem,2vw,1.75rem)] font-normal italic leading-snug tracking-[0.01em] text-cream-50/85"
          >
            <Words text="Beautiful homes, beautifully finished." variants={wordBlur} mask={false} />
          </motion.p>
          <motion.div variants={words(0.12)} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              variants={rise}
              href="#contact"
              aria-label="Get a quote"
              className="group inline-flex items-center gap-2 rounded-[2px] border border-orange-600 bg-orange-600 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-100 shadow-[0_10px_24px_-12px_rgba(193,84,0,0.75)] transition-colors duration-300 hover:border-cream-50 hover:bg-cream-50 hover:text-teal-700"
            >
              <span>
                <Words text="Get a quote" variants={wordUp} />
              </span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.25}
              />
            </motion.a>
            <motion.a
              variants={rise}
              href="#gallery"
              aria-label="View our work"
              className="inline-flex items-center rounded-[2px] border border-cream-50/45 bg-navy-900/45 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-50 transition-colors duration-300 hover:border-cream-50 hover:text-cream-50"
            >
              <span>
                <Words text="View our work" variants={wordUp} />
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
