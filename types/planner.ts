export type EventType = string;
export type PricingType = "fixed" | "per_unit" | "per_guest" | "per_hour" | "custom";

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  pricingType: PricingType;
  unit?: string;
  defaultQuantity?: number;
}

export interface EventDefinition {
  id: EventType;
  name: string;
  blurb: string;
  serviceIds: string[];
}

export interface SelectedService {
  serviceId: string;
  quantity: number;
}

export interface PlannerState {
  eventType: EventType | null;
  guestCount: number;
  selectedServices: string[];
  quantities: Record<string, number>;
  estimatedTotal: number;
  currentStep: number;
  timestamp: number;
}

export interface PlanLine {
  service: ServiceItem;
  quantity: number;
  total: number;
  detail: string;
}
