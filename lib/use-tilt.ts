"use client";

import { useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";

const SPRING = { stiffness: 260, damping: 22, mass: 0.4 };

type Options = {
  /** Degrees of rotation at the card's corners. */
  max?: number;
  /** rgb triplet for the pointer sheen, so it can read on dark or light cards. */
  sheen?: string;
  sheenOpacity?: number;
};

/**
 * Pointer-tracked 3D tilt for a card.
 *
 * Tracking reads `currentTarget` off the pointer event rather than a ref, so a
 * card can spread the handlers without wiring anything else up. Tilt is
 * pointer-driven motion, so it is dropped entirely under reduced-motion rather
 * than shortened — `enabled` is false there and the style is undefined.
 *
 * The sheen is a static gradient that gets *translated* under the pointer. An
 * earlier version rebuilt a `radial-gradient(circle at x y, …)` string every
 * frame, which repainted the whole card on each move; moving a pre-rendered
 * layer is a composited transform and costs nothing.
 */
export function useTilt({ max = 9, sheen = "246, 244, 241", sheenOpacity = 0.18 }: Options = {}) {
  const enabled = !useReducedMotion();

  // Pointer position within the card, 0–1 on each axis. Centre is the rest state.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);

  // The sheen trails the pointer a little, which sells the tilt as a surface
  // catching light rather than a flat box being rotated.
  const sheenX = useSpring(useTransform(px, [0, 1], ["-30%", "30%"]), SPRING);
  const sheenY = useSpring(useTransform(py, [0, 1], ["-30%", "30%"]), SPRING);

  const handlers = {
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      const rect = event.currentTarget.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width);
      py.set((event.clientY - rect.top) / rect.height);
    },
    onPointerLeave: () => {
      px.set(0.5);
      py.set(0.5);
    },
  };

  return {
    enabled,
    handlers,
    style: enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined,
    /** Spread onto the sheen layer; pair with `sheenClassName`. */
    sheenStyle: {
      x: sheenX,
      y: sheenY,
      backgroundImage: `radial-gradient(circle at center, rgba(${sheen}, ${sheenOpacity}), transparent 60%)`,
    },
    /** Oversized so translating it never exposes an edge. */
    sheenClassName:
      "pointer-events-none absolute -inset-1/3 opacity-0 transition-opacity duration-300 will-change-transform group-hover:opacity-100",
  };
}
