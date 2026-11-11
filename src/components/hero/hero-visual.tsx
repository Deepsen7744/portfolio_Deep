"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Database, MessageSquareText, ScanSearch, Sparkles } from "lucide-react";
import { TechIcon } from "@/components/ui/tech-icon";
import { cn, ease } from "@/lib/utils";

/* Tokens for a tiny syntax-highlighted snippet. k=keyword f=function s=string c=comment p=plain */
type Tok = [kind: "k" | "f" | "s" | "c" | "p", text: string];
const code: Tok[][] = [
  [["c", "// retrieval-augmented answer"]],
  [["k", "const "], ["p", "docs = "], ["k", "await "], ["p", "store."], ["f", "similaritySearch"], ["p", "(query, "], ["s", "4"], ["p", ");"]],
  [["k", "const "], ["p", "context = docs."], ["f", "map"], ["p", "(d => d.pageContent);"]],
  [["k", "const "], ["p", "answer = "], ["k", "await "], ["p", "llm."], ["f", "invoke"], ["p", "("]],
  [["p", "  prompt."], ["f", "format"], ["p", "({ context, query })"]],
  [["p", ");"]],
];
const tokColor: Record<Tok[0], string> = {
  k: "text-violet",
  f: "text-blue",
  s: "text-cyan",
  c: "text-subtle",
  p: "text-fg",
};

const steps = [
  { label: "Query", icon: MessageSquareText },
  { label: "Embed", icon: ScanSearch },
  { label: "Retrieve", icon: Database },
  { label: "Generate", icon: Sparkles },
];

const chips = [
  { name: "OpenAI", x: "-6%", y: "8%", depth: 38, delay: 0, mobile: true, bg: "bg-mint", r: -8 },
  { name: "LangChain", x: "68%", y: "0%", depth: 52, delay: 0.6, mobile: true, bg: "bg-pink", r: 6 },
  { name: "Node.js", x: "86%", y: "44%", depth: 30, delay: 1.2, mobile: false, bg: "bg-yellow", r: 8 },
  { name: "PostgreSQL", x: "-3%", y: "66%", depth: 46, delay: 0.3, mobile: false, bg: "bg-sky", r: -5 },
  { name: "AWS", x: "70%", y: "90%", depth: 26, delay: 0.9, mobile: true, bg: "bg-orange", r: -7 },
  { name: "React", x: "4%", y: "90%", depth: 34, delay: 1.5, mobile: true, bg: "bg-yellow", r: 5 },
];

function useParallax(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  return {
    x: useTransform(mx, (v) => v * depth),
    y: useTransform(my, (v) => v * depth),
  };
}

