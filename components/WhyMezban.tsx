"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import { whyItems } from "@/data/services";
import { getImage } from "@/data/images";

export default function WhyMezban() {
  const [i, setI] = useState(0);
  const item = whyItems[i];
  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl">Why Mezban</h2>
          <ul className="mt-8 space-y-2">
            {whyItems.map((w, n) => (
              <li key={w.title}>
                <button aria-pressed={i === n} onClick={() => setI(n)} onMouseEnter={() => setI(n)} className={`flex w-full items-center gap-4 border-l-2 py-3 pl-5 text-left font-display text-2xl transition-colors ${i === n ? "border-gold text-gold" : "border-gold/20 text-champagne/60"}`}>
                  <span className="text-sm">{String(n + 1).padStart(2, "0")}</span>{w.title}
                </button>
              </li>
            ))}
          </ul>
          <AnimatePresence mode="wait"><motion.p key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-6 max-w-md text-champagne/80">{item.text}</motion.p></AnimatePresence>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0"><SmartImage image={getImage(item.image)} sizes="(min-width:1024px) 50vw, 100vw" /></motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
