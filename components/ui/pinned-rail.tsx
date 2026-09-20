"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /**
   * Vertical scroll consumed per pixel of horizontal travel. At 1 the rail
   * tracks the scrollbar exactly; below 1 it moves faster than the page, which
   * keeps a long rail from eating the whole scroll.
   */
  pace?: number;
  /** Must match the card width, since the frame is the window the rail slides through. */
  frameClassName?: string;
  gapClassName?: string;
  className?: string;
};

export function PinnedRail({
  children,
  pace = 0.55,
  frameClassName = "w-[280px] sm:w-[400px]",
  gapClassName = "gap-[15px] sm:gap-[30px]",
  className,
}: Props) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  // Measured rather than hard-coded, so card widths can change per breakpoint
  // without the scroll distance drifting out of sync.
  useEffect(() => {
    const measure = () => {
      if (!railRef.current || !frameRef.current) return;
      setTravel(Math.max(0, railRef.current.scrollWidth - frameRef.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  if (reduceMotion) {
    // No pinning: the same rail, scrolled by hand.
    return <div className={cn("flex overflow-x-auto px-6 pb-6", gapClassName, className)}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={cn("relative", className)} style={{ height: `calc(100vh + ${travel * pace}px)` }}>
      <div
        ref={frameRef}
        className={cn("sticky top-0 mx-auto flex h-screen items-center justify-start", frameClassName)}
      >
        <motion.div ref={railRef} style={{ x }} className={cn("flex transform-gpu will-change-transform", gapClassName)}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
