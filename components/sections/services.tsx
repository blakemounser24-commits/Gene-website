"use client";

import { Button } from "@/components/ui/button";
import { TextType } from "@/components/ui/text-type";
import { TextEffect } from "@/components/ui/text-effect";
import {
  Building2,
  Columns3,
  DoorOpen,
  Droplets,
  Fence,
  Gem,
  Home,
  House,
  Landmark,
  Layers,
  PaintRoller,
  Paintbrush,
  Ruler,
  ShieldCheck,
  Sparkles,
  SprayCan,
  TreePine,
  Wallpaper,
  type LucideIcon,
} from "lucide-react";
import { PinnedRail } from "@/components/ui/pinned-rail";
import { ServiceCard } from "@/components/sections/service-card";
import { content } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Columns3,
  DoorOpen,
  Droplets,
  Fence,
  Gem,
  Home,
  House,
  Landmark,
  Layers,
  PaintRoller,
  Paintbrush,
  Ruler,
  ShieldCheck,
  Sparkles,
  SprayCan,
  TreePine,
  Wallpaper,
};

const SOFT_WORDS = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.03 } } },
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  },
};

export function Services() {
  const { services } = content;
  const cards = services.items.map((service, index) => (
    <ServiceCard
      key={service.title}
      title={service.title}
      description={service.description}
      image={service.image}
      index={index}
      icon={ICONS[service.icon] ?? Paintbrush}
    />
  ));

  return (
    <section id="services" className="relative bg-cream-50 pt-28 sm:pt-32">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <TextEffect
          as="p"
          per="char"
          preset="scale"
          className="mb-6 justify-center text-xs font-semibold uppercase tracking-[0.28em] text-orange-600"
        >
          {services.eyebrow}
        </TextEffect>
        {/* The text lives in the h2 itself. TextType builds it a character at a time
            on scroll, which would otherwise leave an empty heading in the markup for
            crawlers and screen readers, so the animated copy is decorative. */}
        <h2 className="font-display text-3xl font-medium leading-[1.15] text-teal-600 sm:text-4xl md:text-5xl">
          <span className="sr-only">{services.heading}</span>
          <TextType
            as="span"
            aria-hidden="true"
            text={[services.heading]}
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
          {services.subhead}
        </TextEffect>
      </div>

      <PinnedRail className="mt-14">{cards}</PinnedRail>

      <div className="relative z-10 flex justify-center px-6 pb-28 pt-4 sm:pb-32">
        <Button href={services.cta.href} variant="primary">
          {services.cta.label}
        </Button>
      </div>
    </section>
  );
}
