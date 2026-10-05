import Link from "next/link";
import { config } from "@/lib/config";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gold/30 bg-ink px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-gold">{config.company}</p>
          <p className="text-sm tracking-widest text-champagne/70">{config.subtitle}</p>
          <p className="mt-4 text-champagne/80">{config.tagline}</p>
        </div>
        <div className="text-sm text-champagne/80">
          <p className="mb-3 text-gold">Quick links</p>
          <ul className="space-y-2">
            <li><Link href="/#events">Events</Link></li>
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/planner">Event Planner</Link></li>
          </ul>
        </div>
        <div className="space-y-2 text-sm text-champagne/80">
          <p className="mb-3 text-gold">Contact</p>
          <p><a href={`tel:${config.phone}`}>{config.phone}</a></p>
          <p><a href={`mailto:${config.email}`}>{config.email}</a></p>
          <p>{config.location}</p>
        </div>
      </div>
    </footer>
  );
}
