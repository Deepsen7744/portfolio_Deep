import { site } from "@/config/site";

export function Logo() {
  const [first, ...rest] = site.name.toUpperCase().split(" ");
  return (
    <span className="group inline-flex items-center gap-2.5">
      <span className="toon-sm grid size-9 -rotate-6 place-items-center rounded-xl bg-yellow font-display text-sm font-bold text-ink transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-6 group-hover:scale-110">
        {site.shortName}
      </span>
      <span className="font-display text-[15px] font-bold tracking-[0.12em]">
        {first}
        <span className="text-pink"> {rest.join(" ")}</span>
      </span>
    </span>
  );
}
