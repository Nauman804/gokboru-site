# GOKBORU — Time Beyond Perfection

A premium, single-page website for **GOKBORU Meridian 01** — a limited-edition watch collection (100 pieces). Built with plain HTML, CSS, and JavaScript — no framework, no build step.

**Live site:** https://nauman804.github.io/gokboru-site/

---

## Features

- **Scroll-driven frame animation** — a 192-frame image sequence rendered on `<canvas>`, synced to scroll position for a cinematic, video-like hero section without loading an actual video file
- **Watch carousel** — center-focus product carousel built on native CSS scroll-snap, with sharp/blur focus transitions
- **Product grid** — click-to-expand lightbox for full-size product viewing
- **Performance section** — click-to-focus cards with custom SVG data visualizations (line chart, radial gauge, area chart)
- **Micro-interactions** — magnetic buttons, custom growing cursor, 3D mouse-tilt on product imagery, text-scramble labels, animated number counters
- **Fully responsive** — animated mobile menu, touch-friendly carousel, adapted layouts for phone/tablet/desktop
- **Accessibility-aware** — respects `prefers-reduced-motion`; all interactive elements are keyboard/focus friendly
- **Business-ready extras** — SEO meta tags, Open Graph tags, favicon set, `sitemap.xml` / `robots.txt`, legal pages (Privacy, Terms, Shipping & Returns), custom 404 page, WhatsApp chat button, cookie consent banner, working contact form

## Tech stack

- HTML5, CSS3 (no framework)
- Vanilla JavaScript (no dependencies)
- Google Fonts — Playfair Display, DM Mono, Inter

## Project structure

```
├── index.html          Main page
├── styles.css           All styles
├── script.js             All interactivity
├── privacy.html          Privacy Policy
├── terms.html            Terms of Service
├── shipping.html         Shipping & Returns
├── 404.html              Custom error page
├── favicon.ico / favicon-16.png / favicon-32.png
├── apple-touch-icon.png / icon-512.png
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── frames/               192 sequence images for the scroll animation
└── watches/              Product photography (carousel cutouts + card crops)
```

## Running locally

No build step — just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Deployment

Currently deployed for free on **GitHub Pages**. To deploy your own copy:

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Set branch to `main`, folder to `/root`
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`

## Configuration notes

Before going live with real orders, update:

- `index.html` → replace the WhatsApp number placeholder (`923000000000`) with your real number
- `index.html` → replace the Formspree endpoint (`YOUR_FORM_ID`) with your own form ID from [formspree.io](https://formspree.io)
- Head section → uncomment and add your Google Analytics Measurement ID if you want traffic tracking

## License

All content (photography, copy, design) is proprietary to GOKBORU Horlogerie.
