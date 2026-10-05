"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import { heroImages } from "@/data/images";
import { config } from "@/lib/config";

const line = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } };

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} className="absolute inset-0">
          <SmartImage image={heroImages[0]} priority />
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="font-display text-lg text-gold">{config.company} · {config.subtitle}</motion.p>
        <motion.h1 initial="hidden" animate="show" transition={{ staggerChildren: 0.25, delayChildren: 0.8 }} className="mt-5 font-display text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
          <span className="block overflow-hidden"><motion.span variants={line} className="block">Your event.</motion.span></span>
          <span className="block overflow-hidden"><motion.span variants={line} className="block">Our responsibility.</motion.span></span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.9 }} className="mt-8 max-w-xl text-lg text-champagne/85">From the first idea to the final celebration, we plan, coordinate and execute every detail with care.</motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <Link href="/planner" className="bg-gold px-8 py-4 font-medium text-ink transition-colors hover:bg-warm">Plan your event</Link>
          <Link href="#events" className="border border-gold px-8 py-4 text-gold transition-colors hover:bg-gold hover:text-ink">Explore our work</Link>
        </motion.div>
      </div>
    </section>
  );
}
