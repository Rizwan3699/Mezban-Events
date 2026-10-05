import type { EventDefinition } from "@/types/planner";

// ADD NEW EVENTS HERE (e.g. Baby Shower). serviceIds must exist in data/services.ts
const social = ["decoration", "flowers", "lighting", "sound", "dj", "catering", "photography", "videography", "chairs", "stage", "guest-mgmt", "transport"];

export const events: EventDefinition[] = [
  { id: "wedding", name: "Wedding", blurb: "Complete wedding planning and coordination.",
    serviceIds: ["venue", "decoration", "stage", "chairs", "catering", "photography", "videography", "makeup", "mehendi", "transport", "guest-mgmt", "lighting", "sound", "dj", "flowers", "invitations"] },
  { id: "nikah", name: "Nikah", blurb: "Nikah ceremony setup and hospitality.",
    serviceIds: ["venue", "decoration", "stage", "chairs", "catering", "photography", "flowers", "guest-mgmt", "lighting", "invitations"] },
  { id: "walima", name: "Walima", blurb: "Grand reception and catering coordination.",
    serviceIds: ["venue", "decoration", "stage", "chairs", "catering", "photography", "videography", "lighting", "sound", "guest-mgmt", "flowers"] },
  { id: "engagement", name: "Engagement", blurb: "Ring ceremony and engagement setups.",
    serviceIds: ["chairs", "decoration", "lighting", "catering", "photography", "videography", "dj", "sound", "stage", "flowers", "guest-mgmt", "transport"] },
  { id: "birthday", name: "Birthday", blurb: "Themed birthday celebrations.", serviceIds: social },
  { id: "corporate", name: "Corporate Event", blurb: "Meetings, conferences and institutional events.",
    serviceIds: ["venue", "stage", "projector", "sound", "lighting", "photography", "catering", "branding", "registration", "guest-mgmt", "transport"] },
  { id: "religious", name: "Religious Event", blurb: "Milad, Iftar, Eid and community gatherings.",
    serviceIds: ["venue", "tent", "chairs", "decoration", "lighting", "sound", "catering", "guest-mgmt", "photography"] },
  { id: "social", name: "Social Gathering", blurb: "Anniversaries and family get-togethers.", serviceIds: social },
  { id: "school", name: "School Event", blurb: "Annual functions and educational programs.",
    serviceIds: ["stage", "chairs", "sound", "lighting", "decoration", "photography", "videography", "projector", "tent", "guest-mgmt"] },
  { id: "seminar", name: "Seminar", blurb: "Workshops, training and conferences.",
    serviceIds: ["venue", "stage", "chairs", "projector", "sound", "lighting", "registration", "catering", "photography", "branding"] },
  { id: "launch", name: "Product Launch", blurb: "Launches, exhibitions and brand promotions.",
    serviceIds: ["venue", "stage", "projector", "sound", "lighting", "branding", "photography", "videography", "catering", "registration", "guest-mgmt", "dj"] },
  { id: "other", name: "Other", blurb: "Tell us what you have in mind.",
    serviceIds: ["venue", "decoration", "stage", "chairs", "catering", "photography", "lighting", "sound", "dj", "guest-mgmt"] },
];

export function getEvent(id: string | null): EventDefinition | undefined {
  return events.find((e) => e.id === id);
}
