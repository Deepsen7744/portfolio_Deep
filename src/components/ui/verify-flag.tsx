/**
 * Dev-only marker for content still flagged `verified: false` in site config.
 * Renders nothing in production (where the unverified content is hidden anyway).
 */
export function VerifyFlag({ className = "" }: { className?: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span
      title="Marked verified: false in src/config/site.ts — confirm before publishing. Hidden in production."
      className={`inline-flex items-center gap-1 rounded-full border-2 border-dashed border-amber-600 bg-bg-elev px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 ${className}`}
    >
      verify
    </span>
  );
}
