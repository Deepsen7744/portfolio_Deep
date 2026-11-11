/**
 * Cartoon backdrop: halftone dots + a few floating doodles at the page edges.
 * Pure CSS/SVG, GPU-cheap. Doodles only appear on wide screens so they never sit behind text.
 */

const ink = "var(--ink)";

function Star({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <path
        d="M24 3l5.6 12.4L43 17l-10 9.3L35.8 40 24 33.2 12.2 40 15 26.3 5 17l13.4-1.6z"
        fill={fill}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Squiggle({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 80 30" className="h-full w-full" fill="none" strokeLinecap="round">
      <path d="M4 18c8-14 16-14 24 0s16 14 24 0 16-14 24 0" stroke={ink} strokeWidth="9" />
      <path d="M4 18c8-14 16-14 24 0s16 14 24 0 16-14 24 0" stroke={stroke} strokeWidth="5" />
    </svg>
  );
}

function Blob({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full">
      <path
        d="M30 4c12 0 25 8 25 22S44 56 29 56 5 45 5 30 18 4 30 4z"
        fill={fill}
        stroke={ink}
        strokeWidth="3"
      />
      <circle cx="22" cy="24" r="3" fill={ink} />
      <circle cx="38" cy="24" r="3" fill={ink} />
      <path d="M22 36c4 4 12 4 16 0" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Plus({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <path d="M15 4h10v11h11v10H25v11H15V25H4V15h11z" fill={fill} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

const doodles = [
  { el: <Star fill="var(--yellow)" />, cls: "left-[2.5%] top-[14%] size-12", r: "-12deg", d: "0s" },
  { el: <Squiggle stroke="var(--pink)" />, cls: "right-[2%] top-[22%] h-8 w-20", r: "8deg", d: "-2s" },
  { el: <Blob fill="var(--mint)" />, cls: "left-[1.5%] top-[58%] size-14", r: "6deg", d: "-4s" },
  { el: <Plus fill="var(--sky)" />, cls: "right-[3%] top-[66%] size-9", r: "14deg", d: "-1s" },
  { el: <Star fill="var(--pink)" />, cls: "right-[4%] top-[86%] size-8", r: "18deg", d: "-3s" },
  { el: <Plus fill="var(--yellow)" />, cls: "left-[4%] top-[88%] size-7", r: "-8deg", d: "-5s" },
];

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_30%,#000_40%,transparent_85%)]" />
      <div className="hidden xl:block">
        {doodles.map((d, i) => (
          <div
            key={i}
            className={`animate-bob absolute ${d.cls}`}
            style={{ ["--r" as string]: d.r, animationDelay: d.d }}
          >
            {d.el}
          </div>
        ))}
      </div>
    </div>
  );
}
