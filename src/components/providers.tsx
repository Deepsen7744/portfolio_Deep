"use client";

import { MotionConfig } from "framer-motion";

/** Framer Motion honours the user's OS-level reduced-motion preference everywhere. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
