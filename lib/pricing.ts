import type { ServiceItem } from "@/types/planner";
import { formatCurrency } from "./utils";

export const calculateFixedPrice = (s: ServiceItem): number => s.price;
export const calculateUnitPrice = (s: ServiceItem, qty: number): number => s.price * qty;
export const calculateGuestPrice = (s: ServiceItem, guests: number): number => s.price * guests;
export const calculateHourlyPrice = (s: ServiceItem, hours: number): number => s.price * hours;

export function calculateItemTotal(s: ServiceItem, quantity: number, guestCount: number): number {
  switch (s.pricingType) {
    case "fixed": return calculateFixedPrice(s);
    case "per_unit": return calculateUnitPrice(s, quantity);
    case "per_guest": return calculateGuestPrice(s, guestCount);
    case "per_hour": return calculateHourlyPrice(s, quantity);
    case "custom": return 0;
  }
}

export function calculateGrandTotal(lines: { total: number }[]): number {
  return lines.reduce((sum, l) => sum + l.total, 0);
}

export function describePricing(s: ServiceItem, quantity: number, guestCount: number): string {
  switch (s.pricingType) {
    case "fixed": return "Fixed";
    case "per_unit": return `${quantity} × ${formatCurrency(s.price)}`;
    case "per_hour": return `${quantity} hr × ${formatCurrency(s.price)}`;
    case "per_guest": return `${guestCount} guests × ${formatCurrency(s.price)}`;
    case "custom": return "Quoted on request";
  }
}
