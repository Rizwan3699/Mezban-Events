import type { ServiceItem } from "@/types/planner";

// EDIT PRICES HERE. Placeholder values - replace with Mezban's real rates.
export const services: ServiceItem[] = [
  { id: "venue", name: "Venue", price: 50000, pricingType: "fixed" },
  { id: "decoration", name: "Decoration", price: 20000, pricingType: "fixed" },
  { id: "flowers", name: "Flower Decoration", price: 15000, pricingType: "fixed" },
  { id: "stage", name: "Stage", price: 12000, pricingType: "fixed" },
  { id: "chairs", name: "Chairs", price: 50, pricingType: "per_unit", unit: "chair", defaultQuantity: 50 },
  { id: "catering", name: "Catering", price: 500, pricingType: "per_guest", unit: "guest" },
  { id: "photography", name: "Photography", price: 15000, pricingType: "fixed" },
  { id: "videography", name: "Videography", price: 20000, pricingType: "fixed" },
  { id: "makeup", name: "Makeup", price: 10000, pricingType: "fixed" },
  { id: "mehendi", name: "Mehendi", price: 5000, pricingType: "fixed" },
  { id: "transport", name: "Transportation", price: 8000, pricingType: "fixed" },
  { id: "guest-mgmt", name: "Guest Management", price: 6000, pricingType: "fixed" },
  { id: "lighting", name: "Lighting", price: 5000, pricingType: "fixed" },
  { id: "sound", name: "Sound System", price: 6000, pricingType: "fixed" },
  { id: "dj", name: "DJ", price: 2000, pricingType: "per_hour", unit: "hour", defaultQuantity: 4 },
  { id: "projector", name: "Projector & Screen", price: 7000, pricingType: "fixed" },
  { id: "branding", name: "Branding", price: 0, pricingType: "custom" },
  { id: "registration", name: "Registration Desk", price: 4000, pricingType: "fixed" },
  { id: "tent", name: "Tent & Seating Setup", price: 18000, pricingType: "fixed" },
  { id: "invitations", name: "Invitations & Printing", price: 0, pricingType: "custom" },
];

export function getService(id: string): ServiceItem | undefined {
  return services.find((s) => s.id === id);
}

// Marketing content for the home page (not the priced planner items above)
export const showcaseServices: { title: string; image: string }[] = [
  { title: "Venue Selection & Coordination", image: "walima" }, { title: "Decoration & Theme Setup", image: "wedding" },
  { title: "Catering & Menu Coordination", image: "nikah" }, { title: "Photography & Videography", image: "engagement" },
  { title: "Sound, DJ & Lighting", image: "birthday" }, { title: "Stage, Tent & Seating", image: "religious" },
  { title: "Invitations & Printing", image: "about2" }, { title: "Makeup, Mehendi & Cake", image: "engagement" },
  { title: "Transportation & Guest Support", image: "social" }, { title: "Guest Management & Hospitality", image: "corporate" },
  { title: "Vendor Coordination & Negotiation", image: "seminar" }, { title: "Event-Day Coordination", image: "launch" },
  { title: "Custom Theme & Setup", image: "default" }, { title: "Complete Event Management", image: "hero" },
];
export const whyItems: { title: string; text: string; image: string }[] = [
  { title: "Planning", text: "We map your idea, guest count, budget and timeline before anything is booked.", image: "about" },
  { title: "Coordination", text: "Venue, vendors, guests and logistics run through one point of contact.", image: "corporate" },
  { title: "Quality service", text: "Every detail is checked, from the stage to the last table.", image: "wedding" },
  { title: "Trusted vendors", text: "We negotiate and manage the vendors so you deal with one team.", image: "nikah" },
  { title: "Memorable celebrations", text: "You enjoy your event. Mezban carries the responsibility.", image: "engagement" },
];