function Chip({ name, x, y, depth, delay, mobile, bg, r, mx, my }: (typeof chips)[number] & { mx: MotionValue<number>; my: MotionValue<number> }) {
  const p = useParallax(mx, my, depth);
  return (
    <motion.div className={cn("absolute z-20", !mobile && "hidden sm:block")} style={{ left: x, top: y, ...p }}>
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: r * 3 }}
        animate={{ opacity: 1, scale: 1, rotate: r, y: [0, -10, 0] }}
        transition={{
          opacity: { delay: 1.4 + delay * 0.3, duration: 0.6 },
          scale: { delay: 1.4 + delay * 0.3, type: "spring", stiffness: 260, damping: 12 },
          rotate: { delay: 1.4 + delay * 0.3, type: "spring", stiffness: 260, damping: 12 },
          y: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay },
        }}
        className={cn("toon-sm flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-[13px] font-semibold text-ink", bg)}
      >
        <TechIcon name={name} size={13} />
        {name}
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 1600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const panel = useParallax(mx, my, -14);
  const orb = useParallax(mx, my, 24);
  const rotX = useTransform(my, (v) => v * -8);
  const rotY = useTransform(mx, (v) => v * 10);

  let lineDelay = 1.1;

  return (
    <div ref={ref} className="relative mx-auto aspect-[1/1] w-full max-w-[560px] [perspective:1200px]" aria-hidden>
      {/* glow orb */}
      <motion.div style={orb} className="absolute inset-[14%]">
        <div className="absolute inset-0 rounded-full border-[3px] border-ink bg-yellow shadow-[8px_8px_0_var(--ink)]" />
        <div className="absolute -right-[4%] top-[6%] size-[22%] rounded-full border-[3px] border-ink bg-pink" />
        <div className="absolute bottom-[4%] left-[2%] size-[14%] rounded-full border-[3px] border-ink bg-mint" />
      </motion.div>

      {/* orbit rings */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-ink">
        <defs>
          <linearGradient id="ring" x1="0" x2="1">
            <stop offset="0" stopColor="var(--blue)" stopOpacity="0.8" />
            <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="origin-center animate-[spin_40s_linear_infinite]">
          <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 10" strokeLinecap="round" />
          <circle cx="390" cy="200" r="7" fill="var(--sky)" stroke="currentColor" strokeWidth="2.5" />
        </g>
        <g className="origin-center animate-[spin_28s_linear_infinite_reverse]">
          <circle cx="50" cy="200" r="6" fill="var(--orange)" stroke="currentColor" strokeWidth="2.5" />
        </g>
      </svg>

      {/* main console */}
      <div className="absolute inset-0 z-10 grid place-items-center">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.5 }}
        style={{ ...panel, rotateX: rotX, rotateY: rotY }}
        className="w-[94%] sm:w-[86%] [transform-style:preserve-3d]"
      >
        <div className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-bg-elev shadow-[8px_8px_0_var(--ink)]">
          {/* chrome */}
          <div className="flex items-center justify-between border-b-[3px] border-ink bg-surface-strong px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full border-2 border-ink bg-pink" />
              <span className="size-3 rounded-full border-2 border-ink bg-yellow" />
              <span className="size-3 rounded-full border-2 border-ink bg-mint" />
            </div>
            <span className="font-display text-[13px] font-semibold text-fg">rag_pipeline.ts</span>
            <span className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-ink">
              <span className="relative flex size-1.5">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-700" />
                <span className="relative size-1.5 rounded-full bg-emerald-700" />
              </span>
              live
            </span>
          </div>

          {/* code */}
          <div className="overflow-hidden px-4 py-4 font-mono text-[9px] leading-[1.8] min-[400px]:text-[10px] sm:text-[12px]">
            {code.map((line, i) => {
              const len = line.reduce((n, [, t]) => n + t.length, 0);
              const dur = Math.max(0.25, len * 0.018);
              const delay = lineDelay;
              lineDelay += dur + 0.08;
              return (
                <div key={i} className="flex">
                  <span className="mr-4 w-4 shrink-0 select-none text-right text-subtle/70">{i + 1}</span>
                  <motion.span
                    className="whitespace-pre"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: dur, delay, ease: "linear" }}
                  >
                    {line.map(([k, t], j) => (
                      <span key={j} className={tokColor[k]}>
                        {t}
                      </span>
                    ))}
                  </motion.span>
                  {i === code.length - 1 && <span className="animate-blink ml-0.5 inline-block w-[8px] rounded-sm bg-pink" />}
                </div>
              );
            })}
          </div>

          {/* pipeline */}
          <div className="border-t-[3px] border-dashed border-ink/25 px-4 py-4">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-x-5 top-[18px] h-[4px] rounded-full bg-ink/15">
                <motion.div
                  className="h-full origin-left rounded-full bg-pink"
                  animate={{ scaleX: step / (steps.length - 1) }}
                  transition={{ duration: 0.6, ease }}
                />
              </div>
              {steps.map((s, i) => {
                const on = i <= step;
                const Icon = s.icon;
                return (
                  <div key={s.label} className="relative z-10 flex flex-col items-center gap-1.5">
                    <motion.div
                      animate={{ scale: i === step ? 1.15 : 1, rotate: i === step ? -6 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 14 }}
                      className={cn(
                        "grid size-10 place-items-center rounded-xl border-[2.5px] transition-colors duration-300",
                        on ? "border-ink bg-yellow text-ink shadow-[2px_2px_0_var(--ink)]" : "border-ink/30 bg-bg-elev text-subtle",
                      )}
                    >
                      <Icon size={16} />
                    </motion.div>
                    <span className={cn("font-display text-[11px] font-semibold transition-colors", on ? "text-fg" : "text-subtle")}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
      </div>

      {chips.map((c) => (
        <Chip key={c.name} {...c} mx={mx} my={my} />
      ))}
    </div>
  );
}
