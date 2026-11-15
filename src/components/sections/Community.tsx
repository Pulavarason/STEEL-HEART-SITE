"use client";

import { community } from "@/config/site";
import { photos } from "@/config/images";
import { Photo } from "../Photo";
import { Lines } from "../Lines";
import { MaskReveal, Reveal } from "../Reveal";

export function Community() {
  return (
    <section aria-labelledby="community-title" className="relative bg-[var(--bg-alt)] py-24 lg:py-40">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text column */}
          <div className="lg:col-span-5">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="eyebrow text-red-accent">05</span>
              <span className="h-px w-16 bg-[var(--line-strong)]" />
              <span className="eyebrow">Training Community</span>
            </Reveal>
            <h2 id="community-title" className="sr-only">
              {community.title}
            </h2>
            <Lines
              as="p"
              lines={["TRAIN", "TOGETHER.", "GROW", "TOGETHER."]}
              accent={[1, 3]}
              className="f-display text-[clamp(3rem,9vw,9rem)]"
            />
            <Reveal className="mt-8 max-w-md">
              <p className="f-serif text-[clamp(1.4rem,2vw,2rem)] leading-snug">{community.intro}</p>
            </Reveal>

            <ul className="mt-12 border-t border-[var(--line-strong)]">
              {community.values.map((v, i) => (
                <Reveal
                  as="li"
                  key={v.title}
                  delay={i * 0.05}
                  className="group flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-4 transition-colors hover:border-[var(--sh-red)]"
                >
                  <span className="f-display text-2xl lg:text-3xl transition-transform duration-500 group-hover:translate-x-2">
                    {v.title}
                  </span>
                  <span className="f-head hidden max-w-[16rem] text-right text-xs leading-relaxed text-[var(--fg-muted)] sm:block">
                    {v.text}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Staggered photo composition */}
          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-12 gap-3 md:gap-5">
              <MaskReveal from="top" className="relative col-span-8 aspect-[4/5]">
                <Photo slot={photos.community[0]} sizes="(min-width:1024px) 40vw, 70vw" />
              </MaskReveal>
              <MaskReveal from="right" className="relative col-span-4 mt-16 aspect-[3/5] md:mt-32">
                <Photo slot={photos.community[1]} sizes="(min-width:1024px) 20vw, 30vw" />
              </MaskReveal>
              <MaskReveal from="left" className="relative col-span-12 -mt-6 aspect-[16/8] md:col-span-9 md:col-start-3 md:-mt-12">
                <Photo slot={photos.community[2]} sizes="(min-width:1024px) 45vw, 100vw" />
              </MaskReveal>
            </div>
            <p className="mt-6 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--fg-faint)]">
              {community.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
