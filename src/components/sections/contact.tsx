"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import { site } from "@/config/site";
import { limits, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact-schema";
import { cn, mailto } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { SectionEyebrow } from "@/components/ui/section-heading";

type Status = { state: "idle" } | { state: "sending" } | { state: "success" } | { state: "error"; message: string };

const empty: ContactPayload = { name: "", email: "", subject: "", message: "", company: "" };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: keyof ContactErrors;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label htmlFor={`contact-${id}`} className="mb-2 block font-display text-[15px] font-semibold text-fg">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`contact-${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400"
          >
            <AlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (err?: string) =>
  cn(
    "w-full rounded-2xl border-[2.5px] bg-surface px-4 py-3 text-[15px] font-semibold text-fg placeholder:font-medium placeholder:text-subtle outline-none transition-[box-shadow,transform] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
    "focus:-translate-y-0.5 focus:shadow-[4px_4px_0_var(--ink)]",
    err ? "border-rose-500" : "border-ink",
  );

export function Contact({ formEnabled }: { formEnabled: boolean }) {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const update = (k: keyof ContactPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched) setErrors(validateContact(next));
    if (status.state === "error" || status.state === "success") setStatus({ state: "idle" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const errs = validateContact(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus({ state: "success" });
      setValues(empty);
      setTouched(false);
      setErrors({});
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  };

  const channels = [
    site.socials.email && { label: "Email", value: site.socials.email, href: mailto(site.socials.email), icon: Mail },
    site.socials.linkedin && { label: "LinkedIn", value: "Connect on LinkedIn", href: site.socials.linkedin, icon: FaLinkedinIn },
    site.socials.github && { label: "GitHub", value: "Browse my code", href: site.socials.github, icon: FaGithub },
  ].filter(Boolean) as { label: string; value: string; href: string; icon: React.ComponentType<{ size?: number }> }[];

  const aria = (k: keyof ContactErrors) => ({
    id: `contact-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `contact-${k}-error` : undefined,
  });

  const sending = status.state === "sending";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-32">
            <div className="container-x relative grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionEyebrow index="07" label="Contact" />
            <h2 id="contact-title" className="text-balance text-[2.5rem] leading-[1.06] sm:text-6xl">
              {site.contact.heading.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-gradient">{site.contact.heading.split(" ").slice(-2).join(" ")}</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted">{site.contact.description}</p>
          </Reveal>

          {channels.length > 0 && (
            <Reveal delay={0.1}>
              <ul className="mt-12 space-y-3">
                {channels.map(({ label, value, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="toon-sm toon-press group flex items-center gap-4 rounded-2xl bg-bg-elev px-4 py-4"
                    >
                      <span className="grid size-11 place-items-center rounded-full border-[2.5px] border-ink bg-yellow text-ink">
                        <Icon size={17} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs text-muted">{label}</span>
                        <span className="block font-medium tracking-tight">{value}</span>
                      </span>
                      <ArrowUpRight size={18} className="text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            noValidate
            aria-describedby={!formEnabled ? "contact-disabled-note" : undefined}
            className="toon relative rounded-[2rem] bg-bg-elev p-6 shadow-[10px_10px_0_var(--ink)] sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <input {...aria("name")} autoComplete="name" maxLength={limits.name} value={values.name} onChange={update("name")} placeholder="Your name" className={inputCls(errors.name)} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input {...aria("email")} type="email" autoComplete="email" maxLength={limits.email} value={values.email} onChange={update("email")} placeholder="you@company.com" className={inputCls(errors.email)} />
              </Field>
            </div>
            <div className="mt-5">
              <Field id="subject" label="Subject" error={errors.subject}>
                <input {...aria("subject")} maxLength={limits.subject} value={values.subject} onChange={update("subject")} placeholder="What's this about?" className={inputCls(errors.subject)} />
              </Field>
            </div>
            <div className="mt-5">
              <Field id="message" label="Message" error={errors.message}>
                <textarea {...aria("message")} rows={6} maxLength={limits.message} value={values.message} onChange={update("message")} placeholder="Tell me about the project, role or idea…" className={cn(inputCls(errors.message), "resize-y")} />
              </Field>
            </div>

            {/* honeypot — hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update("company")} />
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className="min-h-5 text-sm">
                {status.state === "success" && (
                  <span className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 size={16} /> Message sent — I&rsquo;ll get back to you soon.
                  </span>
                )}
                {status.state === "error" && (
                  <span role="alert" className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
                    <AlertCircle size={16} /> {status.message}
                  </span>
                )}
                {!formEnabled && status.state === "idle" && (
                  <span id="contact-disabled-note" className="text-muted">
                    The form isn&rsquo;t connected yet{channels.length ? " — please use the links alongside." : "."}
                  </span>
                )}
              </div>
              <Magnetic>
                <button
                  type="submit"
                  disabled={sending || !formEnabled}
                  className="toon-sm toon-press group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-yellow px-7 font-display text-[15px] font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Send size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
