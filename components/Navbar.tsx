"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { config } from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#events", label: "Events" },
  { href: "/#services", label: "Services" },
  { href: "/planner", label: "Event Planner" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "bg-ink/95 border-b border-gold/30" : "bg-transparent border-b border-transparent"}`}>
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl text-gold">{config.company}<span className="ml-2 hidden text-xs tracking-widest text-champagne/70 sm:inline">{config.subtitle}</span></Link>
        <ul className="hidden items-center gap-8 text-sm text-champagne/90 lg:flex">
          {links.map((l) => <li key={l.label}><Link href={l.href} className="hover:text-gold">{l.label}</Link></li>)}
        </ul>
        <Link href="/planner" className="hidden border border-gold bg-gold px-5 py-2 text-sm font-medium text-ink hover:bg-warm lg:block">Plan your event</Link>
        <button className="text-gold lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 top-[65px] flex flex-col items-start gap-6 bg-ink px-8 pt-12 lg:hidden">
          {links.map((l) => <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl text-champagne">{l.label}</Link>)}
          <Link href="/planner" onClick={() => setOpen(false)} className="mt-4 bg-gold px-6 py-3 font-medium text-ink">Plan your event</Link>
        </div>
      )}
    </header>
  );
}
