"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeartScene = dynamic(() => import("./HeartScene"), { ssr: false });

/**
 * Lazy 3D wrapper. The WebGL chunk loads only when:
 *  - the user has not requested reduced motion
 *  - the device is not obviously low-powered
 *  - WebGL is available
 * Rendering pauses whenever the hero leaves the viewport.
 */
export function HeroScene({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = (navigator.hardwareConcurrency ?? 4) <= 2;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(!reduce && !lowPower && webgl);
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={host} className={className} aria-hidden="true">
      {enabled && <HeartScene active={visible} pointer={pointer} />}
    </div>
  );
}
