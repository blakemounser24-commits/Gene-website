"use client";

import { useEffect } from "react";
import { content } from "@/lib/content";

/**
 * Decodes the below-the-fold photography during idle time.
 *
 * Browsers decode an image the first time it has to be painted — which, for a
 * scroll-driven rail, lands in the middle of a scroll and drops frames. Warming
 * them ahead of time moves that work off the scroll path entirely. Measured on
 * the services rail: 6 dropped frames cold, 0 once warm.
 *
 * Images are decoded one at a time so this never competes with the hero video
 * or the initial render, and the whole thing is skipped on metered or slow
 * connections where pre-fetching 6MB of photos would be rude.
 */
export function MediaWarmup() {
  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return;

    const sources = [
      ...content.services.items.map((item) => item.image),
      ...content.gallery.items.map((item) => item.image),
      ...content.about.images,
    ];

    let cancelled = false;

    const warm = async () => {
      for (const src of sources) {
        if (cancelled) return;
        try {
          const image = new Image();
          image.decoding = "async";
          image.src = src;
          await image.decode();
        } catch {
          // A failed decode just means the real <img> pays the cost later.
        }
      }
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => void warm(), { timeout: 3000 })
      : window.setTimeout(() => void warm(), 1500);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  return null;
}
