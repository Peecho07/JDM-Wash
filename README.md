# JDM Wash website demo

Static site (plain HTML, CSS and JS). Live on GitHub Pages at:
https://peecho07.github.io/JDM-Wash/

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Services | `services.html` |
| Packages | `packages.html` |
| Monthly Plans | `plans.html` |
| About | `about.html` |
| FAQ | `faq.html` |
| Book Same Day | `book.html` (the Book and Join buttons open it with the service already picked) |

## Editing

The pages are generated so the header, footer and icons only exist once:

- `src/layout.html`: head, header, footer, icon set, demo notice
- `src/pages/<page>.html`: the content of each page
- `src/partials/cta.html`: the closing "Book Same Day" section, pulled in with `{{cta}}`

After editing anything in `src/`, run `python3 build.py` and commit the regenerated `.html` files.

## Design system

Minimalist Modern: Electric Blue gradient (`#0052FF` to `#4D7CFF`), Calistoga headlines, Inter body, JetBrains Mono labels. Every color, font, radius, shadow and easing value is a token at the top of `styles.css`; components only use the tokens.

## Brand

`brand/` holds the logo concept: `logo.svg` (light backgrounds), `logo-dark.svg` (dark backgrounds), `logo-mark.svg` (app icon and favicon), PNG exports, and `logo-sheet.png` for presenting it.

Booking form: on Netlify it submits through Netlify Forms. On GitHub Pages (which can't receive form posts) it opens the visitor's email app with the booking details filled in.
