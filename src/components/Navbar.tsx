"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/config/site";
import { ThemeSwitcher } from "./ThemeSwitcher";

function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const click = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => goTo(id), open ? 450 : 0);
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[70] transition-all duration-500"
        style={{
          background: scrolled ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(1.2)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
        }}
      >
        <div
          className={`wrap flex items-center justify-between gap-6 transition-all duration-500 ${
            scrolled ? "py-2.5" : "py-5 lg:py-7"
          }`}
        >
          <a
            href="#home"
            onClick={(e) => click(e, "home")}
            aria-label={`${site.fullName}, back to top`}
            className="relative flex shrink-0 items-center gap-3"
          >
            <Image
              src="/brand/steel-heart-logo.png"
              alt=""
              width={56}
              height={56}
              priority
              className={`transition-all duration-500 ${scrolled ? "h-10 w-10" : "h-12 w-12 lg:h-14 lg:w-14"}`}
            />
            <span className="f-display hidden text-xl tracking-[0.08em] sm:block">
              STEEL <span className="text-red-accent">HEART</span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((n) => {
                const on = active === n.id;
                return (
                  <li key={n.id}>
                    <a
                      href={n.href}
                      onClick={(e) => click(e, n.id)}
                      aria-current={on ? "true" : undefined}
                      className="group relative block py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.24em] transition-colors"
                      style={{
                        fontFamily: "var(--font-head)",
                        color: on ? "var(--fg)" : "var(--fg-muted)",
                      }}
                    >
                      {n.label}
                      <span
                        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[var(--sh-red)] transition-transform duration-500"
                        style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeSwitcher />
            <a
              href="#membership"
              onClick={(e) => click(e, "membership")}
              className="btn btn-solid hidden !px-5 !py-3 sm:inline-flex"
            >
              Join Now <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[90] grid h-11 w-11 place-items-center lg:hidden"
            >
              <span
                className="absolute h-[2px] w-6 bg-[var(--fg)] transition-transform duration-500"
                style={{ transform: open ? "rotate(45deg)" : "translateY(-4px)" }}
              />
              <span
                className="absolute h-[2px] w-6 bg-[var(--sh-red)] transition-transform duration-500"
                style={{ transform: open ? "rotate(-45deg)" : "translateY(4px)" }}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[85] flex flex-col justify-between overflow-y-auto bg-[var(--bg)] px-6 pb-8 pt-28"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full opacity-60 blur-3xl"
              style={{ background: "var(--glow)" }}
            />
            <ul className="relative flex flex-col">
              {nav.map((n, i) => (
                <li key={n.id} className="overflow-hidden border-b border-[var(--line)]">
                  <motion.a
                    href={n.href}
                    onClick={(e) => click(e, n.id)}
                    className="flex items-baseline justify-between py-4"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="f-display text-[clamp(2.6rem,13vw,4.5rem)]"
                      style={{ color: active === n.id ? "var(--headline-accent)" : "var(--fg)" }}
                    >
                      {n.label}
                    </span>
                    <span className="eyebrow">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="relative mt-10 flex flex-col gap-5">
              <a
                href="#membership"
                onClick={(e) => click(e, "membership")}
                className="btn btn-solid justify-center"
              >
                Join Now <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
              <p className="eyebrow text-center">{site.tagline}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
