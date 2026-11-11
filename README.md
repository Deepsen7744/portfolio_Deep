# Deep Sen — Portfolio

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide · React Icons

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

**Everything lives in [`src/config/site.ts`](src/config/site.ts)** — bio, experience, skills, projects, achievements, education, links.

| What | How |
| --- | --- |
| GitHub / LinkedIn / email | Set `socials.*`. Anything left `null` is hidden (no dead buttons). |
| Resume | Put the PDF at `public/resume.pdf`. Resume buttons appear automatically (rebuild in production). |
| Project links | Set `github` / `demo` per project. The demo button only renders when a URL is set. |
| Project screenshots | Add images to `public/projects/` and set `image: "/projects/name.png"`. Otherwise a designed mockup renders. |
| Availability pill | `availability.open` / `availability.label`. |
| Unconfirmed facts | `verified: false` → shown in dev with an amber **VERIFY** tag, **hidden in production**. Flip to `true` once confirmed. |

Currently flagged for verification: PsychDeskHQ dates, "1000+ DSA problems", "Top 300 ML Summer School 2024".

## Contact form

Delivery goes through [Resend](https://resend.com) from the server route `src/app/api/contact/route.ts`. The key never reaches the browser. Copy `.env.example` → `.env.local` and fill in:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Until these are set, the form shows "not connected yet" and its submit button is disabled. Includes shared client/server validation, a honeypot, and a per-IP rate limit.

## Structure

```
src/
  config/site.ts            ← all content
  app/                      layout (SEO, theme), page, api/contact, sitemap, robots, OG image, icon
  components/
    layout/                 navbar, footer, logo
    sections/               hero, about, experience, skills, projects, achievements, education, contact
    hero/hero-visual.tsx    animated RAG-pipeline console
    projects/               mockups + accessible details modal
    ui/                     reveal, magnetic, button, cursor, loader, background, theme toggle, tech icons
  lib/                      utils, contact validation, server-only config
```

Accessibility: skip link, keyboard-navigable tabs/menus/modal with focus trapping, `aria-*` throughout, and `prefers-reduced-motion` respected (Framer `MotionConfig` + CSS; cursor, loader and parallax disabled).
