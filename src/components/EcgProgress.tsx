"use client";

import { useEffect, useRef } from "react";

/**
 * Heartbeat-inspired scroll progress.
 * A hairline fills across the top of the viewport; at its leading edge a
 * single ECG beat rides along, echoing the pulse mark in the logo.
 * Refined: one beat, no grid, no monitor chrome.
 */
export function EcgProgress() {
  const line = useRef<SVGPathElement>(null);
  const base = useRef<SVGLineElement>(null);

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;
    let w = window.innerWidth;

    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const draw = () => {
      current += (target - current) * 0.14;
      const x = current * w;
      const mid = 10;
      // single beat shape, 54px wide, sits at the leading edge
      const b = Math.min(x, w - 56);
      const d =
        `M0 ${mid} L${Math.max(0, b - 8)} ${mid} ` +
        `L${b} ${mid} L${b + 6} ${mid - 3} L${b + 12} ${mid} ` +
        `L${b + 17} ${mid + 3} L${b + 21} ${mid - 9} L${b + 26} ${mid + 8} ` +
        `L${b + 31} ${mid} L${b + 38} ${mid - 2} L${b + 44} ${mid} L${Math.max(x, b + 44)} ${mid}`;
      line.current?.setAttribute("d", x < 2 ? `M0 ${mid} L0 ${mid}` : d);
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = window.innerWidth;
      base.current?.setAttribute("x2", String(w));
      read();
    };

    read();
    onResize();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-5"
    >
      <svg width="100%" height="20" className="block overflow-visible">
        <line
          ref={base}
          x1="0"
          y1="10"
          x2="1200"
          y2="10"
          stroke="var(--line)"
          strokeWidth="1"
        />
        <path
          ref={line}
          d="M0 10 L0 10"
          fill="none"
          stroke="#e51f2b"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 4px rgba(229,31,43,0.7))" }}
        />
      </svg>
    </div>
  );
}
