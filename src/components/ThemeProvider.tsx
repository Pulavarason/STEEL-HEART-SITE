"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

type Theme = "dark" | "light";

type Ctx = {
  theme: Theme;
  toggle: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<Ctx | null>(null);
const KEY = "sh-theme";

/** Inline script run before paint to avoid theme flash. Dark is the primary default. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${KEY}');var t=s||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const veil = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const stored = useRef(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as Theme | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current === "light" || current === "dark") setTheme(current);
    try {
      stored.current = localStorage.getItem(KEY) !== null;
    } catch {
      stored.current = false;
    }
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      if (stored.current) return;
      const next: Theme = e.matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const apply = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    stored.current = true;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }, []);

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      if (busy.current) return;
      const next: Theme = theme === "dark" ? "light" : "dark";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const el = veil.current;
      if (reduce || !el) {
        apply(next);
        return;
      }
      busy.current = true;
      const x = origin ? origin.x : window.innerWidth - 60;
      const y = origin ? origin.y : 40;
      el.style.setProperty("--vx", `${x}px`);
      el.style.setProperty("--vy", `${y}px`);
      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false;
        },
      });
      tl.set(el, { clipPath: `circle(0px at ${x}px ${y}px)`, visibility: "visible" })
        .to(el, {
          clipPath: `circle(150vmax at ${x}px ${y}px)`,
          duration: 0.7,
          ease: "power3.in",
        })
        .add(() => apply(next))
        .to(el, {
          clipPath: `circle(0px at ${x}px ${y}px)`,
          duration: 0.7,
          ease: "power3.out",
          // retract from the opposite side feel: shrink toward the same origin
        })
        .set(el, { visibility: "hidden" });
    },
    [theme, apply],
  );

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <div
        ref={veil}
        aria-hidden="true"
        className="theme-veil"
        style={{ visibility: "hidden" }}
      />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
