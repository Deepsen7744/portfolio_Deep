import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-display text-[15px] font-semibold tracking-wide disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "toon-sm toon-press h-12 px-6 bg-yellow text-ink",
  secondary: "toon-sm toon-press h-12 px-6 bg-bg-elev text-fg",
  ghost: "h-10 px-4 text-muted transition-colors hover:text-fg",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  magnetic?: boolean;
};

/** Link styled as a cartoon sticker button, optionally magnetic. */
export function ButtonLink({ variant = "primary", magnetic = false, className, children, ...rest }: AnchorProps) {
  const el = (
    <a className={buttonClass(variant, className)} {...rest}>
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
