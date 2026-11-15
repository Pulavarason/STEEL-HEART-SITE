"use client";

import { useRef, type ElementType } from "react";
import { registerGsap, prefersReducedMotion, EASE } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

type Props = {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  /** indexes of lines rendered in the signature red */
  accent?: number[];
  /** start immediately instead of on scroll (hero) */
  immediate?: boolean;
  delay?: number;
  /** also split each line by words for a staggered athletic reveal */
  stagger?: number;
};

/**
 * Clipped, staggered headline reveal. Each line sits in an overflow mask and
 * slides up. Screen readers get the full text through a single aria-label.
 */
export function Lines({
  lines,
  as: Tag = "h2",
  className = "",
  accent = [],
  immediate = false,
  delay = 0,
  stagger = 0.12,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const inners = root.querySelectorAll<HTMLElement>(".line-inner");
    if (prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 115, rotate: 2 });
      const to = {
        yPercent: 0,
        rotate: 0,
        duration: 1.15,
        ease: EASE.out,
        stagger,
        delay,
      };
      if (immediate) {
        gsap.to(inners, to);
      } else {
        gsap.to(inners, {
          ...to,
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, [immediate, delay, stagger]);

  return (
    <Tag ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((l, i) => (
        <span key={i} aria-hidden="true" className="line-mask">
          <span className={`line-inner ${accent.includes(i) ? "text-red-accent" : ""}`}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  );
}
