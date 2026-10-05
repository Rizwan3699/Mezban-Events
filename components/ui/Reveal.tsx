"use client";
import { motion, type Variants } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

export default function Reveal({ children, variants = fadeUp, className }: { children: React.ReactNode; variants?: Variants; className?: string }) {
  return <motion.div variants={variants} initial="hidden" whileInView="show" viewport={viewport} className={className}>{children}</motion.div>;
}
