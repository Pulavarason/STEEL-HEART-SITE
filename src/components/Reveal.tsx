"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { registerGsap, prefersReducedMotion, EASE } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fade/slide-up on scroll for supporting copy. */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0, y = 36 }: Props) {
  const ref = useRef<HTMLElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: EASE.soft,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Image-mask reveal: wipes a photo frame open from the bottom, then settles scale. */
export function MaskReveal({
  children,
  className = "",
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right" | "top";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const start: Record<typeof from, string> = {
      bottom: "inset(100% 0% 0% 0%)",
      top: "inset(0% 0% 100% 0%)",
      left: "inset(0% 100% 0% 0%)",
      right: "inset(0% 0% 0% 100%)",
    };
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: start[from] },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [from]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
