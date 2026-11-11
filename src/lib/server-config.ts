import "server-only";
import fs from "node:fs";
import path from "node:path";
import { site } from "@/config/site";

export function isContactConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

/** Resume buttons only render once the PDF actually exists in /public. */
export function resumeHref(): string | null {
  const file = path.join(process.cwd(), "public", site.resume.file);
  return fs.existsSync(file) ? `/${site.resume.file}` : null;
}
