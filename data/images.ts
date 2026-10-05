// ALL image URLs live here. Swap any entry for your own file, e.g. src: "/images/events/nikah.jpg".
export interface SiteImage { id: string; src: string; alt: string; title: string; category: string }

const u = (p: string) => `https://images.unsplash.com/photo-${p}?auto=format&fit=crop&w=1600&q=80`;
const P = {
  stage: "1519741497674-611481863552", table: "1511795409834-ef04bbd61622", decor: "1464366400600-7168b8af9bc3",
  reception: "1519225421980-715cb0215aed", party: "1492684223066-81342ee5ff30", conf: "1540575467063-178a50c2df87", conf2: "1505373877841-8d25f7d46678",
};
const rows: [string, keyof typeof P, string, string][] = [
  ["hero", "stage", "Luxury celebration stage", "Weddings"], ["about", "reception", "Elegant reception hall", "Walima"],
  ["about2", "table", "Styled event table", "Decoration"], ["default", "decor", "Floral event decoration", "Decoration"],
  ["wedding", "stage", "Wedding stage", "Weddings"], ["nikah", "table", "Nikah ceremony setup", "Nikah"],
  ["walima", "reception", "Walima reception", "Walima"], ["engagement", "decor", "Engagement celebration", "Engagement"],
  ["corporate", "conf", "Corporate conference", "Corporate"], ["seminar", "conf2", "Seminar setup", "Corporate"],
  ["launch", "conf", "Product launch", "Corporate"], ["religious", "table", "Community gathering", "Religious"],
  ["school", "conf2", "School event", "Corporate"], ["social", "party", "Social celebration", "Social"],
  ["birthday", "party", "Birthday celebration", "Social"], ["other", "decor", "Custom event", "Social"],
];
export const images: Record<string, SiteImage> = Object.fromEntries(
  rows.map(([id, p, title, category]) => [id, { id, src: u(P[p]), alt: title, title, category }]),
);
export const getImage = (id: string): SiteImage => images[id] ?? images.default;

// planner service id -> image id
const serviceMap: Record<string, string> = {
  decoration: "wedding", flowers: "engagement", stage: "wedding", chairs: "walima", catering: "nikah", lighting: "social",
  sound: "social", dj: "birthday", photography: "walima", videography: "wedding", venue: "walima", projector: "seminar", tent: "religious",
};
export const getServiceImage = (serviceId: string): SiteImage => getImage(serviceMap[serviceId] ?? "default");

export const heroImages = [images.hero];
export const eventImages = ["wedding", "engagement", "walima", "corporate", "religious", "seminar"].map(getImage);
export const founderImages: SiteImage[] = [];
export const portfolioImages: SiteImage[] = [];
