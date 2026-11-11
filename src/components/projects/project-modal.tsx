"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { site, type Project } from "@/config/site";
import { buttonClass } from "@/components/ui/button";
import { TechIcon } from "@/components/ui/tech-icon";
import { ProjectVisual } from "./mockups";

/** Group a project's stack under the skill categories from config (falls back to "Other"). */
function groupStack(stack: readonly string[]) {
  const norm = (s: string) => s.toLowerCase().replace(/\.js$|\s*apis?$/, "");
  const groups = new Map<string, string[]>();
  for (const tech of stack) {
    const g = site.skills.find((grp) => grp.skills.some((s) => norm(s) === norm(tech)));
    const key = g?.label ?? "Other";
    groups.set(key, [...(groups.get(key) ?? []), tech]);
  }
  return [...groups.entries()];
}

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialog.current) return;
      const f = dialog.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1a1630]/55 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border-[3px] border-ink bg-bg-elev shadow-[10px_10px_0_var(--ink)] outline-none sm:rounded-[2rem]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="toon-sm absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full bg-pink text-ink transition-transform duration-300 hover:rotate-90"
            >
              <X size={18} />
            </button>

            <div className="p-4">
              <ProjectVisual project={project} className="shadow-[5px_5px_0_var(--ink)]" />
            </div>

            <div className="px-6 pb-8 pt-4 sm:px-10 sm:pb-10">
              <p className="eyebrow">{project.tagline}</p>
              <h3 id="project-modal-title" className="mt-3 text-3xl sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>

              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-8">
                  <p className="eyebrow mb-4">Highlights</p>
                  <ul className="space-y-2.5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                        <span aria-hidden className="mt-[0.5em] size-2.5 shrink-0 rounded-full border-2 border-ink bg-yellow" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <p className="eyebrow mb-4">Built with</p>
                <dl className="divide-y-2 divide-dashed divide-ink/20 rounded-2xl border-[2.5px] border-ink">
                  {groupStack(project.stack).map(([group, items]) => (
                    <div key={group} className="grid gap-2 px-4 py-3 sm:grid-cols-[140px_1fr] sm:items-center">
                      <dt className="font-display text-sm font-semibold text-pink">{group}</dt>
                      <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {items.map((t) => (
                          <span key={t} className="inline-flex items-center gap-1.5 text-sm font-bold">
                            <TechIcon name={t} size={14} className="text-muted" />
                            {t}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {(project.github || project.demo) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                      Live demo <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
                      <FaGithub size={16} /> Source code
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
