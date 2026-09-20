"use client";

import { MotionConfig } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns";
import { TextType } from "@/components/ui/text-type";
import { content } from "@/lib/content";

export function Testimonials() {
  const { testimonials } = content;

  const items: Testimonial[] = testimonials.items.map((t) => ({
    text: t.quote,
    image: `https://placehold.co/200x200/${t.bg}/${t.fg}?font=playfair-display&text=${t.initials}`,
    name: t.name,
    role: t.designation,
  }));

  const perColumn = Math.ceil(items.length / 3);
  const firstColumn = items.slice(0, perColumn);
  const secondColumn = items.slice(perColumn, perColumn * 2);
  const thirdColumn = items.slice(perColumn * 2);

  return (
    <section id="reviews" className="relative overflow-hidden bg-lawn-700 py-28 sm:py-32">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{testimonials.eyebrow}</p>
        {/* Real text in the h2; the typed copy alongside it is decorative. */}
        <h2 className="font-display text-3xl font-medium text-stone-50 sm:text-4xl md:text-5xl">
          <span className="sr-only">{testimonials.heading}</span>
          <TextType
            as="span"
            aria-hidden="true"
            text={[testimonials.heading]}
            loop={false}
            showCursor={false}
            typingSpeed={45}
            startOnVisible
            className="block"
          />
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-[1.7] text-stone-200/75">{testimonials.subhead}</p>
      </div>

      {/* Columns fade out top and bottom into the lawn ground */}
      <MotionConfig reducedMotion="user">
        <div className="relative z-10 mt-14 flex max-h-[740px] justify-center gap-6 overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </MotionConfig>
    </section>
  );
}
