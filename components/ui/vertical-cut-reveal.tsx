"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, type Transition } from "framer-motion";
import { useMemo, useRef } from "react";

interface VerticalCutRevealProps {
  children: string;
  splitBy?: "words" | "chars" | "lines";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  transition?: Transition;
  containerClassName?: string;
  wordClassName?: string;
}

export function VerticalCutReveal({
  children,
  splitBy = "words",
  staggerDuration = 0.1,
  staggerFrom = "first",
  transition,
  containerClassName,
  wordClassName,
}: VerticalCutRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  const segments = useMemo(() => {
    if (splitBy === "chars") return children.split("");
    if (splitBy === "lines") return children.split("\n");
    return children.split(" ");
  }, [children, splitBy]);

  const getDelay = (index: number) => {
    const total = segments.length;
    let distance: number;
    if (staggerFrom === "last") distance = total - 1 - index;
    else if (staggerFrom === "center") distance = Math.abs(index - Math.floor(total / 2));
    else distance = index;
    return distance * staggerDuration;
  };

  const baseDelay = transition?.delay ?? 0;

  return (
    <span ref={ref} className={cn("inline-block", containerClassName)}>
      {segments.map((segment, index) => (
        <span key={index} className="inline-block">
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className={cn("inline-block", wordClassName)}
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ ...transition, delay: baseDelay + getDelay(index) }}
            >
              {/* A lone space inside an inline-block collapses to zero width, which
                  ran "Our Work" together when splitting by character. */}
              {segment === " " ? " " : segment}
            </motion.span>
          </span>
          {splitBy === "words" && index < segments.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
