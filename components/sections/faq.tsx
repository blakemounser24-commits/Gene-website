"use client";

import { TextEffect } from "@/components/ui/text-effect";
import { TextType } from "@/components/ui/text-type";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { content } from "@/lib/content";

const SOFT_WORDS = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.03 } } },
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  },
};

/**
 * Faster than the section defaults — an accordion row should feel like it snaps
 * into place, not like it is being typed out.
 */
const QUESTION_VARIANTS = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.018 } } },
  item: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const } },
  },
};

const ANSWER_VARIANTS = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.012, delayChildren: 0.06 } } },
  item: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faq: faqContent } = content;

  return (
    <section id="faq" className="relative overflow-hidden bg-lawn-700 py-28 sm:py-32">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <TextEffect
          as="p"
          per="char"
          preset="scale"
          className="mb-6 justify-center text-xs font-semibold uppercase tracking-[0.28em] text-orange-600"
        >
          {faqContent.eyebrow}
        </TextEffect>
        {/* Real text in the h2; the typed copy alongside it is decorative. */}
        <h2 className="font-display text-3xl font-medium leading-[1.15] text-teal-600 sm:text-4xl md:text-5xl">
          <span className="sr-only">{faqContent.heading}</span>
          <TextType
            as="span"
            aria-hidden="true"
            text={[faqContent.heading]}
            loop={false}
            showCursor={false}
            typingSpeed={40}
            startOnVisible
            className="block"
          />
        </h2>
        <TextEffect
          as="p"
          per="word"
          variants={SOFT_WORDS}
          className="mx-auto mt-5 max-w-xl justify-center text-base leading-[1.7] text-slate-500"
        >
          {faqContent.subhead}
        </TextEffect>
      </div>

      <div className="relative z-10 mx-auto mt-14 max-w-3xl px-6">
        {faqContent.items.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="border-b border-stone-100/10">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left outline-none focus-visible:text-bronze-600"
              >
                <TextEffect
                  as="span"
                  per="word"
                  preset="slide"
                  variants={QUESTION_VARIANTS}
                  className="font-display text-lg text-stone-50 sm:text-xl"
                >
                  {faq.question}
                </TextEffect>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-cream-50"
                >
                  <Plus size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <TextEffect
                      as="p"
                      per="word"
                      preset="fade"
                      variants={ANSWER_VARIANTS}
                      className="pb-6 pr-14 text-sm leading-relaxed text-slate-500 sm:text-base"
                    >
                      {faq.answer}
                    </TextEffect>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
