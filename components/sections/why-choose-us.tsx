"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, ListChecks, HeartHandshake, BadgeDollarSign, type LucideIcon } from "lucide-react";
import { content } from "@/lib/content";
import { useTilt } from "@/lib/use-tilt";

const ICONS: Record<string, LucideIcon> = { ShieldCheck, ListChecks, HeartHandshake, BadgeDollarSign };

export function WhyChooseUs() {
  const { whyChooseUs } = content;
  const reduceMotion = useReducedMotion();

  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-lawn-700 py-28 sm:py-32">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{whyChooseUs.eyebrow}</p>
        <ScrollReveal
          containerClassName="mx-auto"
          textClassName="font-display font-medium text-stone-50 !text-[clamp(1.9rem,4.5vw,3.25rem)]"
          baseOpacity={0.15}
          baseRotation={2}
          enableBlur={false}
        >
          {whyChooseUs.heading}
        </ScrollReveal>
      </div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 px-6 sm:grid-cols-2">
        {whyChooseUs.reasons.map((reason, index) => (
          <ReasonCard key={reason.label} reason={reason} index={index} reduceMotion={!!reduceMotion} />
        ))}
      </div>
    </section>
  );
}

type Reason = (typeof content)["whyChooseUs"]["reasons"][number];

function ReasonCard({ reason, index, reduceMotion }: { reason: Reason; index: number; reduceMotion: boolean }) {
  const Icon = ICONS[reason.icon];
  // Shallower than the service cards — these sit wide and short, so the same
  // angle would read as a wobble rather than a tilt.
  const tilt = useTilt({ max: 6, sheen: "0, 123, 128", sheenOpacity: 0.12 });

  return (
    <motion.div
      {...tilt.handlers}
      // Two-column grid: even indices are the left column, odd the right, so
      // each card enters from the edge it already sits against.
      initial={{ opacity: 0, x: reduceMotion ? 0 : index % 2 === 0 ? -64 : 64 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: Math.floor(index / 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      style={tilt.style}
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-teal-800/10 bg-cream-100 p-6 shadow-[var(--shadow-surface)] transition-[box-shadow,border-color] duration-300 hover:border-orange-600/35 hover:shadow-[var(--shadow-elevated)]"
    >
      {tilt.enabled && <motion.div style={tilt.sheenStyle} className={tilt.sheenClassName} aria-hidden="true" />}
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-orange-600 to-orange-700 text-cream-100 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">{reason.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-stone-200/80">{reason.text}</p>
      </div>
    </motion.div>
  );
}
