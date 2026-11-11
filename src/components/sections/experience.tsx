"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { showUnverified, site } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-icon";
import { VerifyFlag } from "@/components/ui/verify-flag";

export function Experience() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title={
            <>
              Where I&rsquo;ve <span className="text-gradient">shipped.</span>
            </>
          }
          description="From enterprise identity systems to LLM-powered products — a timeline of the teams I've built with."
        />

        <ol ref={list} className="relative">
          {/* rail */}
          <div aria-hidden className="absolute bottom-0 left-[8.5px] top-2 w-[3px] rounded-full bg-ink/15 md:left-[calc(30%+8.5px)]">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded-full bg-gradient-to-b from-pink via-yellow to-blue" />
          </div>

          {site.experience.map((job, i) => (
            <li key={job.company} className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-[30%_1fr] md:gap-0 md:pl-0">
              {/* meta column */}
              <Reveal className="md:pr-12 md:text-right">
                <p className="toon-sm inline-block -rotate-2 rounded-full bg-mint px-3 py-1 font-display text-[13px] font-semibold text-ink">
                  {job.start} — {job.end}
                </p>
                {!job.verified && showUnverified && <VerifyFlag className="mt-2 md:ml-2" />}
                <p className="mt-3 hidden font-display text-sm font-bold text-subtle md:block">0{site.experience.length - i}</p>
              </Reveal>

              {/* node */}
              <span aria-hidden className="absolute left-0 top-1.5 size-5 rounded-full border-[3px] border-ink bg-yellow md:left-[30%]" />

              {/* body */}
              <Reveal delay={0.08} className="md:pl-12">
                <div className="toon rounded-3xl bg-bg-elev p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl">{job.company}</h3>
                <p className="mt-1 font-display text-base font-semibold text-pink">{job.role}</p>
                <ul className="mt-6 space-y-3">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg/85 md:text-base">
                      <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-full bg-blue" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`Technologies used at ${job.company}`}>
                  {job.tech.map((t) => (
                    <li key={t}>
                      <TechBadge name={t} />
                    </li>
                  ))}
                </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
