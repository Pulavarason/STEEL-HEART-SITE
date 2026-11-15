"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { training } from "@/config/site";
import { photos, type PhotoSlot } from "@/config/images";
import { Photo } from "../Photo";
import { Lines } from "../Lines";
import { Reveal } from "../Reveal";

/**
 * Each category owns a distinct frame silhouette so the showcase never
 * collapses into repeated identical cards.
 */
const frames: Record<string, { clip: string; aspect: string; align: string }> = {
  strength: { clip: "polygon(0 0,100% 0,100% 86%,86% 100%,0 100%)", aspect: "4/5", align: "lg:ml-0" },
  weight: { clip: "polygon(14% 0,100% 0,100% 100%,0 100%,0 14%)", aspect: "1/1", align: "lg:ml-8" },
  personal: { clip: "polygon(0 0,86% 0,100% 14%,100% 100%,0 100%)", aspect: "5/6", align: "lg:ml-4" },
  functional: { clip: "polygon(0 12%,12% 0,100% 0,100% 88%,88% 100%,0 100%)", aspect: "6/5", align: "lg:ml-0" },
  cardio: { clip: "polygon(0 0,100% 0,100% 100%,16% 100%,0 84%)", aspect: "4/5", align: "lg:ml-10" },
  performance: { clip: "polygon(9% 0,100% 0,91% 100%,0 100%)", aspect: "1/1", align: "lg:ml-2" },
};

export function Training() {
  const [active, setActive] = useState(0);
  const current = training[active];
  const slot = (photos.training as Record<string, PhotoSlot>)[current.id];
  const frame = frames[current.id];

  return (
    <section id="training" className="relative bg-[var(--bg-alt)] py-20 lg:py-28">
      <div className="wrap">
        <div className="mb-8 grid gap-6 lg:mb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="eyebrow text-red-accent">02</span>
              <span className="h-px w-16 bg-[var(--line-strong)]" />
              <span className="eyebrow">Training Experiences</span>
            </Reveal>
            <Lines
              lines={["TRAIN WITH", "PURPOSE."]}
              accent={[1]}
              className="f-display text-[clamp(3rem,10vw,10rem)]"
            />
          </div>
          <Reveal className="lg:col-span-4">
            <p className="f-head text-sm leading-relaxed text-[var(--fg-muted)]">
              Select a discipline to explore it. Training categories shown here are proposed and
              will be finalised with the studio before launch.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Index list */}
          <ul className="lg:col-span-7" role="tablist" aria-label="Training categories" aria-orientation="vertical">
            {training.map((t, i) => {
              const on = i === active;
              const s = (photos.training as Record<string, PhotoSlot>)[t.id];
              const f = frames[t.id];
              return (
                <li key={t.id} className="border-t border-[var(--line-strong)] last:border-b" role="presentation">
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={on}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative flex w-full items-center justify-between gap-4 py-5 text-left lg:py-7"
                  >
                    <span className="flex items-baseline gap-4 lg:gap-8">
                      <span
                        className="f-head w-8 text-xs font-extrabold tracking-[0.2em] transition-colors"
                        style={{ color: on ? "var(--sh-red)" : "var(--fg-faint)" }}
                      >
                        {t.index}
                      </span>
                      <span
                        className="f-display text-[clamp(1.9rem,8vw,3.4rem)] lg:text-[clamp(2.6rem,4.4vw,4.8rem)] transition-all duration-500"
                        style={{
                          color: on ? "var(--fg)" : "transparent",
                          WebkitTextStroke: on ? "0px" : "1px var(--fg-faint)",
                          transform: on ? "translateX(1.2rem)" : "translateX(0)",
                        }}
                      >
                        {t.title}
                      </span>
                    </span>
                    <Plus
                      size={22}
                      strokeWidth={2}
                      className="shrink-0 transition-transform duration-500"
                      style={{ transform: on ? "rotate(135deg)" : "none", color: on ? "var(--sh-red)" : "var(--fg-muted)" }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[2px] bg-[var(--sh-red)] transition-all duration-700"
                      style={{ width: on ? "100%" : "0%" }}
                    />
                  </button>

                  {/* Mobile: inline expansion with its own frame */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`panel-m-${t.id}`}
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                      >
                        <div className="pb-8">
                          <div className="relative w-full" style={{ aspectRatio: f.aspect, clipPath: f.clip }}>
                            <Photo slot={s} sizes="100vw" parallax={false} />
                          </div>
                          <p className="eyebrow mt-5 text-red-accent">{t.kicker}</p>
                          <p className="f-head mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{t.text}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Desktop: sticky showcase, silhouette changes per category */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div
                role="tabpanel"
                id={`panel-${current.id}`}
                aria-labelledby={`tab-${current.id}`}
                className={`relative transition-[margin] duration-700 ${frame.align}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    className="relative w-full"
                    style={{ aspectRatio: frame.aspect }}
                    initial={{ clipPath: "polygon(0 0,0 0,0 100%,0 100%)", opacity: 1 }}
                    animate={{ clipPath: frame.clip, opacity: 1 }}
                    exit={{ clipPath: "polygon(100% 0,100% 0,100% 100%,100% 100%)", opacity: 1 }}
                    transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Photo slot={slot} sizes="40vw" parallax={false} />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(0deg, rgba(8,9,11,.65), transparent 45%)" }}
                    />
                    <div className="absolute bottom-6 left-[18%] right-6 text-white">
                      <p className="eyebrow !text-[var(--sh-red)]">{current.kicker}</p>
                      <p className="f-display mt-2 text-4xl">{current.title}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="f-head mt-6 max-w-sm text-sm leading-relaxed text-[var(--fg-muted)]">
                {current.text}
              </p>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--fg-faint)]">
                {String(active + 1).padStart(2, "0")} / {String(training.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
