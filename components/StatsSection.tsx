"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

// Editable placeholder values - replace with verified figures.
const stats: { to: number; suffix: string; label: string }[] = [
  { to: 100, suffix: "+", label: "Event experiences" }, { to: 10, suffix: "+", label: "Event categories" },
  { to: 15, suffix: "+", label: "Event services" }, { to: 1, suffix: "", label: "Responsibility: your event" },
];

function Stat({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) }); return () => c.stop(); } }, [inView, to]);
  return (
    <div ref={ref} className="border-l border-gold/40 pl-6">
      <p className="font-display text-6xl text-gold sm:text-7xl">{n}{suffix}</p>
      <p className="mt-2 text-sm text-champagne/70">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-ink px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">{stats.map((s) => <Stat key={s.label} {...s} />)}</div>
    </section>
  );
}
