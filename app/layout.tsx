import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Mezban Events & Celebrations | Event Management in Beed, Maharashtra",
  description:
    "Mezban Events & Celebrations provides professional wedding planning, event management, decoration, catering, photography, corporate events and complete event coordination in Beed, Maharashtra.",
  openGraph: {
    title: "Mezban Events & Celebrations",
    description: "Your Event, Our Responsibility. Event management in Beed, Maharashtra.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
