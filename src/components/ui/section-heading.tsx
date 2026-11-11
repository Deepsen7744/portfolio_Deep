import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="eyebrow mb-5 flex items-center gap-3">
      <span className="toon-sm -rotate-3 rounded-full bg-yellow px-2.5 py-0.5 text-xs tracking-normal text-ink">{index}</span>
      <span>{label}</span>
    </div>
  );
}

export function SectionHeading({ index, eyebrow, title, description, className, id }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-14 md:mb-20", className)}>
      <SectionEyebrow index={index} label={eyebrow} />
      <h2 id={id} className="max-w-3xl text-balance text-[2.2rem] leading-[1.08] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  );
}
