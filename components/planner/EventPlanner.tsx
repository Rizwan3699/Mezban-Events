"use client";
import { useEffect, useMemo, useState } from "react";
import { Check, Minus, Plus, X, MessageCircle } from "lucide-react";
import type { PlannerState } from "@/types/planner";
import { events, getEvent } from "@/data/events";
import { getService } from "@/data/services";
import { calculateGrandTotal } from "@/lib/pricing";
import { buildPlanLines, buildWhatsAppLink, clearPlannerState, getQuantity, loadPlannerState, savePlannerState } from "@/lib/planner";
import { formatCurrency } from "@/lib/utils";
import { config } from "@/lib/config";
import SmartImage from "@/components/ui/SmartImage";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { getImage, getServiceImage } from "@/data/images";

const EMPTY: PlannerState = { eventType: null, guestCount: 100, selectedServices: [], quantities: {}, estimatedTotal: 0, currentStep: 1, timestamp: 0 };
const STEPS = ["Event", "Guests", "Services", "Estimate", "Enquiry"];
const FORM0 = { name: "", phone: "", email: "", date: "", location: "", notes: "" };
const field = "w-full border border-gold/40 bg-transparent px-4 py-3 text-champagne placeholder:text-champagne/40";

export default function EventPlanner() {
  const [state, setState] = useState<PlannerState>(EMPTY);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(FORM0);

  useEffect(() => {
    const saved = loadPlannerState();
    if (saved) setState(saved);
    setReady(true);
  }, []);

  const event = getEvent(state.eventType);
  const lines = useMemo(() => buildPlanLines(state.selectedServices, state.quantities, state.guestCount), [state.selectedServices, state.quantities, state.guestCount]);
  const total = calculateGrandTotal(lines);

  useEffect(() => {
    if (ready) savePlannerState({ ...state, estimatedTotal: total, timestamp: Date.now() });
  }, [state, total, ready]);

  const step = !event ? 1 : lines.length === 0 ? 3 : showForm ? 5 : 4;
  const available = (event?.serviceIds ?? []).flatMap((id) => { const s = getService(id); return s ? [s] : []; });

  function chooseEvent(id: string) {
    const next = getEvent(id);
    if (!next) return;
    const unavailable = state.selectedServices.filter((s) => !next.serviceIds.includes(s));
    if (state.eventType && unavailable.length > 0) setPending(id);
    else setState((p) => ({ ...p, eventType: id }));
  }
  function removeUnavailable() {
    const next = getEvent(pending);
    if (!next) return;
    setState((p) => ({ ...p, eventType: next.id, selectedServices: p.selectedServices.filter((s) => next.serviceIds.includes(s)) }));
    setPending(null);
  }
  const toggle = (id: string) => setState((p) => ({ ...p, selectedServices: p.selectedServices.includes(id) ? p.selectedServices.filter((s) => s !== id) : [...p.selectedServices, id] }));
  const setQty = (id: string, q: number) => setState((p) => ({ ...p, quantities: { ...p.quantities, [id]: Math.max(1, Math.floor(q) || 1) } }));
  const reset = () => { clearPlannerState(); setState(EMPTY); setPending(null); setShowForm(false); setForm(FORM0); };

  const waLink = buildWhatsAppLink(event?.name ?? "an", state.guestCount, lines, total, form.date);
  const mailBody = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nEvent: ${event?.name}\nDate: ${form.date}\nLocation: ${form.location}\nGuests: ${state.guestCount}\n\nServices:\n${lines.map((l) => `${l.service.name} — ${l.detail} — ${formatCurrency(l.total)}`).join("\n")}\n\nEstimated Budget: ${formatCurrency(total)}\n\n${form.notes}`);

  const Summary = (
    <div>
      <p className="text-sm tracking-widest text-gold">YOUR EVENT PLAN</p>
      {lines.length === 0 && <p className="mt-4 text-sm text-champagne/60">Choose an event and add services to see your estimate.</p>}
      <ul className="mt-4 space-y-3">
        {lines.map((l) => (
          <li key={l.service.id} className="flex items-start justify-between gap-3 text-sm">
            <span><Check className="mr-1 inline h-4 w-4 text-gold" />{l.service.name}<br /><span className="ml-5 text-champagne/50">{l.detail}</span></span>
            <span className="flex items-center gap-2">{l.service.pricingType === "custom" ? "TBD" : formatCurrency(l.total)}
              <button aria-label={`Remove ${l.service.name}`} onClick={() => toggle(l.service.id)}><X className="h-4 w-4 text-champagne/50 hover:text-gold" /></button></span>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-gold/40 pt-4">
        <p className="text-xs tracking-widest text-champagne/60">ESTIMATED BUDGET</p>
        <AnimatedNumber value={total} className="font-display text-4xl text-gold" />
        <p className="mt-2 text-xs text-champagne/50">Final pricing may vary based on venue, event date, guest requirements, customization and availability.</p>
      </div>
      <button disabled={lines.length === 0} onClick={() => { setShowForm(true); document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-5 w-full bg-gold py-3 font-medium text-ink hover:bg-warm disabled:opacity-40">Get this event plan</button>
      <button onClick={reset} className="mt-3 w-full text-sm text-champagne/60 underline">Reset my plan</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-ink px-6 pb-32 pt-32">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl sm:text-6xl">Plan your event</h1>
        <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-gold/30 pb-4 text-sm" aria-label="Progress">
          {STEPS.map((s, i) => <li key={s} aria-current={step === i + 1} className={step >= i + 1 ? "text-gold" : "text-champagne/40"}>{i + 1}. {s}</li>)}
        </ol>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-14" id="plan">
            <section aria-labelledby="s1">
              <h2 id="s1" className="font-display text-2xl">Select your event</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {events.map((e) => (
                  <button key={e.id} aria-pressed={state.eventType === e.id} onClick={() => chooseEvent(e.id)} className={`relative h-28 w-36 overflow-hidden border-2 text-left transition-all duration-300 sm:h-32 sm:w-44 ${state.eventType === e.id ? "scale-[1.03] border-gold shadow-[0_0_24px_rgba(212,175,55,0.45)]" : "border-transparent hover:border-gold/60"}`}><SmartImage image={getImage(e.id)} sizes="180px" /><span className="absolute inset-0 bg-gradient-to-t from-ink/90 to-ink/10" /><span className="absolute bottom-2 left-3 font-display text-lg text-champagne">{e.name}</span></button>
                ))}
              </div>
              {pending && (
                <div role="alertdialog" aria-label="Unavailable services" className="mt-6 border border-gold bg-forest p-5">
                  <p>Some selected services are not available for {getEvent(pending)?.name} events. Would you like to remove them?</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button onClick={() => setPending(null)} className="border border-gold px-4 py-2 text-gold">Keep current event</button>
                    <button onClick={removeUnavailable} className="bg-gold px-4 py-2 text-ink">Remove unavailable</button>
                  </div>
                </div>
              )}
            </section>

            <section aria-labelledby="s2">
              <h2 id="s2" className="font-display text-2xl">How many guests are you expecting?</h2>
              <div className="mt-4 flex items-center gap-3">
                <button aria-label="Fewer guests" onClick={() => setState((p) => ({ ...p, guestCount: Math.max(1, p.guestCount - 10) }))} className="border border-gold/40 p-3"><Minus className="h-4 w-4" /></button>
                <input aria-label="Guest count" type="number" min={1} value={state.guestCount} onChange={(e) => setState((p) => ({ ...p, guestCount: Math.max(1, Math.floor(Number(e.target.value)) || 1) }))} className={`${field} w-28 text-center`} />
                <button aria-label="More guests" onClick={() => setState((p) => ({ ...p, guestCount: p.guestCount + 10 }))} className="border border-gold/40 p-3"><Plus className="h-4 w-4" /></button>
              </div>
            </section>

            <section aria-labelledby="s3">
              <h2 id="s3" className="font-display text-2xl">Select services</h2>
              {!event && <p className="mt-4 text-champagne/60">Pick an event above to see the services available for it.</p>}
              <ul className="mt-4 divide-y divide-gold/20 border-y border-gold/20">
                {available.map((s) => {
                  const on = state.selectedServices.includes(s.id);
                  const qty = getQuantity(s.id, state.quantities);
                  const line = lines.find((l) => l.service.id === s.id);
                  return (
                    <li key={s.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                      <button aria-pressed={on} onClick={() => toggle(s.id)} className="flex items-center gap-3 text-left"><span className={`relative block h-14 w-20 shrink-0 overflow-hidden border-2 transition-all duration-300 ${on ? "scale-105 border-gold" : "border-transparent"}`}><SmartImage image={getServiceImage(s.id)} sizes="80px" /></span>
                        <span className={`flex h-6 w-6 items-center justify-center border ${on ? "border-gold bg-gold text-ink" : "border-gold/50"}`}>{on && <Check className="h-4 w-4" />}</span>
                        <span><span className="block text-lg">{s.name}</span>
                          <span className="text-sm text-champagne/50">{s.pricingType === "custom" ? "Quoted on request" : `${formatCurrency(s.price)}${s.pricingType === "fixed" ? "" : ` / ${s.unit}`}`}</span></span>
                      </button>
                      <div className="flex items-center gap-4">
                        {on && (s.pricingType === "per_unit" || s.pricingType === "per_hour") && (
                          <div className="flex items-center gap-2">
                            <button aria-label={`Decrease ${s.name}`} onClick={() => setQty(s.id, qty - (s.pricingType === "per_unit" ? 10 : 1))} className="border border-gold/40 p-2"><Minus className="h-3 w-3" /></button>
                            <input aria-label={`${s.name} quantity`} type="number" min={1} value={qty} onChange={(e) => setQty(s.id, Number(e.target.value))} className={`${field} w-20 py-1 text-center`} />
                            <button aria-label={`Increase ${s.name}`} onClick={() => setQty(s.id, qty + (s.pricingType === "per_unit" ? 10 : 1))} className="border border-gold/40 p-2"><Plus className="h-3 w-3" /></button>
                          </div>
                        )}
                        {line && <span className="w-24 text-right text-gold">{s.pricingType === "custom" ? "TBD" : formatCurrency(line.total)}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {showForm && lines.length > 0 && (
              <section id="enquiry" aria-labelledby="s5">
                <h2 id="s5" className="font-display text-2xl">Get this event plan</h2>
                <p className="mt-2 text-sm text-champagne/60">{event?.name} · {state.guestCount} guests · {lines.length} services · {formatCurrency(total)} estimated. These details are included automatically.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {(["name", "phone", "email", "location"] as const).map((k) => (
                    <input key={k} aria-label={k} placeholder={k[0].toUpperCase() + k.slice(1)} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={field} />
                  ))}
                  <input aria-label="Event date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={field} />
                  <textarea aria-label="Additional requirements" placeholder="Additional requirements" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${field} sm:col-span-2`} rows={3} />
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a href={`mailto:${config.email}?subject=${encodeURIComponent(`Event enquiry: ${event?.name}`)}&body=${mailBody}`} className="bg-gold px-6 py-3 font-medium text-ink">Send enquiry by email</a>
                  <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-gold px-6 py-3 text-gold"><MessageCircle className="h-4 w-4" />Enquire on WhatsApp</a>
                </div>
              </section>
            )}
          </div>

          <aside className="hidden lg:block"><div className="sticky top-28 border border-gold/40 bg-rich p-6">{Summary}</div></aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-gold/40 bg-ink/95 px-6 py-3 lg:hidden">
        <div><p className="text-xs text-champagne/60">ESTIMATE</p><p className="font-display text-2xl text-gold">{formatCurrency(total)}</p></div>
        <details className="relative">
          <summary className="cursor-pointer list-none bg-gold px-5 py-2 font-medium text-ink">View plan</summary>
          <div className="absolute bottom-14 right-0 max-h-[70vh] w-[calc(100vw-3rem)] overflow-auto border border-gold/40 bg-rich p-5">{Summary}</div>
        </details>
      </div>
    </main>
  );
}
