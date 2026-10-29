# Quillmesh: a SaaS marketing site (case study)

> **Quillmesh is a fictional company.** This is a portfolio case study by Daniel Omoyibo, not client
> work. People, quotes and figures on the site are labelled sample content.

A B2B SaaS marketing site built from a Figma kit, with three things clients ask for most:

1. **A launch site on a headless CMS.** Every page's copy, pricing plans, FAQs, blog, changelog, legal
   pages and both landing-page variants are edited in an embedded Sanity Studio. Published changes reach
   the cached pages through the Live Content API, with no redeploy. A working demo-request form validates,
   rate-limits and stores requests in a private dataset.
2. **A design system from Figma.** The kit's variables, text styles and component variants (240 button
   variants) became a Tailwind v4 theme and typed React components, documented live at `/components`.
3. **Conversion landing pages with a real A/B split.** `proxy.ts` assigns each visitor variant A or B for
   30 days and rewrites `/lp/automate` to a prerendered page. A pre-lander (`/go/automate`) feeds it. CTA
   clicks, form sends and landing views are recorded after cookie consent; `/case-study` shows the counts.

Live: _added after deploy_ · Report: `/case-study` and `/fidelity/report.html`

## Stack

Next.js 16 (App Router, Cache Components, `proxy.ts`), React 19 with the React Compiler, TypeScript,
Tailwind CSS v4, Sanity (next-sanity, TypeGen), Zod, Phosphor icons. Tests: Vitest, Testing Library,
Playwright, axe.

## Measured results (29 October 2026, production build)

Design match against the Synkra frames, share of pixels matching within 1px, at the frames' own widths:

| Page         | Desktop (1280) | Phone (402) |
| ------------ | -------------- | ----------- |
| Home         | 89.0%          | 80.3%       |
| Features     | 88.9%          | 75.2%       |
| About        | 78.5%          | 54.9%       |
| Pricing      | 95.0%          | 88.7%       |
| Blog         | 79.7%          | 53.3%       |
| Blog article | 78.0%          | 65.4%       |
| Changelog    | 93.4%          | 75.7%       |

Lower scores are deliberate changes from the frames, not drift: About replaces eight portrait photos with
initials (no real faces for fictional staff); Blog and Home use different (credited) photos; the
article body is Quillmesh's own; the stock code photos are redrawn in code.

- **Accessibility:** axe, 0 violations on all 14 measured pages; three kit colours adjusted for WCAG AA.
- **Responsive:** 100 screenshots across 10 routes from 320px to 1920px, 0 with sideways scroll.
- **Tests:** 23 unit tests, 56 end-to-end tests (desktop and phone widths), all passing.
- **Lighthouse:** _measured after deploy_.

## Running it

Create `.env.local` (gitignored) with:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: the Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: `production`
- `SANITY_LEADS_WRITE_TOKEN`: a Sanity Editor token, server only, used by the forms and analytics

```bash
npm install
npm run seed                 # imports the sample content and photos into Sanity
npm run dev -- -p 3300       # the site; the Studio is at /studio
```

| Script                                                                                              | What it does                                                                       |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run typegen`                                                                                   | Regenerates `src/sanity/types.ts` from the schema and every GROQ query             |
| `npm test`                                                                                          | Unit tests (Vitest)                                                                |
| `npm run test:e2e`                                                                                  | End-to-end tests (Playwright); builds and serves on port 3300                      |
| `node ~/.claude/skills/figma-to-code/scripts/fidelity.mjs` then `node scripts/publish-evidence.mjs` | Re-measures fidelity, sweep and axe, and publishes the report to `public/fidelity` |

## Architecture notes

- **Routes.** `src/app/(site)` holds the site pages under the shared header and footer;
  `src/app/(lp)` holds the conversion pages (`/lp/automate/[variant]`, `/go/automate`) with no site
  navigation; `/studio` is the embedded Sanity Studio; `/api/events` is the only route handler.
  Pages are thin: they fetch with `cachedSanity` and render one component from `src/components`.
- **Data.** Content comes from the public `production` dataset through next-sanity's Live Content API,
  so Studio edits reach the cached pages without a redeploy. Every query is typed by Sanity TypeGen.
- **Secrets.** Only `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` reach the browser.
  `SANITY_LEADS_WRITE_TOKEN` is read in one `server-only` module (`src/sanity/write-client.ts`) used
  by the Server Actions, `/api/events` and the A/B results; the seed and photo scripts run with the
  developer's own Sanity CLI login instead.
- **Studio.** The Studio is rendered from a client component; importing `sanity.config.ts` into a
  server component pulls client-only packages into the server build.
- **Class merging.** `cn()` registers the project's token names with tailwind-merge so it can tell
  `text-body-sm` (a size) from `text-surface` (a colour).
- **Forms.** React adds `$ACTION_…` fields to form data; `formValues()` drops them before the strict
  Zod schemas run. Submitted values return with errors because React resets the form after an action.
- **Rate limits** are in-memory per server instance, checked after validation so only real writes
  count. They stop one script from spending the free Sanity quota; they are not a distributed limit.

## Security notes

- Demo requests, newsletter sign-ups and analytics events go to a **private** Sanity dataset through a
  server-only token; the public dataset holds only site content.
- Forms are Server Actions validated with Zod (unknown fields rejected, spam-trap field); writes are
  rate-limited per IP and globally; errors returned to visitors are generic.
- The A/B variant is read from an HttpOnly cookie on the server, never from the request body.
- CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy` and `Permissions-Policy` are set on every page.
- `npm audit --omit=dev` lists advisories inside Sanity's command-line tooling (`@sanity/cli` and its
  dependencies), which runs on developer machines and is not shipped to the browser. The suggested fix is
  a downgrade to an older Sanity major, so it is left as is.

## Credits

Design: **Synkra** by Inagata Technosmith and Dicky Bhismawan H (Figma Community, CC BY 4.0), adapted.
Photos, icons and fonts: see [ATTRIBUTION.md](ATTRIBUTION.md). Design intake and decisions:
[design/INTAKE.md](design/INTAKE.md).
