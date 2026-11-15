"use client";

import { useEffect } from "react";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Applies subtle scroll parallax to every [data-parallax] element on the page.
 * One controller keeps ScrollTrigger usage centralized and cheap.
 */
export function ParallaxController() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const host = el.parentElement ?? el;
        gsap.fromTo(
          el,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);
  return null;
}
