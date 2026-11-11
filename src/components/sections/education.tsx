import { site } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative pb-24 md:pb-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[30%_1fr]">
          <Reveal>
            <SectionEyebrow index="06" label="Education" />
            <h2 id="education-title" className="text-3xl md:text-4xl">
              Academic foundation.
            </h2>
          </Reveal>

          <ol className="space-y-5">
            {site.education.map((e, i) => (
              <li key={e.degree}>
                <Reveal delay={i * 0.08} className="toon toon-press group grid gap-2 rounded-3xl bg-bg-elev px-6 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 md:px-8">
                  <div>
                    <h3 className="text-2xl transition-colors group-hover:text-pink md:text-3xl">
                      {e.degree}
                      {e.institution && <span className="text-muted"> — {e.institution}</span>}
                    </h3>
                    {e.field && <p className="mt-1.5 text-muted">{e.field}</p>}
                  </div>
                  <p className="toon-sm w-fit rotate-2 rounded-full bg-yellow px-3 py-1 font-display text-sm font-semibold text-ink">{e.period}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
