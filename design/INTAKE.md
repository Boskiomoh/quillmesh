# Quillmesh: design intake

Quillmesh is a fictional workflow-automation company. This site is a case study, not client work.

Source: **Figma file** "Synkra - Enterprise SaaS Website Template (UI Kit Available)" by
Inagata Technosmith and Dicky Bhismawan H, Figma Community
(figma.com/community/file/1626855177447595897), free version licensed CC BY 4.0. Chosen by
Daniel on 28 Oct 2026. Duplicated to Daniel's drafts (key `TdE0UDYZlv2bz6BXBHpuAF`) and pulled
29 Oct 2026 with `figma-pull.mjs`.

## The pull

The whole file (with the dark-mode copy) is too big to download before Figma closes the
connection (twice cut at 180s, so 2 reads were spent for nothing). It was pulled in parts:

| Run | What | Calls | Result |
|---|---|---|---|
| `--list` | pages and top-level frames | 1 | `design/figma/outline.json` |
| `--ids` light page sections, `--scale 1` | 14 page frames + PNGs | 2 | `design/figma/` (185 MB JSON in 116s) |
| `--ids` design-system frames, `--no-images` | foundations, atoms, molecules, navigation | 1 | `design/figma-system/` |

Both folders are gitignored (size). Not pulled: cover, iconset (Phosphor, from the npm package
instead), illustration, favicon/app icon, social preview, full previews, dark-mode section.

## How the file is built

- Pages: "Design System" (foundations, atoms, molecules, organisms, as separate frames) and
  "Design Screen" (sections: Landing desktop, Responsive, Dark mode).
- Text styles are named: Heading 1–6 (Newsreader 500/600/700), Display (Newsreader 400 80/88,
  -1.6px), Body text-xs…xl (DM Sans 400/700), Button text-sm/md/lg (DM Sans 500). Public Sans 700
  only in avatar initials.
- Colours (by use): ink `#131210`, surface `#fcfcfd`, brand `#1a56db`, border `#e4e3df`,
  muted `#78766f`, body `#514f4a`, success `#1b6f4a`/`#edfaf3`, warning `#f4a016`, info tint
  `#ebf2fd`, teal `#0d9488`/`#ccfbf1`/`#0f766e`, danger `#be1c1c`/`#fef0f0`, subtle `#f2f1ef`,
  `#f5f7f9`. Gradients: dark panel diamond `#0e0f11 → #23252a`, brand diamond `#003fb1 → #1a56db`.
- Radii 8 (controls), 12 (cards), 18, 32, pill 999. Gaps 4/8/12/16/20/24/32/40/48/64.
- Icons: Phosphor (46 instances) → `@phosphor-icons/react` (approved 29 Oct).

## Frames → routes

Two widths are drawn: desktop 1280 and phone 402. Rule between them: phone layout below 768,
desktop grid from 1024, fluid in between (tablet is my call, checked in the sweep).

| Frame | Desktop | Phone | Route |
|---|---|---|---|
| Synkra Landing | 1280×5959 | 402×6623 | `/` |
| Synkra Features | 1280×4374 | 402×5911 | `/features` |
| Synkra About | 1280×3920 | 402×5647 | `/about` |
| Synkra Blog | 1280×3000 | 402×4917 | `/blog` |
| Synkra Blog Detail | 1280×3615 | 402×5057 | `/blog/[slug]` |
| Synkra Changelog | 1280×2756 | 402×3708 | `/changelog` |
| Synkra Pricing | 1280×3031 | 402×4319 | `/pricing` |

Additions (not in the file; built from its components and tokens, no fidelity score claimed):
`/demo` (demo-request form), `/legal/[slug]` (privacy, terms, cookies; blog-detail layout),
`/lp/automate` variants A and B, `/go/automate` pre-lander, `/components` (library page),
`/studio` (Sanity Studio).

Already in the frames: FAQ accordion, newsletter form, cookie banner, pricing monthly/annual
switch, announcement bar, footer legal links.

## Content decisions (Daniel, 29 Oct 2026)

- **Faces:** the 15 face photos (testimonial avatars, 8-person team grid) are of unknown origin.
  Replaced with initials avatars/tiles in the kit's colours. No real people as fictional staff.
- **Claims:** testimonials and metrics are kept in the layout, rewritten for Quillmesh, with a
  site-wide case-study banner and a "sample content" note on testimonials and stats.
- **Other photos** (building, map, product shots, blog covers): source unknown; to replace with
  credited free-licence images or generated product UI. Listed in `ATTRIBUTION.md`.
- **Logo wall** ("VOLT, SPHERE, LUMINA, ORBIT, NEXUS"): replaced with invented wordmarks that
  are checked not to be real companies.

## Contrast (WCAG AA, 4.5:1 for body text)

| Colour | On | Ratio | Proposal |
|---|---|---|---|
| muted `#78766f` | `#fcfcfd` / `#f2f1ef` / `#ebf2fd` | 4.43 / 4.03 / 4.04 | `#706e67` (4.98 / 4.52 / 4.53) |
| `#a09e97` (text, 9 uses) | `#fcfcfd` | 2.62 | `#767570` (4.50) where it is text |
| teal `#0d9488` (text) | `#fcfcfd` / `#f5f7f9` | 3.65 / 3.49 | `#0b7b72` (5.01 / 4.78) where it is text (first proposal `#0c8379` failed on the canvas, found by axe) |

Everything else checked passes (brand on surface 6.03, body 7.98, status pairs 4.86–6.53).
Pending Daniel's OK; until then the build uses the proposals and the report notes the change.

## Missing states (to build)

Form: empty, invalid field, submitting, success, server error, rate-limited. Nav: mobile menu
open, dropdown open (Resources). Pricing: annual vs monthly prices. Blog: empty category, long
title. Accordion: keyboard. Hover and focus on every control (design-system frames show button
and input states; pull 3 confirms).
