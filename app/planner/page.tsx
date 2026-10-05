import type { Metadata } from "next";
import EventPlanner from "@/components/planner/EventPlanner";

export const metadata: Metadata = { title: "Event Planner | Mezban Events & Celebrations" };

export default function PlannerPage() {
  return <EventPlanner />;
}
