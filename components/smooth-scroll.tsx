"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Height of the fixed header, so anchored sections don't land underneath it. */
const HEADER_OFFSET = -80;

/** Mounts Lenis smooth scrolling once for the whole app and keeps ScrollTrigger in sync. */
export function SmoothScroll() {
  useEffect(() => {
    // Smooth scrolling is the one thing a reduced-motion user cannot opt out of
    // once it is running, so don't start it at all for them.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // Slightly tighter than the 0.1 default: the page still glides, but it
      // stops trailing behind the wheel, which is what reads as "floaty".
      lerp: 0.12,
      // Touch devices already scroll smoothly; intercepting them adds latency.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /**
     * In-page links are handled here rather than through Lenis's own `anchors`
     * option. That option lets the browser perform its native jump first and
     * then animates from Lenis's own position, so a nav click visibly snapped
     * to the target, bounced back, and scrolled in again. Cancelling the
     * default outright and driving Lenis by hand gives one clean ramp.
     */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET, duration: 1.1 });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
