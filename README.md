# StuckNot — Project portfolio

One site, two outputs: a webpage and an A4-landscape PDF, generated from the same files. See
`docs/design-direction.md` for the design research and reasoning behind the visual system.

## Files

```
index.html              Layout, styling, and rendering logic. You should not need to edit this for content changes.
data.js                 All content — company info, theme colors, and every project. Edit this file.
screenshots/            Project screenshots referenced by data.js.
scripts/export-pdf.js   The PDF export script (run via `npm run pdf`).
docs/design-direction.md  Design research notes — why the site looks the way it does.
stucknot-portfolio.pdf  The exported PDF. Regenerate it after any change to data.js or screenshots.
```

## Edit content

Open `data.js`. Everything — company info, contact links, theme colors, and the project list — lives there,
with a comment above each field explaining it. You never need to touch `index.html` to change content.

## Add a project

Add an entry to the `projects` array in `data.js`:

```js
{
  name: "Real product name",             // the actual brand/product name, not a generic description
  tagline: "A short honest one-liner.",   // optional — a true quote from the client's own site, or a direct
                                           // compression of `description`. Never invent a claim.
  description: "One sentence, ~100-180 characters, describing what it is and what StuckNot built.",
  url: "https://example.com",             // leave as "" for a private project — shows "On request" instead
  image: "screenshots/example.jpg",
  category: "Website",                    // also powers the filter chips in the web header
  year: "2026",
  accent: "#2A6F4B",                      // optional — a color sampled from the project's own screenshot/brand,
                                           // used as a subtle per-project accent wash. See "Accent colors" below.
  featured: true                          // optional — gives the project its own full page. Put featured
                                           // projects first in the array; only use this for your strongest work.
}
```

Put featured projects first. Non-featured projects pair up two-per-page in the order they appear.

### Accent colors

Each project page gets a faint tint of that project's own brand color — sampled from its real screenshot, not
invented — applied to the index number, the tagline-adjacent accents, and the "View live" button on that page
only. If you add `accent`, **check it's accessible first**: it needs roughly 4.5:1 contrast both against the
page background (`#FEFDFB`) and as white text on a filled button. A quick way to check: paste the hex into any
WCAG contrast checker against `#FEFDFB` (text) and as a background with white text (button) — both need to read
"AA" or better for normal-size text. If a color you sampled is too light (pastels, light golds, etc.), darken it
(mix toward black) until it passes — the hue will still read as the same brand color, just a shade deeper.
Leaving `accent` out entirely falls back to StuckNot's own brand maroon.

### Mobile-app projects

If a project is a mobile app and your screenshot is a collage (multiple phone screens side by side) rather than
a single desktop screenshot, set `type: "mobile"`. This skips the browser-window frame (address bar, dots) and
presents the image directly — that chrome only makes sense for a website screenshot.

## Screenshots

- **Website projects:** capture the real, live page — no decorative mockup frames, browser bezels, or gradient
  backgrounds baked into the image. `index.html` already draws its own window chrome (the dots + address bar);
  a second frame baked into the image will double up and look wrong. Aim for 1600×1000px (16:10), from the
  actual site, not a template. Crop out cookie banners if you can.
- **Mobile-app projects:** a clean collage of a few real screens works well (that's what `dashmesh-mechanix.jpg`
  is). Any reasonably wide aspect ratio is fine since `type: "mobile"` doesn't force a specific ratio.
- **Format:** JPEG, resized so the longer edge is ≤1800px, saved at ~85% quality. That's enough to look sharp at
  print size while keeping the page light. (`campusmaster.jpg` is lower-resolution than the others because it
  was cropped from an existing 1440×900 capture rather than captured fresh — if you get a chance to retake it at
  a higher resolution, do.)
- Never invent a screenshot or use a stock/placeholder image in place of the real product.

## Export the PDF

```
npm install              # once
npx playwright install chromium   # once
npm run pdf
```

This writes `stucknot-portfolio.pdf` at the project root — A4 landscape, background colors included, every
project link clickable. It's a scripted version of Chrome's own File → Print → Save as PDF (Paper: A4, Layout:
Landscape, Margins: None, Background graphics: on), so there's nothing to configure by hand and the result is
always consistent.

Run it again any time `data.js` or a screenshot changes — the PDF doesn't update itself.

Once you've generated it and plan to host it alongside the site, set `pdfUrl: "stucknot-portfolio.pdf"` in
`data.js` to add a "Download PDF" button to the web header.

## Deploy the website

Upload these to any static host (Netlify, Vercel, GitHub Pages, S3, etc.) — no build step:

```
index.html
data.js
screenshots/
stucknot-portfolio.pdf   (optional, only if you set pdfUrl)
```

`scripts/`, `package.json`, `node_modules/`, and `docs/` are only needed locally to generate the PDF — don't
upload them.

To preview locally before deploying, serve the folder with any static server (opening `index.html` directly as
a `file://` URL also works, since everything — fonts, screenshots, data — is local and self-contained):

```
npx serve .
```

## Notes for whoever edits this next

- Fonts (Montserrat + JetBrains Mono) are embedded directly in `index.html` as base64 — the site works fully
  offline, with no calls to Google Fonts or any other third party.
- The color theme in `data.js` (`theme.accent` etc.) is StuckNot's real brand, pulled from stucknot.com — not a
  placeholder. If you do change it, also sanity-check contrast (see Accent colors above), since the whole page
  assumes the accent reads clearly on both white and near-black backgrounds.
- `docs/design-direction.md` explains the design reasoning (what was taken from pawan.app and other references,
  and why) if you want context before making a bigger visual change.
