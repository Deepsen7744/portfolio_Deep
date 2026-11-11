"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/config/site";
import { cn, ease } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icon";

const all = Array.from(new Set(site.skills.flatMap((g) => g.skills)));
const tileColors = ["bg-yellow", "bg-pink", "bg-mint", "bg-sky", "bg-orange", "bg-violet"];

export function Skills() {
  const [activeId, setActiveId] = useState<string>(site.skills[0].id);
  const active = site.skills.find((g) => g.id === activeId) ?? site.skills[0];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const n = site.skills.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActiveId(site.skills[next].id);
    document.getElementById(`skill-tab-${site.skills[next].id}`)?.focus();
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow="Skills"
          title={
            <>
              A toolkit for the <span className="text-gradient">whole stack.</span>
            </>
          }
          description="From model to interface: the languages, frameworks and infrastructure I reach for."
        />

        <Reveal>
          <div className="toon grid overflow-hidden rounded-[2rem] bg-bg-elev lg:grid-cols-[320px_1fr]">
            {/* category tabs */}
            <div
              role="tablist"
              aria-label="Skill categories"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto border-b-[3px] border-ink bg-surface-strong p-3 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r-[3px] lg:p-4"
            >
              {site.skills.map((g, i) => {
                const on = g.id === activeId;
                return (
                  <button
                    key={g.id}
                    id={`skill-tab-${g.id}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="skill-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActiveId(g.id)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      "relative shrink-0 rounded-2xl px-4 py-3 text-left transition-colors lg:px-5 lg:py-4",
                      on ? "text-ink" : "text-muted hover:text-fg",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="skill-tab"
                        className="absolute inset-0 rounded-2xl border-[2.5px] border-ink bg-yellow shadow-[3px_3px_0_var(--ink)]"
                        transition={{ type: "spring", stiffness: 420, damping: 26 }}
                      />
                    )}
                    <span className="relative flex items-center justify-between gap-6">
                      <span>
                        <span className="block whitespace-nowrap font-display text-[16px] font-semibold">{g.label}</span>
                        <span className={cn("mt-0.5 hidden text-xs font-semibold lg:block", on ? "text-ink/70" : "text-subtle")}>{g.blurb}</span>
                      </span>
                      <span className={cn("hidden font-display text-sm font-bold lg:inline", on ? "text-ink/70" : "text-subtle")}>{String(g.skills.length).padStart(2, "0")}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* panel */}
            <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active.id}`} className="relative min-h-[340px] p-5 sm:p-8">
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease }}
                  className="relative"
                >
                  <p className="mb-6 text-sm text-muted lg:hidden">{active.blurb}</p>
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                    {active.skills.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 16 }}
                        className="group toon-sm toon-press relative flex aspect-[5/4] flex-col justify-between rounded-2xl bg-bg-elev p-4 hover:-rotate-2"
                      >
                        <span className={cn("grid size-11 place-items-center rounded-xl border-[2.5px] border-ink text-ink transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-12 group-hover:scale-110", tileColors[i % tileColors.length])}>
                          <TechIcon name={s} size={20} />
                        </span>
                        <span className="relative font-display text-[15px] font-semibold">{s}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* full-stack marquee */}
        <div className="group mt-16 -rotate-1 overflow-hidden border-y-[3px] border-ink bg-yellow shadow-[0_5px_0_var(--ink)]" aria-hidden>
          <div className="animate-marquee flex w-max gap-10 py-3">
            {[...all, ...all].map((s, i) => (
              <span key={i} className="flex items-center gap-2.5 whitespace-nowrap font-display text-base font-semibold text-ink">
                <TechIcon name={s} size={15} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
