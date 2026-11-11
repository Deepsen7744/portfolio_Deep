import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { navItems, site } from "@/config/site";
import { mailto } from "@/lib/utils";
import { Year } from "@/components/ui/year";
import { Logo } from "./logo";

export function Footer() {
  const socials = [
    site.socials.github && { href: site.socials.github, label: "GitHub", icon: FaGithub },
    site.socials.linkedin && { href: site.socials.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
    site.socials.email && { href: mailto(site.socials.email), label: "Email", icon: Mail },
  ].filter(Boolean) as { href: string; label: string; icon: React.ComponentType<{ size?: number }> }[];

  return (
    <footer className="relative overflow-hidden border-t-[3px] border-ink bg-surface-strong">
      <div className="container-x py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-pretty text-[15px] font-semibold leading-relaxed text-muted">
              {site.name} — {site.tagline.charAt(0).toLowerCase() + site.tagline.slice(1)}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-14 gap-y-3 sm:grid-cols-3">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="font-display text-[15px] font-semibold text-muted transition-colors hover:text-pink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* oversized wordmark */}
        <p
          aria-hidden
          className="text-gradient pointer-events-none mt-14 select-none whitespace-nowrap pb-4 text-center font-display text-[17vw] font-bold leading-[0.9] md:text-[12rem]"
        >
          {site.name.toUpperCase()}
        </p>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-6 border-t-2 border-dashed border-ink/25 pt-8 sm:flex-row">
          <p className="text-sm font-semibold text-muted">
            © <Year /> {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="toon-sm toon-press grid size-10 place-items-center rounded-full bg-bg-elev text-fg"
              >
                <Icon size={15} />
              </a>
            ))}
            <a
              href="#home"
              className="toon-sm toon-press group ml-2 inline-flex h-10 items-center gap-2 rounded-full bg-yellow px-4 font-display text-sm font-semibold text-ink"
            >
              Back to top <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
