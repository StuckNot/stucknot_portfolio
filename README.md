# Stucknot — portfolio site

A single static page: no build step, no dependencies. Open `index.html` in a browser, or upload the folder to any
static host.

```
index.html     The whole page: styles (<style>), markup, and a small script (<script>) at the bottom.
screenshots/   Project images, all WebP. Referenced from index.html.
stcknt-logo.png  Brand logo (not used on the page yet; handy for a favicon or share image).
```

## Page structure

| Section        | id            | What it is                                                                 |
| -------------- | ------------- | -------------------------------------------------------------------------- |
| Hero + stats   | `top`         | Headline, rotating "Currently" line, number strip.                         |
| Work           | `work`        | Six full-screen project stages (`<article class="feature">`).              |
| Services       | `services`    | Five service rows.                                                         |
| Learn          | `learn`       | Free guides, WhatsApp community, paid cohort.                              |
| Guest faculty  | `faculty`     | Topics institutions can invite Stucknot for; each row opens a pre-filled email. |
| Contact        | `contact`     | Email and Instagram calls to action.                                       |

The project stages are, in order: CampusMaster, Asees Rishta, Stucknot Studio, Dashmesh Mechanix, Client websites,
Pocketful. Each is dark whatever the site theme, tinted by two per-project colours (`--a`, `--a2`) and a text accent
(`--ac`) set in its inline `style`.

## Adding or changing a project stage

1. Copy an existing `<article class="feature" id="f-…">` block in the **Work** section and edit the text.
2. Set its colours in the `style` attribute: `--a` and `--a2` are space-separated RGB triples (light and dark shade of the
   brand colour), `--ac` is a lighter hex used for text accents.
3. Pick a visual: laptop frame (`.laptop`), fanned phone cards (`.fan`), device trio (`.trio`), staggered iPhones
   (`.stag`) or browser stack (`.bws`).
4. Update the "NN / 06" counters in each stage's `.f-idx`, and add a matching link in the side rail (`<aside class="rail">`).
   The rail links must be in the same order as the stages.

## Screenshots

- Use WebP. Keep the image roughly 2× its display width (about 1,400px for a laptop screen, about 600px wide for a phone).
- Give every `<img>` explicit `width`/`height` so the page doesn't jump while it loads.
- Lazy images are quietly fetched after the page loads, so they're ready before you scroll to them.

## Content still to fill in

Search `index.html` for `TO FILL`. Open placeholders: the WhatsApp community link, the WhatsApp number, the training
price and the LinkedIn link.

## Notes

- Fonts (Montserrat, JetBrains Mono) come from Google Fonts and load without blocking the first paint.
- The theme follows the visitor's system setting, with a manual toggle in the header (remembered in `localStorage`).
- Guest-faculty "Invite us" buttons are `mailto:` links to `info@stucknot.com` with a pre-filled subject and body.
