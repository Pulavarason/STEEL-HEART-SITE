"use client";

import Image from "next/image";
import type { PhotoSlot } from "@/config/images";

type Props = {
  slot: PhotoSlot;
  sizes?: string;
  priority?: boolean;
  className?: string;
  showLabel?: boolean;
  /** extra overflow on top/bottom so parallax never reveals edges */
  parallax?: boolean;
};

/**
 * Renders the real client photo when `slot.src` is set, otherwise a designed
 * industrial placeholder. The inner element carries data-parallax for GSAP.
 */
export function Photo({
  slot,
  sizes = "100vw",
  priority,
  className = "",
  showLabel = true,
  parallax = true,
}: Props) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        data-parallax={parallax ? "" : undefined}
        className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform"
      >
        {slot.src ? (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes}
            priority={priority}
            style={{ objectFit: "cover", objectPosition: slot.position ?? "center" }}
          />
        ) : (
          <div className="ph" data-tone={slot.tone} role="img" aria-label={slot.alt}>
            {showLabel && (
              <span className="eyebrow absolute bottom-4 left-4 z-10 max-w-[80%] text-[0.6rem] opacity-70">
                {slot.label}
              </span>
            )}
          </div>
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--photo-overlay)" }}
      />
    </div>
  );
}
