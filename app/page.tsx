import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import WhyMezban from "@/components/WhyMezban";
import ServicesShowcase from "@/components/ServicesShowcase";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { getImage } from "@/data/images";
import { events } from "@/data/events";
import { slideLeft, slideRight, imageReveal } from "@/lib/motion";
import { config } from "@/lib/config";

const steps = ["Discover", "Plan", "Design", "Coordinate", "Execute", "Celebrate"];
const tiles = ["engagement", "walima", "corporate", "religious", "social", "seminar"];
const tileClass = ["lg:col-span-1 lg:row-span-2", "", "", "lg:col-span-2", "", ""];

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <section id="about" className="bg-cream px-6 py-28 text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <Reveal variants={slideLeft}>
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">We don&apos;t just manage events. We create experiences.</h2>
            <p className="mt-6 max-w-lg text-lg text-ink/75">Mezban is a full-service event management company in Beed. From Nikah and Walima to corporate launches, we take responsibility for the complete event.</p>
            <Link href="/planner" className="mt-8 inline-block bg-ink px-7 py-3 text-gold">Discover Mezban</Link>
          </Reveal>
          <div className="relative">
            <Reveal variants={imageReveal}><div className="relative aspect-[4/5] overflow-hidden"><SmartImage image={getImage("about")} sizes="(min-width:1024px) 45vw, 100vw" /></div></Reveal>
            <Reveal variants={slideRight} className="absolute -bottom-8 -left-4 hidden w-40 sm:block md:w-56"><div className="relative aspect-square overflow-hidden border-4 border-cream"><SmartImage image={getImage("about2")} sizes="224px" /></div></Reveal>
          </div>
        </div>
      </section>
      <WhyMezban />
      <section id="events" className="px-6 pb-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl sm:text-5xl">Events we take care of</h2>
          <div className="mt-12 grid auto-rows-[220px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/planner" className="group relative overflow-hidden sm:col-span-2 lg:row-span-2 lg:auto-rows-auto">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><SmartImage image={getImage("wedding")} sizes="50vw" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
              <div className="absolute bottom-6 left-6"><p className="font-display text-4xl text-gold">{events[0].name} & Nikah</p><p className="mt-1 text-sm text-champagne/80">{events[0].blurb}</p></div>
            </Link>
            {tiles.map((id, n) => {
              const e = events.find((x) => x.id === id);
              return (
                <Link key={id} href="/planner" className={`group relative overflow-hidden ${tileClass[n]}`}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><SmartImage image={getImage(id)} sizes="25vw" /></div>
                  <div className="absolute inset-0 bg-ink/40 transition-colors group-hover:bg-ink/70" />
                  <p className="absolute bottom-4 left-4 flex items-center gap-2 font-display text-xl text-gold">{e?.name ?? id}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <ServicesShowcase />
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl sm:text-5xl">How we work</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((s, i) => (<li key={s}><Reveal><div className="border-t border-gold pt-4"><span className="font-display text-gold">{i + 1}</span><p className="mt-2 font-display text-2xl">{s}</p></div></Reveal></li>))}
          </ol>
        </div>
      </section>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden px-6">
        <div className="absolute inset-0"><SmartImage image={getImage("hero")} sizes="100vw" /></div>
        <div className="absolute inset-0 bg-ink/75" />
        <Reveal className="relative mx-auto w-full max-w-7xl py-24">
          <h2 className="font-display text-5xl leading-tight sm:text-8xl">Let&apos;s make your event special.</h2>
          <p className="mt-4 text-lg text-champagne/85">Tell us what you&apos;re planning. We&apos;ll take care of the rest.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/planner" className="bg-gold px-8 py-4 font-medium text-ink hover:bg-warm">Plan your event</Link>
            <a href={`https://wa.me/${config.whatsapp}`} className="border border-gold px-8 py-4 text-gold hover:bg-gold hover:text-ink">WhatsApp us</a>
            <a href={`tel:${config.phone}`} className="border border-gold px-8 py-4 text-gold hover:bg-gold hover:text-ink">Call us</a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
