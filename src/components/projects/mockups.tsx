import Image from "next/image";
import type { MockupVariant, Project } from "@/config/site";
import { cn } from "@/lib/utils";

/*
 * Illustrative UI mockups, rendered in code (crisp, zero image weight).
 * They are decorative stand-ins until a real screenshot is set via `image` in site config.
 */

const accentVar = { blue: "var(--blue)", violet: "var(--violet)", cyan: "var(--cyan)", pink: "var(--pink)" } as const;
const accentBg = { blue: "var(--sky)", violet: "var(--violet)", cyan: "var(--mint)", pink: "var(--pink)" } as const;

const Line = ({ w, className }: { w: string; className?: string }) => (
  <div className={cn("h-1.5 rounded-full bg-fg/10", className)} style={{ width: w }} />
);

function Meeting() {
  const bars = [8, 14, 22, 12, 28, 18, 34, 20, 10, 26, 30, 16, 24, 12, 20, 32, 14, 22, 8, 18, 26, 12, 30, 16];
  return (
    <div className="grid h-full grid-cols-[1.3fr_1fr] gap-3 p-4">
      <div className="flex flex-col gap-3 rounded-xl border-2 border-ink/80 bg-bg-elev p-3">
        <div className="flex items-end gap-[3px]" style={{ height: 36 }}>
          {bars.map((h, i) => (
            <div key={i} className="w-full rounded-full bg-[var(--a)] opacity-70" style={{ height: h }} />
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-line px-2 py-1.5">
          <span className="size-2 rounded-full border border-fg/30" />
          <span className="font-mono text-[9px] text-subtle">Search transcript…</span>
        </div>
        {[["A", "86%"], ["B", "72%"], ["A", "64%"], ["C", "80%"]].map(([s, w], i) => (
          <div key={i} className="flex gap-2">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-fg/10 font-mono text-[8px] text-muted">{s}</span>
            <div className="flex flex-1 flex-col gap-1.5 pt-1">
              <Line w={w} />
              <Line w="45%" className="bg-fg/[0.06]" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-[color-mix(in_oklab,var(--a)_40%,transparent)] bg-[color-mix(in_oklab,var(--a)_10%,transparent)] p-3">
          <p className="mb-2.5 font-mono text-[9px] uppercase tracking-wider text-[var(--a)]">AI Summary</p>
          <div className="space-y-1.5">
            <Line w="92%" /> <Line w="78%" /> <Line w="85%" />
          </div>
        </div>
        <div className="flex-1 rounded-xl border-2 border-ink/80 bg-bg-elev p-3">
          <p className="mb-2.5 font-mono text-[9px] uppercase tracking-wider text-muted">Action items</p>
          {[70, 58, 64].map((w, i) => (
            <div key={i} className="mb-2 flex items-center gap-2">
              <span className="size-2.5 rounded-[3px] border border-fg/25" />
              <Line w={`${w}%`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Vault() {
  const docs = ["0x8f3a…c21e", "0x1b7d…a90f", "0x44e2…7d3b"];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="grid size-10 place-items-center rounded-lg border border-[color-mix(in_oklab,var(--a)_45%,transparent)] bg-[color-mix(in_oklab,var(--a)_12%,transparent)] font-mono text-[8px] text-[var(--a)]">
              #{1040 + i}
            </div>
            {i < 3 && <div className="h-px w-5 bg-[var(--a)] opacity-50" />}
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2 rounded-xl border-2 border-ink/80 bg-bg-elev p-3">
        {docs.map((h, i) => (
          <div key={h} className="flex items-center gap-3 rounded-lg border border-line px-2.5 py-2">
            <div className="h-6 w-5 rounded-[3px] border border-fg/20 bg-fg/5" />
            <div className="flex-1 space-y-1.5">
              <Line w={["60%", "48%", "54%"][i]} />
              <span className="block font-mono text-[8px] text-subtle">{h}</span>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[8px] text-emerald-500">verified</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Resume() {
  return (
    <div className="grid h-full grid-cols-[1fr_1.1fr] gap-3 p-4">
      <div className="space-y-2 rounded-xl border-2 border-ink/80 bg-bg-elev p-3">
        <div className="mb-3 h-2.5 w-1/2 rounded-full bg-fg/20" />
        {["90%", "70%", "84%", "40%", "76%", "88%", "62%", "80%", "50%"].map((w, i) => (
          <Line key={i} w={w} className={i === 3 || i === 7 ? "bg-[color-mix(in_oklab,var(--a)_55%,transparent)]" : ""} />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-xl border-2 border-ink/80 bg-bg-elev p-3">
          <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-fg/10" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--a)" strokeWidth="3" strokeDasharray="70 100" strokeLinecap="round" />
          </svg>
          <div className="flex-1 space-y-1.5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--a)]">Analysis</p>
            <Line w="80%" />
          </div>
        </div>
        <div className="flex-1 space-y-2.5 rounded-xl border-2 border-ink/80 bg-bg-elev p-3">
          {[80, 55, 68, 40].map((w, i) => (
            <div key={i} className="space-y-1">
              <Line w="35%" className="bg-fg/[0.07]" />
              <div className="h-1.5 rounded-full bg-fg/[0.06]">
                <div className="h-full rounded-full bg-[var(--a)] opacity-70" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Realtime() {
  return (
    <div className="grid h-full grid-cols-[1.4fr_1fr] gap-3 p-4">
      <div className="grid grid-rows-2 gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="relative grid place-items-center overflow-hidden rounded-xl border-2 border-ink/80 bg-bg-elev">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--a)_25%,transparent),transparent_60%)]" />
            <div className="relative grid size-10 place-items-center rounded-full border border-fg/15 bg-fg/10" />
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-bg/70 px-1.5 py-0.5 font-mono text-[8px] text-muted">
              <span className={cn("size-1.5 rounded-full", i === 0 ? "bg-emerald-400" : "bg-fg/30")} />
              {i === 0 ? "speaking" : "muted"}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 rounded-xl border-2 border-ink/80 bg-bg-elev p-3">
        <p className="font-mono text-[9px] uppercase tracking-wider text-muted">Live chat</p>
        {[["l", "70%"], ["r", "60%"], ["l", "80%"], ["r", "50%"]].map(([side, w], i) => (
          <div key={i} className={cn("flex", side === "r" && "justify-end")}>
            <div
              className={cn("rounded-lg px-2 py-1.5", side === "r" ? "bg-[color-mix(in_oklab,var(--a)_22%,transparent)]" : "bg-fg/[0.07]")}
              style={{ width: w }}
            >
              <Line w="100%" />
            </div>
          </div>
        ))}
        <div className="mt-auto rounded-lg border border-line px-2 py-1.5 font-mono text-[8px] text-subtle">Type a doubt…</div>
      </div>
    </div>
  );
}

const variants: Record<MockupVariant, () => React.JSX.Element> = {
  meeting: Meeting,
  vault: Vault,
  resume: Resume,
  realtime: Realtime,
};

export function ProjectVisual({ project, priority = false, className }: { project: Project; priority?: boolean; className?: string }) {
  const Variant = variants[project.mockup];
  return (
    <div
      className={cn("relative aspect-[16/11] w-full overflow-hidden rounded-[1.75rem] border-[3px] border-ink shadow-[8px_8px_0_var(--ink)]", className)}
      style={{ ["--a" as string]: accentVar[project.accent], background: accentBg[project.accent] }}
    >
      {/* ambient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(rgb(26_22_48/0.16)_1.6px,transparent_1.8px)] [background-size:18px_18px]" />

      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={priority}
          className="object-cover"
        />
      ) : (
        /* browser frame */
        <div aria-hidden className="absolute inset-x-[6%] bottom-0 top-[9%] overflow-hidden rounded-t-2xl border-[3px] border-b-0 border-ink bg-bg-elev">
          <div className="flex items-center gap-2 border-b-[3px] border-ink bg-surface-strong px-3 py-2">
            <span className="flex gap-1">
              <span className="size-2 rounded-full border-[1.5px] border-ink bg-pink" />
              <span className="size-2 rounded-full border-[1.5px] border-ink bg-yellow" />
              <span className="size-2 rounded-full border-[1.5px] border-ink bg-mint" />
            </span>
            <span className="mx-auto rounded-full border-[1.5px] border-ink/30 bg-bg-elev px-6 py-0.5 font-display text-[9px] font-semibold text-muted">{project.slug}</span>
          </div>
          <div className="h-[calc(100%-31px)]">
            <Variant />
          </div>
        </div>
      )}
    </div>
  );
}
