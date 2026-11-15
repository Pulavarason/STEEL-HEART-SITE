"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero } from "@/config/site";
import { photos } from "@/config/images";
import { Photo } from "../Photo";
import { Lines } from "../Lines";
import { HeroScene } from "../three/HeroScene";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";

function go(e: React.MouseEvent, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function Hero({ introDone }: { introDone: boolean }) {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      // Scroll-out: content drifts up, photo pushes in and darkens
      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-photo", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-3d", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-shade", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "30% top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      aria-label="Steel Heart Fitness Studio"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* PHOTO */}
      <div className="hero-photo absolute inset-0 origin-[65%_40%]">
        <Photo slot={photos.hero} priority sizes="100vw" />
      </div>

      {/* Cinematic grading: deep architectural shadows + controlled red light */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 70%, transparent) 38%, transparent 70%), linear-gradient(0deg, var(--bg) 0%, transparent 38%), linear-gradient(180deg, color-mix(in srgb, var(--bg) 80%, transparent) 0%, transparent 22%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-[10%] top-[-10%] h-[85%] w-[55%] rotate-[18deg] opacity-80 blur-2xl"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in srgb, var(--sh-red) 38%, transparent), transparent)",
          mixBlendMode: "screen",
        }}
      />
      {/* architectural verticals */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <span className="absolute inset-y-0 left-[8%] w-px bg-[var(--line)]" />
        <span className="absolute inset-y-0 right-[8%] w-px bg-[var(--line)]" />
      </div>
      <div aria-hidden="true" className="hero-shade absolute inset-0 opacity-0" style={{ background: "var(--bg)" }} />

      {/* 3D HEART: right side, behind headline overlap */}
      <HeroScene
        className="hero-3d pointer-events-none absolute right-[-12%] top-[9%] hidden h-[34svh] w-full sm:right-[2%] sm:top-[9%] sm:block sm:h-[40svh] sm:w-[72%] lg:right-[3%] lg:top-[7%] lg:h-[50svh] lg:w-[46%]"
      />

      {/* CONTENT: asymmetric editorial composition */}
      <div className="hero-content wrap relative z-10 flex min-h-[100svh] flex-col justify-start pb-14 pt-[18svh] sm:justify-end sm:pb-20 sm:pt-32 lg:pb-16">
        <p className="eyebrow mb-6 flex items-center gap-4 sm:mb-8">
          <span className="h-px w-10 bg-[var(--sh-red)]" />
          Steel Heart Fitness Studio
        </p>

        {introDone && (
          <Lines
            as="h1"
            lines={hero.lines}
            accent={[1]}
            immediate
            delay={0.05}
            stagger={0.16}
            className="f-display text-[clamp(3.1rem,13.2vw,13.5rem)] lg:text-[clamp(5rem,11.2vw,13.5rem)] [&>span:nth-child(2)]:pl-[6vw] lg:[&>span:nth-child(2)]:pl-[14vw]"
          />
        )}
        {!introDone && (
          <h1 className="f-display invisible text-[clamp(3.1rem,13.2vw,13.5rem)] lg:text-[clamp(5rem,11.2vw,13.5rem)]">
            {hero.lines.join(" ")}
          </h1>
        )}

        <div className="mt-8 grid items-end gap-8 lg:mt-12 lg:grid-cols-12">
          <p className="f-head max-w-md text-[0.98rem] font-medium leading-relaxed text-[var(--fg-muted)] lg:col-span-4 lg:col-start-2">
            {hero.statement}
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:mt-0 sm:translate-y-3 sm:flex-row lg:col-span-5 lg:col-start-7 lg:justify-end">
            <a href={hero.primary.href} onClick={(e) => go(e, "about")} className="btn justify-between sm:justify-start">
              {hero.primary.label} <ArrowDown size={14} strokeWidth={2.5} />
            </a>
            <a href={hero.secondary.href} onClick={(e) => go(e, "membership")} className="btn btn-solid justify-between sm:justify-start">
              {hero.secondary.label} <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 right-[clamp(1.25rem,4vw,4.5rem)] z-10 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-[var(--line-strong)]">
          <span className="absolute inset-x-0 top-0 h-5 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-[var(--sh-red)]" />
        </span>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}`}</style>
    </section>
  );
}
