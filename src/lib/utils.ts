export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const ease = [0.22, 1, 0.36, 1] as const;

export function mailto(email: string) {
  return `mailto:${email}`;
}
