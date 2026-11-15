"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

/**
 * Brand intro (~2.4s). Logo emerges with a heartbeat, an ECG hairline draws
 * beneath it, then the black panel wipes upward into the hero.
 * Skipped instantly under prefers-reduced-motion.
 */
export function Intro({ onDone }: { onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const finish = () => {
      document.body.style.overflow = "";
      setGone(true);
      onDone?.();
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const logo = el.querySelector(".intro-logo");
      const ring = el.querySelector(".intro-ring");
      const ecg = el.querySelector<SVGPathElement>(".intro-ecg");
      const word = el.querySelectorAll(".intro-word");
      const len = ecg?.getTotalLength() ?? 600;
      if (ecg) gsap.set(ecg, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(logo, { scale: 0.7, opacity: 0, filter: "blur(10px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "expo.out" }, 0.1)
        .fromTo(ring, { scale: 0.8, opacity: 0.9 }, { scale: 1.9, opacity: 0, duration: 1.1, ease: "power2.out" }, 0.45)
        .to(logo, { scale: 1.06, duration: 0.16, yoyo: true, repeat: 3, ease: "power2.inOut" }, 0.7)
        .to(ecg, { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 0.5)
        .fromTo(word, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.08, ease: "expo.out" }, 0.9)
        .to(el.querySelector(".intro-content"), { opacity: 0, y: -20, duration: 0.45, ease: "power2.in" }, 2.0)
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "power4.inOut" }, 2.1);
    }, el);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[300] grid place-items-center overflow-hidden"
      style={{ background: "#08090b", clipPath: "inset(0 0 0% 0)" }}
    >
      {/* subtle brushed-metal texture */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(174,180,186,0.035) 0 1px, transparent 1px 6px), radial-gradient(60% 50% at 50% 45%, rgba(229,31,43,0.12), transparent 70%)",
        }}
      />
      <div className="intro-content relative flex flex-col items-center px-6">
        <div className="relative grid place-items-center">
          <span
            className="intro-ring absolute h-[min(52vw,230px)] w-[min(52vw,230px)] rounded-full border border-[#e51f2b]"
            style={{ opacity: 0 }}
          />
          <Image
            src="/brand/steel-heart-logo.png"
            alt=""
            width={230}
            height={230}
            priority
            className="intro-logo h-[min(52vw,230px)] w-[min(52vw,230px)]"
            style={{ opacity: 0 }}
          />
        </div>
        <svg viewBox="0 0 400 40" className="mt-8 h-8 w-[min(80vw,360px)] overflow-visible">
          <path
            className="intro-ecg"
            d="M0 20 H130 L142 20 L152 8 L164 34 L176 2 L188 28 L198 20 H400"
            fill="none"
            stroke="#e51f2b"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(229,31,43,0.8))" }}
          />
        </svg>
        <p className="f-display mt-4 flex gap-3 text-[1.1rem] tracking-[0.3em] text-[#aeb4ba]">
          <span className="overflow-hidden"><span className="intro-word block">BUILT WITH HEART</span></span>
        </p>
      </div>
    </div>
  );
}
