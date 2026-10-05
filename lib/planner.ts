import type { PlanLine, PlannerState } from "@/types/planner";
import { getService } from "@/data/services";
import { calculateItemTotal, describePricing } from "./pricing";
import { formatCurrency } from "./utils";
import { config } from "./config";

const KEY = "mezban-planner-v1";

export function savePlannerState(state: PlannerState): void {
  try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
}
export function loadPlannerState(): PlannerState | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PlannerState) : null;
  } catch { return null; }
}
export function clearPlannerState(): void {
  try { window.localStorage.removeItem(KEY); } catch { /* ignore */ }
}

export function getQuantity(id: string, quantities: Record<string, number>): number {
  return quantities[id] ?? getService(id)?.defaultQuantity ?? 1;
}

export function buildPlanLines(ids: string[], quantities: Record<string, number>, guests: number): PlanLine[] {
  const lines: PlanLine[] = [];
  for (const id of ids) {
    const service = getService(id);
    if (!service) continue;
    const quantity = getQuantity(id, quantities);
    lines.push({
      service, quantity,
      total: calculateItemTotal(service, quantity, guests),
      detail: describePricing(service, quantity, guests),
    });
  }
  return lines;
}

export function buildWhatsAppLink(eventName: string, guests: number, lines: PlanLine[], total: number, date: string): string {
  const items = lines
    .map((l) => `${l.service.name} — ${l.service.pricingType === "fixed" || l.service.pricingType === "custom" ? l.detail === "Fixed" ? formatCurrency(l.total) : l.detail : `${l.detail} = ${formatCurrency(l.total)}`}`)
    .join("\n");
  const msg = `Hello Mezban Events & Celebrations,\n\nI am interested in planning a ${eventName} event.\n\nEvent Date:\n${date || "To be decided"}\n\nGuest Count:\n${guests}\n\nSelected Requirements:\n${items || "None yet"}\n\nEstimated Budget:\n${formatCurrency(total)}\n\nPlease contact me regarding this event.`;
  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;
}
