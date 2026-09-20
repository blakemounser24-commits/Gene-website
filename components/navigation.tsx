"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = hovered ?? 0;

  /**
   * The bar starts transparent over the hero video (light type, cream logo) and
   * lands on cream once you scroll or open the menu (teal type, logo in its
   * supplied inks). Everything colour-related in here keys off this one flag.
   */
  const onCream = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500",
        // Solid rather than blurred: a fixed, full-width backdrop-filter re-blurs
        // everything passing under it on every frame of scroll, and at 96% opaque
        // cream the blur was invisible anyway.
        open
          ? "border-teal-800/10 bg-cream-50"
          : scrolled
            ? "border-teal-800/10 bg-cream-50/96 shadow-[0_8px_30px_-14px_rgba(2,43,46,0.35)]"
            : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1560px] items-center justify-between px-6 py-3 lg:px-12">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-label={siteConfig.fullName}
          className="group relative z-10 flex items-center gap-3 sm:gap-3.5"
        >
          {/* The full stacked lockup. Supplied inks on cream, cream line work while
              it sits over the hero video. */}
          <img
            src={onCream ? siteConfig.logo.primary : siteConfig.logo.primaryCream}
            alt=""
            aria-hidden="true"
            className="h-14 w-auto shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:h-16 lg:h-20"
          />
        </motion.a>

        <nav className="hidden items-center gap-11 lg:flex" onMouseLeave={() => setHovered(null)}>
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(i)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative pb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                onCream
                  ? activeIndex === i
                    ? "text-teal-600"
                    : "text-teal-800/70 hover:text-teal-600"
                  : activeIndex === i
                    ? "text-cream-50"
                    : "text-cream-50/65 hover:text-cream-50"
              )}
            >
              {link.label}
              {activeIndex === i && (
                <motion.span
                  layoutId="nav-underline"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute -bottom-0 left-0 h-px w-full bg-orange-600"
                />
              )}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex"
        >
          <motion.a
            href={siteConfig.phoneHref}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="inline-flex items-center gap-2.5 rounded-[2px] border border-orange-600 bg-orange-600 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-100 shadow-[0_10px_24px_-12px_rgba(193,84,0,0.8)] transition-colors duration-300 hover:border-teal-600 hover:bg-teal-600"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2.25} />
            {siteConfig.phone}
          </motion.a>
        </motion.div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn("h-px w-6 transition-colors duration-300", onCream ? "bg-teal-800" : "bg-cream-50")}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={cn("h-px w-6 transition-colors duration-300", onCream ? "bg-teal-800" : "bg-cream-50")}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn("h-px w-6 transition-colors duration-300", onCream ? "bg-teal-800" : "bg-cream-50")}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-0 flex flex-col items-center justify-center gap-10 bg-cream-50 lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl text-teal-600"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={siteConfig.phoneHref}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * NAV_LINKS.length, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-[2px] border border-orange-600 bg-orange-600 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-100"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2.25} />
              {siteConfig.phone}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
