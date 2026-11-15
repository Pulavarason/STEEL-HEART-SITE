"use client";

import { philosophy } from "@/config/site";
import { photos } from "@/config/images";
import { Photo } from "../Photo";
import { Lines } from "../Lines";
import { MaskReveal, Reveal } from "../Reveal";

export function Philosophy() {
  return (
    <section id="about" className="relative isolate bg-[var(--bg)] pb-20 pt-0 lg:pb-28">
      {/* Metallic seam from the hero: a brushed-steel diagonal edge */}
      <div aria-hidden="true" className="relative -mt-px h-16 overflow-hidden sm:h-24 lg:h-32">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, #1b1e22 0%, #aeb4ba 22%, #f4f5f6 30%, #6b7279 40%, #2a2e32 60%, #8a9097 82%, #1b1e22 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: "var(--bg)",
            clipPath: "polygon(0 100%, 100% 35%, 100% 100%)",
          }}
        />
        <span
          className="absolute left-0 top-0 h-[2px] w-1/3 bg-[var(--sh-red)]"
          style={{ boxShadow: "0 0 18px rgba(229,31,43,.8)" }}
        />
      </div>

      <div className="wrap relative">
        <Reveal className="mb-8 flex items-center gap-4 lg:mb-10">
          <span className="eyebrow text-red-accent">01</span>
          <span className="h-px w-16 bg-[var(--line-strong)]" />
          <span className="eyebrow">The Steel Heart Philosophy</span>
        </Reveal>

        <div className="mt-8 grid items-center gap-8 border-t border-[var(--line)] pt-7 sm:grid-cols-12 lg:mt-10 lg:gap-12">
          <MaskReveal from="left" className="relative aspect-[4/3] overflow-hidden border border-[var(--line-strong)] sm:col-span-5 lg:aspect-[4/5]">
            <Photo slot={photos.philosophy} sizes="(min-width: 1024px) 38vw, 100vw" />
            <span className="absolute bottom-5 left-5 z-10 eyebrow !text-white">Built with heart. Forged in steel.</span>
          </MaskReveal>
          <div className="sm:col-span-7 sm:pl-2 lg:pl-4">
            <Reveal>
              <p className="eyebrow mb-5 text-red-accent">A stronger way forward</p>
              <p className="f-serif text-[clamp(1.7rem,3vw,3rem)] leading-[1.1] text-[var(--fg)]">{philosophy.intro}</p>
            </Reveal>
            <Reveal className="f-head mt-6 max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)] sm:mt-8">
              <p>Steel Heart is built around honest effort, steady commitment, and progress made one session at a time. Meet yourself where you are, put in the work, and leave a little stronger.</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--fg-faint)]">A stronger body. A steadier mind. A heart that keeps showing up.</p>
            </Reveal>
            <Reveal className="mt-8 border-t border-[var(--line)] pt-5 lg:mt-10">
              <p className="f-head max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)]">
                Real progress is rarely one dramatic moment. It is the decision to return, to keep learning, and to give your best effort to the day in front of you. The work adds up—and the strength you build reaches beyond the gym.
              </p>
              <p className="f-display mt-6 text-xl leading-tight text-[var(--fg)] sm:text-2xl">
                No quick fixes. No need to be perfect. Just keep moving forward.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Pillars: ruled typographic rows instead of cards */}
        <ol className="mt-10 border-t border-[var(--line-strong)] lg:mt-14 lg:grid lg:grid-cols-4">
          {philosophy.pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.n}
              delay={i * 0.08}
              className="group relative border-b border-[var(--line)] py-8 lg:border-b-0 lg:border-r lg:py-12 lg:pr-8 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-8"
            >
              <span className="f-display block text-[3.4rem] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--fg-faint)] group-hover:text-[var(--sh-red)] group-hover:[-webkit-text-stroke-color:var(--sh-red)]">
                {p.n}
              </span>
              <h3 className="f-display mt-4 text-3xl lg:text-4xl">{p.title}</h3>
              <p className="f-head mt-3 max-w-xs text-sm leading-relaxed text-[var(--fg-muted)]">{p.text}</p>
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-[var(--sh-red)] transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
