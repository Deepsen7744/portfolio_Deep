"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useCallback, useState } from "react";
import { site, type Project } from "@/config/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-icon";
import { ProjectVisual } from "@/components/projects/mockups";
import { ProjectModal } from "@/components/projects/project-modal";

function TiltVisual({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -7);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={onMove}
      onPointerLeave={reset}
      aria-label={`Open details for ${project.title}`}
      className="group/visual block w-full rounded-[1.75rem] text-left [perspective:1400px]"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative transition-shadow duration-500">
        <ProjectVisual project={project} className="transition-[box-shadow,transform] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover/visual:-translate-y-1 group-hover/visual:shadow-[12px_14px_0_var(--ink)]" />
        <span className="toon-sm absolute bottom-5 right-5 flex translate-y-2 -rotate-3 items-center gap-2 rounded-full bg-yellow px-3.5 py-2 font-display text-sm font-semibold text-ink opacity-0 transition-all duration-300 group-hover/visual:translate-y-0 group-hover/visual:opacity-100 group-focus-visible/visual:translate-y-0 group-focus-visible/visual:opacity-100">
          <Maximize2 size={13} /> View details
        </span>
      </motion.div>
    </button>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          index="04"
          eyebrow="Selected Work"
          title={
            <>
              Products with <span className="text-gradient">intelligence</span> built in.
            </>
          }
          description="A few things I've designed and engineered — from AI assistants to decentralized systems."
        />

        <ol className="space-y-28 md:space-y-40">
          {site.projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={p.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className={cn("lg:col-span-7", flip && "lg:order-2")}>
                  <TiltVisual project={p} onOpen={() => setOpen(p)} />
                </Reveal>

                <Reveal delay={0.1} className={cn("lg:col-span-5", flip && "lg:order-1")}>
                  <div className="flex items-baseline gap-4">
                    <span className="toon-sm -rotate-3 rounded-full bg-pink px-2.5 py-0.5 font-display text-sm font-bold text-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-[3px] flex-1 rounded-full bg-ink/15" aria-hidden />
                    <span className="eyebrow">{p.tagline}</span>
                  </div>
                  <h3 className="mt-6 text-balance text-3xl leading-[1.08] sm:text-4xl md:text-5xl">{p.title}</h3>
                  <p className="mt-5 text-pretty text-base leading-relaxed text-muted md:text-lg">{p.description}</p>
                  <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {p.stack.map((t) => (
                      <li key={t}>
                        <TechBadge name={t} />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(p)}
                      className="toon-sm toon-press group inline-flex h-11 items-center gap-2 rounded-full bg-bg-elev px-5 font-display text-[15px] font-semibold text-fg"
                    >
                      Project details
                      <Maximize2 size={14} />
                    </button>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="toon-sm toon-press inline-flex h-11 items-center gap-2 rounded-full bg-sky px-5 font-display text-[15px] font-semibold text-ink">
                        <FaGithub size={15} /> GitHub
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="toon-sm toon-press inline-flex h-11 items-center gap-2 rounded-full bg-yellow px-5 font-display text-[15px] font-semibold text-ink">
                        Live demo <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      <ProjectModal project={open} onClose={close} />
    </section>
  );
}
