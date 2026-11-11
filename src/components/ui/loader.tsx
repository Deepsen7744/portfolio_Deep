"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { ease } from "@/lib/utils";

/**
 * Short bouncy intro, shown once per browser session.
 * Skipped on repeat visits and when the user prefers reduced motion
 * (an inline script in <head> hides it before paint in those cases).
 */
export function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          aria-hidden
          data-loader
          className="bg-grid fixed inset-0 z-[100] grid place-items-center bg-bg"
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex flex-col items-center gap-7">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: -6, y: [0, -26, 0], scaleY: [1, 1.08, 0.9, 1] }}
              transition={{
                scale: { type: "spring", stiffness: 300, damping: 12 },
                rotate: { type: "spring", stiffness: 300, damping: 12 },
                y: { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
                scaleY: { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
              }}
              className="toon grid size-20 place-items-center rounded-3xl bg-yellow font-display text-2xl font-bold text-ink"
            >
              {site.shortName}
            </motion.div>
            <div className="toon-sm h-4 w-44 overflow-hidden rounded-full bg-bg-elev">
              <motion.div
                className="h-full rounded-full bg-pink"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 1.2, ease }}
              />
            </div>
            <p className="eyebrow">Warming up…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
