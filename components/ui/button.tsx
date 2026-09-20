"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ConflictingProps =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

interface BaseProps {
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
}

type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, ConflictingProps | keyof BaseProps> & { as?: "a" };

type ButtonElProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, ConflictingProps | keyof BaseProps> & { as: "button" };

type ButtonProps = AnchorProps | ButtonElProps;

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[2px] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] outline-none transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 active:scale-[0.97]";

// Matches the hero's "Get a quote" / "View our work" pair
const variants: Record<ButtonVariant, string> = {
  primary: "border border-orange-600 bg-orange-600 text-cream-100 shadow-[0_10px_24px_-12px_rgba(193,84,0,0.75)]",
  secondary: "border border-teal-600/40 bg-transparent text-teal-600",
};

const overlay: Record<ButtonVariant, string> = {
  primary: "bg-teal-600",
  secondary: "bg-teal-600/10",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, as, ...rest } = props;

  const overlaySpan = (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        overlay[variant]
      )}
    />
  );

  if (as === "button") {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className={cn(base, variants[variant], className)}
        {...(rest as Omit<ComponentPropsWithoutRef<"button">, ConflictingProps>)}
      >
        {overlaySpan}
        <span className="relative">{children}</span>
      </motion.button>
    );
  }

  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className={cn(base, variants[variant], className)}
      {...(rest as Omit<ComponentPropsWithoutRef<"a">, ConflictingProps>)}
    >
      {overlaySpan}
      <span className="relative">{children}</span>
    </motion.a>
  );
}
