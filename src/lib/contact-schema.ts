/** Shared validation for the contact form (used by client and API route). */

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — real users leave this empty. */
  company?: string;
}

export type ContactErrors = Partial<Record<keyof Omit<ContactPayload, "company">, string>>;

export const limits = { name: 80, email: 120, subject: 140, message: 4000 } as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const subject = (input.subject ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > limits.name) errors.name = `Keep it under ${limits.name} characters.`;

  if (!emailRe.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > limits.email) errors.email = "That email is too long.";

  if (subject.length < 3) errors.subject = "Add a short subject.";
  else if (subject.length > limits.subject) errors.subject = `Keep it under ${limits.subject} characters.`;

  if (message.length < 20) errors.message = "A little more detail, please (20+ characters).";
  else if (message.length > limits.message) errors.message = `Keep it under ${limits.message} characters.`;

  return errors;
}
