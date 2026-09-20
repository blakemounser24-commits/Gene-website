"use client";

import { motion, useInView, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode, RefObject } from "react";

type TimelineTag = "div" | "p" | "button" | "figure" | "span";

interface TimelineContentProps {
  children?: ReactNode;
  as?: TimelineTag;
  animationNum: number;
  customVariants: Variants;
  timelineRef: RefObject<HTMLElement | null>;
  className?: string;
  style?: CSSProperties;
}

const TAGS = {
  div: motion.div,
  p: motion.p,
  button: motion.button,
  figure: motion.figure,
  span: motion.span,
} as const;

export function TimelineContent({
  children,
  as = "div",
  animationNum,
  customVariants,
  timelineRef,
  className,
  style,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, { once: true, amount: 0.2 });
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      custom={animationNum}
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
