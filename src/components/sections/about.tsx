import { GraduationCap } from "lucide-react";
import { site } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/** Every stat here is derived from config data — nothing is invented. */
const stats = [
  { value: String(site.experience.length), label: "Industry roles", bg: "bg-yellow", r: "-rotate-2" },
  { value: String(site.projects.length), label: "Featured builds", bg: "bg-pink", r: "rotate-1" },
  { value: "MCA", label: "NIT Jamshedpur ’25", bg: "bg-mint", r: "-rotate-1" },
];

const chipColors = ["bg-yellow", "bg-sky", "bg-pink", "bg-mint", "bg-orange", "bg-violet"];

export function About() {
  const [lead, ...rest] = site.about.paragraphs;
  const mca = site.education[0];

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading id="about-title" index="01" eyebrow="About" title={site.about.heading} />

        <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-pretty font-display text-2xl font-medium leading-snug text-fg md:text-[1.9rem] md:leading-[1.3]">
                {lead}
              </p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)}>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <dl className="mt-14 grid grid-cols-3 gap-3 sm:gap-5">
                {stats.map((s) => (
                  <div key={s.label} className={`toon toon-press rounded-2xl px-3 py-5 text-ink sm:px-5 ${s.bg} ${s.r} hover:rotate-0`}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-bold md:text-5xl">{s.value}</span>
                      <span className="mt-1.5 block text-xs font-bold text-ink/75 md:text-sm">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="space-y-10">
            <Reveal delay={0.1}>
              <div className="toon toon-press group relative overflow-hidden rounded-3xl bg-bg-elev p-6">
                <div className="relative flex items-start gap-4">
                  <span className="toon-sm grid size-12 shrink-0 -rotate-6 place-items-center rounded-2xl bg-sky text-ink transition-transform duration-500 group-hover:rotate-6">
                    <GraduationCap size={20} />
                  </span>
                  <div>
                    <p className="eyebrow">Education</p>
                    <p className="mt-2 font-display text-xl font-semibold">
                      {mca.degree}, {mca.institution}
                    </p>
                    <p className="text-sm text-muted">
                      {mca.field} · {mca.period}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="eyebrow mb-4">Background</p>
              <ul className="space-y-3">
                {site.about.background.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                    <span className="mt-1.5 size-3 shrink-0 rounded-full border-2 border-ink bg-pink" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="eyebrow mb-4">Currently exploring</p>
              <ul className="flex flex-wrap gap-2">
                {site.about.interests.map((t, i) => (
                  <li
                    key={t}
                    className={`toon-sm toon-press cursor-default rounded-full px-3.5 py-1.5 font-display text-sm font-semibold text-ink ${chipColors[i % chipColors.length]}`}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
