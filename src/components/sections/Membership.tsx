"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { membership } from "@/config/site";
import { Lines } from "../Lines";
import { Reveal } from "../Reveal";

function go(e: React.MouseEvent, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

export function Membership() {
  return (
    <section id="membership" className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-28">
      <div className="wrap relative">
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="eyebrow text-red-accent">06</span>
          <span className="h-px w-16 bg-[var(--line-strong)]" />
          <span className="eyebrow">Membership</span>
        </Reveal>

        <div className="mb-10 grid gap-5 lg:mb-12 lg:grid-cols-12 lg:items-end">
          <Lines
            lines={["FIND YOUR", "MEMBERSHIP."]}
            accent={[1]}
            className="f-display text-[clamp(3rem,8vw,8rem)] lg:col-span-8"
          />
          <Reveal className="lg:col-span-4">
            <p className="f-head max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">Choose a membership term that fits your plans. Ask the studio about current availability and details.</p>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {membership.plans.map((plan, i) => (
            <Reveal
              as="article"
              key={plan.name}
              delay={i * 0.08}
              className={`group relative flex min-h-[430px] flex-col border p-6 transition-all duration-500 hover:-translate-y-1 sm:p-8 ${plan.recommended ? "border-[var(--sh-red)] bg-[linear-gradient(155deg,color-mix(in_srgb,var(--sh-red)_12%,var(--surface)),var(--surface)_55%)] shadow-[0_18px_55px_rgba(229,31,43,.12)]" : "border-[var(--line-strong)] bg-[var(--surface)] hover:border-[var(--sh-red)]"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow text-red-accent">0{i + 1} / Plan</span>
                  <h3 className="f-display mt-4 text-3xl sm:text-4xl">{plan.name}</h3>
                </div>
                {plan.recommended && <span className="f-head border border-[var(--sh-red)] px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-[var(--sh-red)]">Recommended</span>}
              </div>

              <div className="mt-9 flex items-baseline gap-2 border-b border-[var(--line)] pb-6">
                <span className="f-display text-5xl sm:text-6xl">{plan.price}</span>
                <span className="f-head text-xs font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">{plan.period}</span>
              </div>
              <p className="f-head mt-5 text-sm text-[var(--fg-muted)]">{plan.detail}</p>

              <div className="mt-7">
                <p className="eyebrow mb-4 !text-[0.6rem]">What&apos;s included</p>
                <ul className="space-y-3">
                  {plan.inclusions.map((item) => (
                    <li key={item} className="f-head flex items-center gap-2.5 text-xs text-[var(--fg-muted)]">
                      <Check size={14} className="shrink-0 text-[var(--sh-red)]" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              <a href={membership.cta.href} onClick={(e) => go(e, "contact")} className="f-head mt-auto inline-flex items-center justify-between border-t border-[var(--line)] pt-5 text-xs font-extrabold uppercase tracking-[0.16em] transition-colors hover:text-[var(--sh-red)]">
                Ask about this plan <ArrowUpRight size={15} />
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-faint)]">Sample pricing and package inclusions for preview only. Confirm details with the studio.</p>
      </div>
    </section>
  );
}
