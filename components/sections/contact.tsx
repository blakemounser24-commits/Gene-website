"use client";

import { TextEffect } from "@/components/ui/text-effect";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { content } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { onServicePicked } from "@/lib/select-service";

const inputClasses =
  "w-full rounded-lg border border-teal-800/15 bg-cream-100 px-4 py-3 text-sm text-teal-800 placeholder:text-teal-800/40 outline-none transition-[border-color] duration-300 focus:border-teal-600";

const labelClasses = "mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-teal-800/70";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState(content.services.items[0].title);
  const [justPicked, setJustPicked] = useState(false);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const { contact } = content;

  // A card in the services rail was clicked: fill the field in and flash it, so
  // it is obvious the choice landed after the page scrolls down here.
  useEffect(
    () =>
      onServicePicked((title) => {
        setService(title);
        setJustPicked(true);
        window.setTimeout(() => setJustPicked(false), 1600);
      }),
    []
  );

  /** Photos are sent inline as base64, so they are kept small on purpose. */
  const readAsBase64 = (file: File) =>
    new Promise<{ filename: string; content: string }>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result);
        resolve({ filename: file.name, content: result.slice(result.indexOf(",") + 1) });
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);

    try {
      const files = [...(data.getAll("attachments") as File[])].filter((f) => f.size > 0);
      const attachments = await Promise.all(files.slice(0, 5).map(readAsBase64));

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          service: data.get("service"),
          timing: data.get("timing"),
          issue: data.get("issue"),
          attachments,
        }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload.error ?? "Something went wrong.");

      setStatus("sent");
    } catch (cause) {
      // Keep what they typed on screen — losing a filled-in form is worse than
      // the failure itself.
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-lawn-700 py-28 sm:py-32">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{contact.eyebrow}</p>
        <TextEffect as="h2" per="word" preset="slide" className="justify-center font-display text-3xl font-medium text-stone-50 sm:text-4xl md:text-5xl">
          {contact.heading}
        </TextEffect>
        <p className="mx-auto mt-5 max-w-xl text-base leading-[1.7] text-stone-200/75">{contact.subhead}</p>
      </div>

      <div className="relative z-10 mx-auto mt-14 max-w-3xl px-6">
        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-orange-600/25 bg-cream-100 px-8 py-16 text-center shadow-[var(--shadow-surface)]"
          >
            <p className="font-display text-2xl text-stone-50">{contact.thankYouTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-300/75">{contact.thankYouBody}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-teal-800/10 bg-cream-100 p-6 shadow-[var(--shadow-surface)] sm:p-10"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClasses} htmlFor="name">Full Name *</label>
                <input required id="name" name="name" type="text" className={inputClasses} placeholder="Jane Smith" />
              </div>
              <div>
                <label className={labelClasses} htmlFor="email">Your Email *</label>
                <input required id="email" name="email" type="email" className={inputClasses} placeholder="jane@email.com" />
              </div>
              <div>
                <label className={labelClasses} htmlFor="phone">Telephone *</label>
                <input required id="phone" name="phone" type="tel" className={inputClasses} placeholder="0432 466 466" />
              </div>
              <div>
                <label className={labelClasses} htmlFor="address">Your Address *</label>
                <input required id="address" name="address" type="text" className={inputClasses} placeholder="Your street address" />
              </div>
              <div>
                <label className={labelClasses} htmlFor="service">Service You Require</label>
                <select
                  ref={serviceRef}
                  id="service"
                  name="service"
                  className={cn(inputClasses, justPicked && "border-orange-600 ring-2 ring-orange-600/30")}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {content.services.items.map((item) => (
                    <option key={item.title}>{item.title}</option>
                  ))}
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className={labelClasses} htmlFor="timing">When would you like the work to be carried out?</label>
                <select id="timing" name="timing" className={inputClasses} defaultValue="Urgently">
                  <option>Urgently</option>
                  <option>Within 1 Month</option>
                  <option>1 - 3 Months</option>
                  <option>3 Months +</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className={labelClasses} htmlFor="issue">Please Describe Your Issue</label>
              <textarea id="issue" name="issue" rows={4} className={inputClasses} placeholder="Tell us about your project and anything else we should know..." />
            </div>

            <div className="mt-6">
              <label className={labelClasses} htmlFor="attachments">Images</label>
              <input
                id="attachments"
                name="attachments"
                type="file"
                multiple
                accept="image/*"
                className="w-full rounded-lg border border-dashed border-teal-800/20 bg-cream-100 px-4 py-3 text-sm text-teal-800/70 file:mr-4 file:rounded-full file:border-0 file:bg-orange-600 file:px-4 file:py-2 file:text-xs file:font-medium file:text-cream-100"
              />
            </div>

            <Button
              as="button"
              type="submit"
              variant="primary"
              disabled={status === "sending"}
              className="mt-8 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "sending" ? "Sending…" : contact.submitLabel}
            </Button>

            {status === "error" && (
              <p role="alert" className="mt-4 text-sm text-orange-700">
                {error} You can also call{" "}
                <a href={siteConfig.phoneHref} className="underline underline-offset-2">
                  {siteConfig.phone}
                </a>
                .
              </p>
            )}
          </motion.form>
        )}
      </div>
    </section>
  );
}
