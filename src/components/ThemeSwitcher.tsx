"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/** Rounded pill switch for changing between the dark and light site themes. */
export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const isLight = theme === "light";

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={() => {
        const bounds = ref.current?.getBoundingClientRect();
        toggle(bounds ? { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 } : undefined);
      }}
      className={`relative h-8 w-[3.75rem] shrink-0 rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)] p-1 shadow-[inset_0_2px_5px_rgba(0,0,0,.35),0_2px_8px_rgba(0,0,0,.18)] transition-colors hover:border-[var(--sh-red)] ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-1 top-1 z-10 grid h-6 w-6 place-items-center rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,.32),inset_0_1px_1px_rgba(255,255,255,.9)]"
        animate={{ x: isLight ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 25, mass: 0.7 }}
      >
        {isLight ? <Sun size={16} strokeWidth={2.2} className="text-[var(--sh-red)]" /> : <Moon size={15} strokeWidth={2.2} className="text-[#30363b]" />}
      </motion.span>
      <span
        aria-hidden="true"
        className="absolute inset-[3px] z-0 rounded-full transition-colors duration-300"
        style={{ backgroundColor: isLight ? "var(--sh-red)" : "#454b51" }}
      />
    </button>
  );
}
