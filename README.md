# Stucknot — portfolio site

A static page: no build step, no dependencies. Open `index.html` in a browser, or upload the folder to any static host.

```
index.html            Markup only.
styles.css            All styles: tokens, layout, project stages, themes.
main.js               All behaviour (theme toggle, clock, reveal, rail, client-site picker, copy email).
screenshots/          Project images, all WebP. Referenced from index.html.
favicon.png           Tab icon (64px).
apple-touch-icon.png  iOS home-screen icon (180px).
og.png                Social share image (1200x630).
stcknot-logo.png      Brand logo (not used on the page yet).
.prettierrc.json      Formatting settings. Run:  npx prettier --write styles.css main.js
```

A tiny inline script in the `<head>` of `index.html` restores the saved theme before first paint (no flash). Everything
else lives in `main.js`.

## Page structure

| Section        | id            | What it is                                                                 |
| -------------- | ------------- | -------------------------------------------------------------------------- |
| Hero + stats   | `top`         | Headline, rotating "Currently" line, number strip.                         |
| Work           | `work`        | Six full-screen project stages (`<article class="feature">`).              |
| Services       | `services`    | Five service rows.                                                         |
| Learn          | `learn`       | Free guides, WhatsApp community, paid cohort.                              |
| Guest faculty  | `faculty`     | Topics institutions can invite Stucknot for; each row opens a pre-filled email. |
| Book           | `book`        | Coming-soon stage for the book, with a CSS book cover (placeholder artwork). |
| Contact        | `contact`     | Email and Instagram calls to action.                                       |

The project stages are, in order: CampusMaster, Asees Rishta, Stucknot Studio, Dashmesh Mechanix, Client websites,
Pocketful. Each is dark whatever the site theme, tinted by two per-project colours (`--a`, `--a2`) and a text accent
(`--ac`) set in its inline `style`.

## Adding or changing a project stage

1. Copy an existing `<article class="feature" id="f-…">` block in the **Work** section and edit the text.
2. Give the `<article>` a theme class, e.g. `theme-mything`, and define it once in `styles.css` (search for
   "project themes"): `--a` and `--a2` are space-separated RGB triples (a light and a dark shade of the brand colour),
   `--ac` is a lighter hex used for text accents. Put the same class on its link in the side rail so the two match.
3. Pick a visual: laptop frame (`.laptop`), fanned phone cards (`.fan`), device trio (`.trio`), staggered iPhones
   (`.stag`) or browser stack (`.bws`).
4. Update the "NN / 06" counters in each stage's `.f-idx`, and add a matching link in the side rail (`<aside class="rail">`).
   The rail links must be in the same order as the stages.

## Screenshots

- Use WebP. Keep the image roughly 2× its display width (about 1,400px for a laptop screen, about 600px wide for a phone).
- Give every `<img>` explicit `width`/`height` so the page doesn't jump while it loads.
- Lazy images are quietly fetched after the page loads, so they're ready before you scroll to them.

## The book: coming soon -> live

The book section (`<section id="book" data-state="soon">`) is a dark stage like the project sections but is not part of
the project rail. While `data-state="soon"` it shows a "Notify me" email button. When the book is published:

1. Set the `href` of `<a id="book-buy">` to the buy link.
2. Change `data-state="soon"` to `data-state="live"` on the section. The "Notify me" button hides and "Get the book"
   appears (see the `.when-soon` / `.when-live` rules in `styles.css`).
3. Replace the CSS cover (`.bk-front` in `index.html`) with the real cover image if you have one, and update the
   title, subtitle and "Coming soon" label to match.

The cover is flat faces sharing one perspective, deliberately not `transform-style: preserve-3d` (Chromium drops parts
of large preserve-3d layers when they are partly off-screen).

## Content still to fill in

Search `index.html` for `TO FILL`. Open placeholders: the WhatsApp community link, the WhatsApp number, the training
price and the LinkedIn link.

## Share image and favicon

`og.png`, `favicon.png` and `apple-touch-icon.png` are generated artwork. The `og:image` tag in `index.html` points to
`https://stucknot.com/og.png`; change that URL if the site is hosted somewhere else, because social crawlers need an
absolute address.

## Notes

- Fonts (Montserrat, JetBrains Mono) come from Google Fonts and load without blocking the first paint.
- The theme follows the visitor's system setting, with a manual toggle in the header (remembered in `localStorage`).
- Guest-faculty "Invite us" buttons are `mailto:` links to `info@stucknot.com`. Each link carries its own subject in the
  markup (`data-invite`); the shared message body is added once in `main.js` (`INVITE_BODY`).
- The client-site picker tints the stage through `#f-sites[data-tint]` rules in `styles.css`; `main.js` only sets the index.
