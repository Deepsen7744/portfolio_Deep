"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn, ease } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "./logo";

const ids = navItems.map((n) => n.id);

export function Navbar({ resumeHref }: { resumeHref: string | null }) {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Mobile menu: lock scroll, close on Escape, keep focus inside, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a, button");
        const a = f[0];
        const b = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const btn = menuBtn.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 sm:pl-5",
            scrolled ? "glass bg-bg-elev" : "border-[2.5px] border-transparent",
          )}
        >
          <a href="#home" aria-label={`${site.name} — back to top`} className="rounded-full">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 font-display text-[14px] font-semibold transition-colors",
                      isActive ? "text-ink" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border-2 border-ink bg-yellow shadow-[2px_2px_0_var(--ink)]"
                        transition={{ type: "spring", stiffness: 420, damping: 26 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {resumeHref && (
              <a
                href={resumeHref}
                download={site.resume.downloadName}
                className="toon-sm toon-press hidden h-10 items-center gap-2 rounded-full bg-pink px-4 font-display text-[14px] font-semibold text-ink sm:inline-flex"
              >
                Resume <ArrowDownToLine size={14} />
              </a>
            )}
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="toon-sm toon-press grid size-10 place-items-center rounded-full bg-bg-elev text-fg md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {/* Scroll progress hairline */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress, originX: 0 }}
          className={cn(
            "mx-auto mt-1.5 h-[4px] max-w-[calc(72rem-3rem)] rounded-full bg-gradient-to-r from-yellow via-pink to-blue transition-opacity",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-grid fixed inset-0 z-40 flex flex-col bg-bg px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.5, ease }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 border-b-2 border-dashed border-ink/25 py-4 font-display text-3xl font-semibold",
                      active === item.id ? "text-fg" : "text-muted",
                    )}
                  >
                    <span className="font-display text-sm font-bold text-pink">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            {resumeHref && (
              <a
                href={resumeHref}
                download={site.resume.downloadName}
                onClick={() => setOpen(false)}
                className="toon-sm toon-press mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-yellow font-display font-semibold text-ink"
              >
                Download Resume <ArrowDownToLine size={16} />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
