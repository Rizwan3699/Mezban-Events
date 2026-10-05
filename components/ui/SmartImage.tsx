"use client";
import Image from "next/image";
import { useState } from "react";
import type { SiteImage } from "@/data/images";

// Parent must be `relative` with a size. Falls back to a gold/green tile if the image fails.
export default function SmartImage({ image, sizes = "100vw", priority = false, className = "" }: { image: SiteImage; sizes?: string; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={image.alt} className="absolute inset-0 bg-gradient-to-br from-forest via-rich to-gold/40" />;
  return <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
