import { showUnverified, site } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { VerifyFlag } from "@/components/ui/verify-flag";

export function Achievements() {
  const items = site.achievements.filter((a) => a.verified || showUnverified);
  const looks = [
    "bg-yellow -rotate-2",
    "bg-pink rotate-1",
    "bg-mint -rotate-1",
    "bg-sky rotate-2",
  ];

  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="achievements-title"
          index="05"
          eyebrow="Recognition"
          title={
            <>
              Milestones <span className="text-gradient">along the way.</span>
            </>
          }
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((a, i) => (
            <li key={a.label}>
              <Reveal delay={i * 0.07} className="h-full">
                <div className={`toon toon-press h-full rounded-3xl p-7 text-ink hover:rotate-0 md:p-8 ${looks[i % looks.length]}`}>
                <p className="font-display text-5xl font-bold md:text-6xl">{a.value}</p>
                <p className="mt-8 font-display text-lg font-semibold">{a.label}</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-ink/75">{a.detail}</p>
                {!a.verified && <VerifyFlag className="mt-4 bg-bg-elev" />}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
