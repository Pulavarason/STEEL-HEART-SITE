"use client";

import { useRef } from "react";
import { mindset } from "@/config/site";
import { photos } from "@/config/images";
import { Photo } from "../Photo";
import { Reveal } from "../Reveal";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

export function Mindset() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Lines slide in opposite directions as the section crosses the viewport.
      mm.add("(min-width: 768px)", () => {
        el.querySelectorAll<HTMLElement>("[data-slide]").forEach((line) => {
          const dir = Number(line.dataset.slide);
          gsap.fromTo(
            line,
            { xPercent: dir * 14 },
            {
              xPercent: dir * -6,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
            },
          );
        });
      });
      gsap.fromTo(
        ".mindset-photo",
        { clipPath: "inset(12% 10% 12% 10%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "center center", scrub: true },
        },
      );
    }, el);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="The performance mindset"
      className="relative isolate overflow-hidden py-28 lg:py-0 lg:min-h-[120svh]"
    >
      <div className="mindset-photo absolute inset-0 -z-10">
        <Photo slot={photos.mindset} sizes="100vw" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--bg) 0%, transparent 25%, transparent 70%, var(--bg) 100%), linear-gradient(90deg, color-mix(in srgb, var(--bg) 78%, transparent), transparent 80%)",
          }}
        />
      </div>

      <div className="wrap flex h-full flex-col justify-center lg:min-h-[120svh]">
        <Reveal className="mb-10 flex items-center gap-4">
          <span className="eyebrow text-red-accent">04</span>
          <span className="h-px w-16 bg-[var(--line-strong)]" />
          <span className="eyebrow">The Performance Mindset</span>
        </Reveal>

        <h2 className="f-display" aria-label={mindset.lines.join(" ")}>
          <span
            data-slide="1"
            aria-hidden="true"
            className="block text-[clamp(3rem,13vw,13rem)] text-transparent [-webkit-text-stroke:1.5px_var(--fg)]"
          >
            {mindset.lines[0]}
          </span>
          <span
            data-slide="-1"
            aria-hidden="true"
            className="block text-[clamp(3rem,13vw,13rem)] md:pl-[12vw]"
          >
            {mindset.lines[1]}
          </span>
          <span
            data-slide="1"
            aria-hidden="true"
            className="block text-[clamp(3rem,13vw,13rem)] text-red-accent md:pl-[3vw]"
          >
            {mindset.lines[2]}
          </span>
        </h2>

        <Reveal className="mt-12 max-w-md lg:ml-[48vw]">
          <p className="f-serif text-[clamp(1.4rem,2vw,2rem)] leading-snug">{mindset.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
