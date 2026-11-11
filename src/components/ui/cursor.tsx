"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cartoon cursor buddy for fine pointers only: an inked ring that puffs up
 * into a yellow bubble over interactive elements. The native cursor stays.
 * Disabled under prefers-reduced-motion and on touch devices.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setHovering(Boolean(t?.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor]")));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute left-0 top-0 rounded-full border-[2.5px] border-ink"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 44 : 22,
          height: hovering ? 44 : 22,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "color-mix(in oklab, var(--yellow) 55%, transparent)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
      />
    </div>
  );
}
