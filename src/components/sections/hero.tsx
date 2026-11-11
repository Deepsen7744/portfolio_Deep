"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownToLine, ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useRef } from "react";
import { site } from "@/config/site";
import { ease, mailto } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { HeroVisual } from "@/components/hero/hero-visual";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

/** Headline revealed word-by-word from behind a mask. Last two words get the gradient. */
function Headline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="text-balance text-[2.7rem] font-semibold leading-[1.02] min-[400px]:text-5xl sm:text-6xl lg:text-[4.4rem] xl:text-[5rem]">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden px-[0.04em] pb-[0.16em] align-top">
            <motion.span
              className={`inline-block ${i >= words.length - 2 ? "text-gradient" : ""}`}
              initial={{ y: "115%", rotate: 8 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ type: "spring", stiffness: 170, damping: 15, delay: 0.25 + i * 0.07 }}
            >
              {w}
              {i < words.length - 1 && " "}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}

export function Hero({ resumeHref }: { resumeHref: string | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const socials = [
    site.socials.github && { href: site.socials.github, label: "GitHub", icon: FaGithub },
    site.socials.linkedin && { href: site.socials.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
    site.socials.email && { href: mailto(site.socials.email), label: "Email", icon: Mail },
  ].filter(Boolean) as { href: string; label: string; icon: React.ComponentType<{ size?: number }> }[];

  return (
    <section ref={ref} id="home" aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-x-clip pb-20 pt-32 lg:pt-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-8">
        <motion.div style={{ y: yText, opacity: fade }}>
          {site.availability.open && (
            <motion.div {...fadeUp(0.1)} className="toon-sm mb-8 inline-flex -rotate-2 items-center gap-2.5 rounded-full bg-mint py-1.5 pl-3 pr-4 font-display text-[13px] font-semibold text-ink">
              <span className="relative flex size-2">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-600" />
                <span className="relative size-2 rounded-full bg-emerald-600" />
              </span>
              {site.availability.label}
            </motion.div>
          )}

          <motion.p {...fadeUp(0.15)} className="eyebrow mb-5">
            {site.hero.eyebrow}
          </motion.p>

          <Headline text={site.hero.headline} />

          <motion.ul {...fadeUp(0.85)} className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[15px] font-semibold text-fg" aria-label="Roles">
            {site.titles.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                {i > 0 && <span className="size-2 rounded-full border-2 border-ink bg-pink" aria-hidden />}
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.p {...fadeUp(0.95)} className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {site.hero.intro}
          </motion.p>

          <motion.div {...fadeUp(1.05)} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" magnetic>
              View My Work <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            {resumeHref && (
              <ButtonLink href={resumeHref} download={site.resume.downloadName} variant="secondary" magnetic>
                Download Resume <ArrowDownToLine size={16} />
              </ButtonLink>
            )}
            {socials.length > 0 && (
              <div className="flex items-center gap-2 sm:ml-2">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="toon-sm toon-press grid size-12 place-items-center rounded-full bg-bg-elev text-fg hover:bg-sky hover:text-ink"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yVisual }} className="relative px-2 sm:px-10 lg:px-0">
          <HeroVisual />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 hidden justify-center md:flex">
      <motion.a
        href="#about"
        {...fadeUp(1.6)}
        className="eyebrow flex flex-col items-center gap-3"
        aria-label="Scroll to About"
      >
        Scroll
        <span className="relative h-11 w-6 overflow-hidden rounded-full border-[2.5px] border-ink bg-bg-elev">
          <motion.span
            className="absolute left-[6px] top-1 h-2 w-1.5 rounded-full bg-pink"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
      </div>
    </section>
  );
}
