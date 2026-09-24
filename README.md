# OPflow — website

Landing page and legal pages for **OPflow**, an OPD appointment and patient-flow platform.
*Right patient, right doctor, at the right time.*

Live at [opflow.in](https://opflow.in) (planned).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Fonts: Newsreader, IBM Plex Sans, IBM Plex Mono (via `next/font`)

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page for patients and doctors |
| `/privacy` | Privacy Policy (DPDP Act 2023, IT Act) |
| `/terms` | Terms & Conditions |
| `/refunds` | Rescheduling & Refund Policy |
| `/disclaimer` | Medical Disclaimer |
| `/contact` | Contact Us / Grievance Officer |

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Configuration

Business and legal details (company name, address, support email, grievance officer, platform fee,
reschedule cut-off) live in [`src/lib/site.ts`](src/lib/site.ts). Replace every `[bracketed]` placeholder
before going live.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, e.g. `https://opflow.in`. Used for canonical links, sitemap, robots and share images. |

Store links for the Play Store / App Store buttons are in
[`src/components/site/store-buttons.tsx`](src/components/site/store-buttons.tsx).

## Structure

```
src/
  app/                 routes, metadata, sitemap, robots, share image
  components/
    site/              header, footer, logo, shared primitives
    sections/          one folder per landing-page section
    legal/             shared layout for the policy pages
  lib/                 site config and small hooks
```
