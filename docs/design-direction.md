# Design direction — StuckNot project portfolio

Research done via: the 28-page `Pawan Kumar_...pdf` capture (pages 1-3 useful; pages 4-28 are blank because the
print capture happened before scroll-triggered content loaded), a live Playwright pass against pawan.app itself
(dark mode, desktop 1440px + iPhone 13 viewport, 12 scroll steps each, plus computed-style extraction), a live
Playwright pass against stucknot.com (desktop + mobile, plus a DOM-level color/font/token dump), and single-viewport
captures of five other reference sites (Linear, Vercel, Pentagram, Stripe — screenshotted; Active Theory — site
failed to render headless, described from general knowledge instead and flagged below).

This doc is the implementation brief for the build. It does not repeat the full audit (see the conversation/PR
description for that); it only covers what the new design is and why.

---

## 1. What pawan.app actually does

### Layout
- Two registers: a **hero** (hand-authored, one-off) and a **repeating product module** used 9 times for every
  shipped app. The repeating module is the one directly relevant to a project portfolio.
- Each product module is a two-column split on desktop: ~40% fixed-width text column on the left, ~60% visual
  column on the right, vertically centered. On mobile it collapses to a single column — **text first, image
  second**, image goes full-width below the copy.
- A vertical icon rail is pinned to the far right edge of the viewport for the entire "shipping" sequence: one
  small icon per product, the active one highlighted, with a "01 / 09" style counter at top and bottom. It's an
  in-page jump nav disguised as a progress indicator.
- A thin progress bar (1-2px, accent-colored) sits fixed at the very top of the viewport and fills as you scroll —
  a cheap, elegant "how much is left" cue.

### Typographic hierarchy
- Two typefaces only: **Geist** (UI/body sans) and **Geist Mono** (small mono labels/meta — eyebrow text, index
  numbers, timestamps). Headings inside product modules use a third, **Bricolage Grotesque**, at 24-28px/600 for
  sub-heads — but the *big* display names (person's name, product names) are set in the same grotesque sans at
  huge sizes (in the 70-90px range on desktop), not a separate display face.
- Every product module repeats the same four-line text rhythm: (1) small mono eyebrow — index + platform tag pill,
  e.g. `01 / 09` + `Mac app · macOS 14.4+ · Apple silicon`; (2) huge bold product name; (3) **italic** one-line
  tagline directly under the name, in the accent color — this italic line is the single most distinctive
  typographic move on the site; (4) a 2-3 sentence description in muted gray at body size.
- Color text is used sparingly and specifically: near-white for names/body, a dimmed gray for secondary text, and
  the accent color reserved for the italic tagline, links-in-progress, and primary buttons only.

### Spacing rhythm
- Very generous vertical breathing room: each product module is close to a full viewport tall even though its
  content doesn't need it — whitespace itself is doing the "premium" work, not density.
- Tight internal clusters (eyebrow → name → tagline sit close together) contrasted against large gaps between
  clusters (name block → feature-pill row → CTA row each get noticeably more space than the lines within a
  cluster). Hierarchy by *proximity*, not just by size.

### Component patterns
- **Feature pills**: short capability phrases ("Live preview beside the agent", "Saved window layouts") as
  individual pill-shaped chips, 2-up or 3-up grid, not a bulleted list.
- **Primary CTA**: a large pill button, usually a violet gradient fill, paired with a plain-text domain
  (`deskmodes.com`) next to it rather than a second button — i.e. one real CTA, one quiet reference link.
- **Visual presentation**: never a flat single screenshot. Each module layers 2-3 overlapping cards/windows (a
  laptop-chrome screenshot behind a smaller floating detail panel, sometimes a phone mockup leaning against it) —
  depth via composition, not drop shadows alone.
- **Per-module ambient color**: this is the biggest single finding. Each product module tints its *entire section
  background* with a soft radial glow in a color pulled from that specific product's own brand (purple for one app,
  warm orange/brown for a sobriety-tracking app, amber/gold for a video editor). The overall page stays dark/neutral
  as a base, but every case study gets its own mood. This is what stops nine sequential "screenshot + text" blocks
  from feeling like a repeated template.
- A small "currently building" section after the shipped list uses a live-status pill (pulsing dot + "NOW") to
  mark in-progress work distinctly from shipped work.

### Motion / interaction (live-browser only — not visible in the static PDF)
- The hero's "Currently: ___" field rotates between values (seen "Founder, Codepur" and "Google Developer Expert"
  on two separate loads) — a small live-data/rotating-status touch, not just static text.
