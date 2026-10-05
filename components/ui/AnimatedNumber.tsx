"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

export default function AnimatedNumber({ value, className, currency = true }: { value: number; className?: string; currency?: boolean }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const c = animate(from.current, value, { duration: 0.6, ease: "easeOut", onUpdate: (v) => setShown(Math.round(v)) });
    from.current = value;
    return () => c.stop();
  }, [value]);
  return <p className={className} aria-live="polite">{currency ? formatCurrency(shown) : shown}</p>;
}
