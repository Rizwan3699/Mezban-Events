"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { showcaseServices } from "@/data/services";
import { getImage } from "@/data/images";

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const img = getImage(showcaseServices[active].image);
  return (
    <section id="services" className="bg-rich px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl">Everything under one responsibility</h2>
          <ul className="mt-10">
            {showcaseServices.map((s, i) => (
              <li key={s.title} className="border-b border-gold/20">
                <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-pressed={active === i}
                  className="group flex w-full items-center justify-between py-4 text-left">
                  <span className={`flex items-baseline gap-4 transition-transform duration-300 group-hover:translate-x-2 ${active === i ? "text-gold" : "text-champagne/80"}`}>
                    <span className="font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-xl sm:text-2xl">{s.title}</span>
                  </span>
                  <ArrowUpRight className={`h-5 w-5 text-gold transition-transform duration-300 group-hover:translate-x-1 ${active === i ? "opacity-100" : "opacity-0"}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative hidden aspect-[4/5] overflow-hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <AnimatePresence mode="wait">
            <motion.div key={img.id + active} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
              <SmartImage image={img} sizes="40vw" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