- Scroll-linked reveal: content animates/loads in as it enters the viewport (confirmed indirectly — the Chrome
  print capture, which doesn't fire scroll listeners, rendered 25 of 28 pages blank below the fold).
  **We will not replicate scroll-gated content loading** for the PDF export's sake — see §5 build constraint — but
  the web version can use a restrained version (fade/slide-up on first viewport entry, `prefers-reduced-motion`
  respected, as the current file already does for other animations).

### Responsive behavior
- Nav collapses to a hamburger; the big display name stays large and prominent (not shrunk away) and still
  overlaps the portrait on mobile — they chose to keep the signature visual rather than simplify it away.
- Two-column product modules become single-column, text-before-image, full-width image.
- The side icon rail disappears on mobile (confirmed by its absence in the mobile captures) — it's a desktop-only
  affordance, not forced into a worse mobile equivalent.

---

## 2. Five other reference points

- **[Linear](https://linear.app)** — pure black background, near-white type, *zero* color in the hero (no gradient,
  no accent swatch), one massive confident headline, huge whitespace above it, and the one product screenshot
  included fades to black at its lower edge via a gradient mask instead of a hard crop. Premium here = extreme
  restraint, not more visual elements.
- **[Vercel](https://vercel.com)** — the brand mark (a simple triangle) is blown up as a glowing centerpiece
  illustration; a trust-logo strip (Meta, OpenAI, SpaceX, etc.) sits directly under the fold as social proof.
  Premium here = confidence in a single simple asset, oversized, plus borrowed credibility from logos.
- **[Pentagram](https://pentagram.com)** — full-bleed editorial photography as the hero, with a one-line project
  caption overlaid bottom-left (title + single descriptive sentence, white text, no card/background needed because
  the photo has enough contrast). A "We design ‹category▾› for ‹sector▾›" sentence-built filter control doubles as
  both navigation and a content summary. Premium here = treating the work's own imagery as the hero, and a filter
  UI that reads as a sentence, not a form.
- **[Stripe](https://stripe.com)** — a signature animated gradient-ribbon graphic is confined to one corner/edge
  rather than used as a full background, so it reads as a brand asset, not noise; the headline uses two text
  weights/colors in one sentence (bold black for the core claim, muted blue-gray for the elaboration) instead of
  one flat color; a live-updating stat humanizes scale. Premium here = a restrained signature visual plus
  typographic color-coding within a single headline.
- **[Active Theory](https://activetheory.net)** *(described from general knowledge — their site requires WebGL2
  and did not render in the headless Chromium capture; treat this entry as lower-confidence than the other four,
  which were screenshotted directly)* — known for full WebGL/shader-driven case-study pages with cursor-reactive
  3D elements. Relevant technique, not a literal thing to copy: individual case studies can have their own bespoke
  visual treatment inside a consistent shell, rather than every project page being visually identical.

---

## 3. StuckNot's real brand (source of truth — from stucknot.com, live)

Pulled via computed-style extraction against the live site, not guessed:

| Token | Value | Where seen |
|---|---|---|
| Body font | **Montserrat**, sans-serif | `body` computed font-family, every sampled element |
| Mono accent font | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` | the small `APPLY TO JOIN →` CTA label only — mono is used sparingly, for one short label, not as a second body face |
| Primary accent (brand red/maroon) | `rgb(172, 13, 48)` ≈ **`#AC0D30`** | active nav link color, "not" in the "stuck**not**" logotype, filled button background, footer column headings (as a lighter tint `rgb(230,168,168)`) |
| Page background | `rgb(254, 253, 251)` ≈ **`#FEFDFB`** (warm off-white, not pure white) | `body` background |
| Ink / primary text | `rgb(0, 0, 0)` pure black | headings, nav |
| Muted text | `rgb(79, 79, 77)` ≈ `#4F4F4D` (warm dark gray) | paragraph copy, inactive nav links |
| Neutral surface | `rgb(248,248,248)` / `rgb(232,232,232)` | card/section backgrounds |
| Footer | near-black / dark charcoal gradient, white text at reduced opacity | footer background |
| Button radius | `8px` | both hero buttons (`Hire Talent` outline, `Apply for Internship` filled) |
| Nav/tag radius | `30px`–`50px` (pill) | nav links, sticky floating nav capsule on scroll |
| H1 | 64px / weight 800 | hero title |
| H2 | 42px / weight 800 | section titles |
| Body | 16-18px / weight 400 | paragraphs |

**Confirmed brand assets already present in the current portfolio file, independent of color:**
- The hero intro copy *"A community of builders, building what's next."* is lifted verbatim from stucknot.com's own
  H1 — keep it exactly.
- The marquee/ticker strip pattern (`SHIP · LEARN · REPEAT`, auto-scrolling horizontal strip with bullet
  separators) exists on the real site too, same idea, same tagline. Keep the component, just re-skin its colors.
- The real site's hero visual is a layered stack of mock code-editor / terminal / app windows (`node server.js`,
  `App.jsx`, a `localhost:3000` preview with an `INITIALIZE SYSTEM` button) — i.e. **the current portfolio's
  terminal/code motif is already correct and on-brand.** It is not a brutalist invention to discard; it's the
  right idea in the wrong two colors (black/yellow instead of StuckNot's actual palette).
- A real "Dark Mode" toggle exists on stucknot.com's site chrome. We are not required to add a toggle to the
  portfolio, but it confirms dark surfaces are an accepted part of the brand (used for the footer already).

**Not found / not claimed:** no secondary accent color beyond the maroon + its light tint was observed; no
distinct serif or display face exists on the real site (headings are Montserrat ExtraBold, not a separate face).
We will not invent one.

---

## 4. What we will apply, concretely

This is pawan.app's *approach*, carried over to StuckNot's *own* brand — not pawan.app's purple, not its Geist
fonts, not its photo, not its copy.

1. **Typography swap.** Replace Archivo (currently self-hosted, used for everything) with **Montserrat** as the
   single sans for all headings and body copy, self-hosted the same way (embedded woff2, variable or static
   weights 400/500/700/800). Keep **JetBrains Mono**, but narrow its job to match the real site: small eyebrow
   labels, the terminal lines, index numbers (`01 / 05`), and button micro-labels only — never body copy. This
   mirrors stucknot.com's actual mono usage (one small CTA label) rather than the current file's mono-everywhere
   brutalist treatment.
2. **Color swap.** Replace the placeholder `{ink:#000000, paper:#ffffff, accent:#ffe600, muted:#595959}` theme
   object with StuckNot's real tokens: `ink:#000000`, `paper:#FEFDFB`, `accent:#AC0D30`, `muted:#4F4F4D`. The
   yellow accent goes away entirely — maroon becomes the one accent color, used the way pawan.app uses violet:
   sparingly, on primary actions and one or two emphasis details, never as a large fill.
3. **Corner radius.** Move from the current hard-edged/thick-border brutalist system (`border: 3px solid`,
   sharp rectangles everywhere) to soft rounding that matches the real site: `8px` on buttons and cards, pill
   (`999px`) on nav chips/tags — matching both stucknot.com's own buttons and pawan.app's pill nav/CTA language.
4. **Per-project ambient identity, borrowed from pawan.app §1.** Instead of one flat yellow/black theme applied
   identically to every project page, give each project page a very subtle tint derived from *that project's own*
   visible brand color (sampled from its real screenshot/site, not invented): Farm & Friends' warm green/terracotta,
   Velora's gold, Prime Forensics' navy, CampusMaster's indigo/blue, Dashmesh Mechanix's blue. Keep it subtle (a
   soft background wash or accent on that page only, not a full theme change) so the shell still reads as one
   consistent StuckNot system, the way every pawan.app module is still unmistakably "pawan.app" despite each
   having its own glow color.
5. **Project module rhythm, borrowed from pawan.app §1.** Adopt the eyebrow → huge name → italic one-liner → body
   → feature/meta row structure for the featured (single-per-page) project layout. The italic tagline line is new:
   we don't currently have a short tagline per project in the data — flagged as a content gap in §5.
6. **Fix the screenshot problem directly, don't reuse the existing images.** The current screenshots carry a
   baked-in decorative red-gradient browser-mockup frame (see audit) that would now doubly clash with real maroon
   brand accents. Recapture clean, frameless screenshots for the 4 website projects (browser viewport only) and
   treat Dashmesh Mechanix (the one mobile app) with an actual phone-mockup presentation instead of forcing it
   into the website window-chrome component, taking a cue from pawan.app's layered-mockup approach (§1, "Visual
   presentation").
7. **Full-bleed imagery for at least the cover, borrowed from Pentagram §2.** Where we have a strong real
   screenshot, let it run larger/closer to full-bleed within its frame rather than small-and-centered with a lot
   of dead space around it (the current featured-project page has a lot of unused whitespace around a
   small-rendered screenshot — see audit).
8. **Restraint, borrowed from Linear §2.** Don't add decoration beyond what the content needs. The win from the
   redesign should come from fixing typography/color/spacing fundamentals and from the per-project identity (§4.4),
   not from adding more visual elements.
9. **Keep the marquee, logo lockup, and closing-page structure** — all three are already real StuckNot brand
   patterns (confirmed in §3), just need the color/type swap applied.

---

## 5. Open questions / things to verify during build

- **No per-project tagline exists in the current data.** pawan.app's italic one-liner pattern needs a short
  (3-6 word) tagline per project to work. We have accurate one-line *descriptions* already, but not a separate
  punchy tagline. Per the "honesty" rule, we will not invent marketing taglines presented as client-sourced copy —
  default plan: either derive the italic line as a direct short excerpt/compression of the existing honest
  description (not a new claim), or omit the italic line for projects where that can't be done without inventing
  anything, rather than fabricate one.
- **Per-project ambient colors (§4.4)** will be sampled directly from each project's own screenshot/site, not
  guessed — to be pinned down precisely during build when the clean screenshots are recaptured.
- **Scroll-triggered reveal animation** (pawan.app) will be used in a restrained form for the web version only;
  it is explicitly out for the PDF export path, since the print capture of pawan.app itself demonstrates what goes
  wrong (25 of 28 pages rendered blank) when scroll-gated content meets a non-interactive print pass. The PDF
  export script must force all content visible/static before printing.
- Active Theory (§2) is the one reference not directly screenshotted — lower confidence, used only for the general
  "bespoke per-case-study treatment" idea, which is independently corroborated by pawan.app's own per-module
  ambient color technique anyway.
