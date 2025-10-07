# Quant Invest Wireframes

High-fidelity web wireframes for the Quant Invest crypto investment platform. The prototype is built with plain HTML, CSS, and vanilla JavaScript, styled to mimic native iOS surfaces and interactions.

## Highlights

- 🇨🇳 **Bilingual UI** – instant language switching (English ⇄ 简体中文)
- 📱 **iOS-inspired visuals** – shared design tokens, glassmorphic cards, native checkboxes
- 📊 **Zero-dependency charts** – custom canvas renderer (no `requestAnimationFrame` violations)
- 📂 **Standalone screens** – each route lives in `/screens` for quick iteration
- 🚀 **One-command preview** – lightweight Node server with auto-reload (`npm run dev`)
- 🌐 **GitHub Pages ready** – static workflow configured in `.github/workflows/deploy.yml`

## Quick Start

```bash
npm install
npm run dev
```

The server starts on <http://localhost:8080> and watches for file changes. To skip the watcher, run `npm start` and stop the process manually when you’re done.

### Exploring the Prototype

- The shell (`index.html`) hosts the navigation and iframe router.
- `index-gallery.html` showcases all 15 screens inside iPhone frames.
- Use the language toggle in the sidebar footer to flip locale; the selection persists via `localStorage`.

## Project Structure

```
css/                # Design system, utilities, responsive helpers
js/                 # Data mocks, UI helpers, localisation, charts, iOS utilities
screens/            # Individual HTML screens (loaded inside the iframe shell)
docs/               # Design & development notes
assets/             # Icons and static imagery
server.js           # Minimal static file server used by npm scripts
```

See [`docs/development-notes.md`](docs/development-notes.md) for more detail on modules and workflows.

## iOS Design System

The appearance is driven by:

- `css/theme-ios.css` – tokens, component styling, native checkbox/radio states
- `css/ios-enhancements.css` – motion, skeletons, glassmorphic backdrops
- `js/ios-enhancements.js` – toast notifications, form validation, modal sheet helper

A deeper tour of the available tokens and helpers lives in [`docs/ios-style-guide.md`](docs/ios-style-guide.md).

## Key Screens

1. **Dashboard** – portfolio snapshot, performance chart, strategy cards
2. **Strategy Details** – metrics, drawdown chart, allocation history
3. **Allocate Flow** – three-step investment wizard with validation
4. **Transaction History** – filterable table + slide-over drawer
5. **Settings & Banking** – profile management, security toggles, deposit/withdraw instructions

The gallery route (`index-gallery.html`) presents every screen simultaneously inside device frames for quick reviews.

## Testing Checklist

- Navigate with keyboard (Tab / Shift+Tab / Enter / Escape)
- Toggle language and confirm both shell + screen translation
- Resize between 375 px and 1440 px to verify responsiveness
- Inspect canvas charts (no console violations, period toggles slice data correctly)
- Load the history drawer and allocate wizard end-to-end

## Deployment

The repository already includes a GitHub Actions workflow that publishes the site to GitHub Pages. Push to `main` (or run the workflow manually) and Pages will upload the current static files.

> Publishing from a **private** repository requires a paid GitHub plan (Pro, Team, or Enterprise).

---

Need deeper implementation details? Start with [`docs/development-notes.md`](docs/development-notes.md) and [`docs/ios-style-guide.md`](docs/ios-style-guide.md).
