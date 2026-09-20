"use client";

import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { pickService } from "@/lib/select-service";
import { useTilt } from "@/lib/use-tilt";

type Props = {
  title: string;
  description: string;
  image: string;
  index: number;
  icon: LucideIcon;
};

export function ServiceCard({ title, description, image, index, icon: Icon }: Props) {
  const tilt = useTilt();

  return (
    <motion.a
      href="#contact"
      onClick={() => pickService(title)}
      {...tilt.handlers}
      aria-label={`Request a quote for ${title}`}
      style={tilt.style}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative flex h-[380px] w-[280px] shrink-0 cursor-pointer flex-col justify-end overflow-hidden rounded-xl bg-teal-900 p-7 [content-visibility:auto] [contain-intrinsic-size:280px_380px] sm:[contain-intrinsic-size:400px_500px] shadow-[var(--shadow-elevated)] ring-1 ring-transparent outline-none transition-shadow duration-300 hover:shadow-[var(--shadow-floating)] hover:ring-orange-500/50 focus-visible:ring-2 focus-visible:ring-orange-600 sm:h-[500px] sm:w-[400px] sm:p-8"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={900}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
      />
      {/* A light teal tint over the whole photo to tie it to the palette, then a
          near-solid scrim over the lower two-thirds where the type sits — a single
          full-card gradient either washes the photo out or leaves the copy unreadable
          on the bright exterior shots. */}
      <div className="pointer-events-none absolute inset-0 bg-teal-900/20" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-teal-900 via-teal-900/85 via-35% to-transparent"
        aria-hidden="true"
      />
      {/* The icon reads as a watermark over the photo rather than a solid glyph */}
      <Icon
        className="pointer-events-none absolute -right-7 -top-7 h-44 w-44 text-cream-50/25 mix-blend-overlay transition-transform duration-700 ease-out group-hover:-rotate-6 group-hover:scale-110 sm:h-56 sm:w-56"
        strokeWidth={1}
        aria-hidden="true"
      />
      {tilt.enabled && <motion.div style={tilt.sheenStyle} className={tilt.sheenClassName} aria-hidden="true" />}

      <div className="relative">
        <span className="mb-3 block font-sans text-xs font-semibold tracking-[0.3em] text-orange-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-2xl font-medium leading-tight text-cream-50 sm:text-[28px]">
          {title}
        </h3>
        {description && <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-cream-50/80">{description}</p>}

        {/* Always legible on touch, where there is no hover to reveal it */}
        <span className="my-5 block h-px w-full bg-cream-50/25" aria-hidden="true" />
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500 opacity-85 transition-opacity duration-300 group-hover:opacity-100">
          Request a quote
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.25} />
        </span>
      </div>
    </motion.a>
  );
}
