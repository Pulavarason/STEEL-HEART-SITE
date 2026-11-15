"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { photos } from "@/config/images";
import { Photo } from "../Photo";
import { Lines } from "../Lines";
import { Reveal } from "../Reveal";

export function Facility() {
  const [active, setActive] = useState(0);
  const images = photos.facility;

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), 4200);
    return () => window.clearInterval(timer);
  }, [images.length]);

  const move = (step: number) => setActive((current) => (current + step + images.length) % images.length);

  return (
    <section id="facility" className="relative overflow-hidden bg-[var(--bg)] py-16 lg:py-24">
      <div className="wrap">
        <div className="mb-6 lg:mb-8">
          <div>
            <Reveal className="mb-5 flex items-center gap-4">
              <span className="eyebrow text-red-accent">03</span><span className="h-px w-14 bg-[var(--line-strong)]" /><span className="eyebrow">The Facility</span>
            </Reveal>
            <Lines lines={["STEP INSIDE", "THE ROOM."]} accent={[1]} className="f-display text-[clamp(3rem,8vw,8rem)]" />
          </div>
        </div>

        <div className="relative mx-auto max-w-[900px] [perspective:1400px]">
          <div className="relative h-[clamp(260px,34vw,400px)] overflow-hidden [transform-style:preserve-3d]">
            {[-1, 0, 1].map((offset) => {
              const index = (active + offset + images.length) % images.length;
              const center = offset === 0;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => center ? undefined : move(offset)}
                  aria-label={center ? `${images[index].label}, current image` : `Show ${images[index].label}`}
                  aria-current={center ? "true" : undefined}
                  className={`group absolute top-[6%] left-1/2 h-[88%] overflow-hidden border border-[var(--line-strong)] bg-[var(--surface)] text-left shadow-2xl transition-all duration-[1300ms] ease-[cubic-bezier(.22,1,.36,1)] ${center ? "z-20 w-[56%] -translate-x-1/2 sm:w-[48%] lg:w-[38%]" : offset < 0 ? "z-10 w-[42%] -translate-x-[150%] cursor-pointer lg:w-[30%] lg:-translate-x-[155%]" : "z-10 w-[42%] translate-x-[50%] cursor-pointer lg:w-[30%] lg:translate-x-[55%]"}`}
                  style={{
                    transform: center
                      ? "translateZ(80px) rotateY(0deg)"
                      : offset < 0
                        ? "translateZ(-100px) rotateY(17deg) scale(.84)"
                        : "translateZ(-100px) rotateY(-17deg) scale(.84)",
                    opacity: center ? 1 : 0.54,
                    filter: center ? "none" : "blur(3px)",
                  }}
                >
                  <Photo slot={images[index]} sizes="(min-width: 900px) 58vw, 80vw" showLabel={false} parallax={false} />
                  <span className={`absolute inset-0 transition-opacity duration-700 ${center ? "bg-gradient-to-t from-black/75 via-black/5 to-transparent" : "bg-black/35"}`} />
                  <span className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
                    <span><span className="eyebrow block !text-[0.58rem] !text-white/65">Steel Heart / {String(index + 1).padStart(2, "0")}</span><span className="f-display mt-2 block text-xl sm:text-3xl">{images[index].label.replace("Facility: ", "")}</span></span>
                    <span className="f-head text-xs tracking-[.18em]">{String(index + 1).padStart(2, "0")} <span className="text-white/45">/ {String(images.length).padStart(2, "0")}</span></span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="relative z-30 mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4">
            <div className="flex items-center gap-2" aria-label="Gallery position">
              {images.map((image, i) => <button key={image.label} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-current={active === i} className={`h-[3px] transition-all ${active === i ? "w-10 bg-[var(--sh-red)]" : "w-5 bg-[var(--line-strong)]"}`} />)}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => move(-1)} aria-label="Previous facility image" className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] transition-colors hover:border-[var(--sh-red)] hover:text-[var(--sh-red)]"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => move(1)} aria-label="Next facility image" className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] transition-colors hover:border-[var(--sh-red)] hover:text-[var(--sh-red)]"><ArrowRight size={17} /></button>
              <Link href="/facility" className="btn ml-1 !px-4 !py-3">View all <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
