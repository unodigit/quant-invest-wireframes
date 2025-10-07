# Development Notes

This document outlines how the wireframe prototype is organised and how to work with it when adding or updating screens.

## Project Layout

```
wireframes/
├── index.html            # Main shell with sidebar navigation iframe
├── index-gallery.html    # Static gallery showing every screen in iPhone frames
├── css/                  # Design system and component styles
├── js/                   # Data, UI helpers, interactions, i18n, charts
├── screens/              # Stand-alone HTML files for each screen
├── assets/               # Icons and static imagery
└── server.js             # Tiny static server for local development
```

### Key Modules

| File | Responsibility |
| --- | --- |
| `js/data.js` | Mock data set for users, portfolios, strategies, transactions |
| `js/ui.js` | Reusable HTML snippets (stat cards, tables, modals) |
| `js/i18n.js` | Two-language dictionary + helpers (`t`, `navigateTo`) |
| `js/interactions.js` | Global event handlers and navigation glue |
| `js/charts.js` | Canvas renderer for performance/drawdown charts |
| `js/gallery.js` | Renders the 15-screen device wall in `index-gallery.html` |
| `js/ios-enhancements.js` | Toasts, iOS-style form validation, modal sheet helper |

## Running the Prototype

```bash
npm install
npm run dev   # watches for changes and restarts the static server
# or
npm start     # single-run server.js on port 8080
```

Visit http://localhost:8080/ and the app loads inside `index.html`. The language toggle persists via `localStorage` so the chosen locale survives reloads.

## Adding Screens

1. Copy an existing screen (e.g. `screens/settings.html`) as a starting point.
2. Update content within the `.bg-white` card wrapper.
3. Link to assets using relative paths (`../assets/...`).
4. Import any required modules via `<script type="module">…` at the bottom of the file.
5. Add a navigation link by editing the `routeMap` in `index.html`.

For the gallery view, add the new screen to `ALL_SCREENS` in `js/gallery.js`.

## Localisation

Locale strings live in `js/i18n.js`. To add a new key:

```javascript
export const translations = {
  en: { 'dashboard.title': 'Dashboard' },
  zh: { 'dashboard.title': '仪表板' }
};
```

Call `t('dashboard.title')` from HTML or JS. The language toggle triggers a `languagechange` event so screens can refresh themselves when needed.

## Testing & QA

Manual smoke tests:

- Verify hash routing updates the iframe source.
- Toggle language and confirm both the shell and loaded screen translate.
- Resize between 375px and 1440px to validate responsive layouts.
- Run through the allocate funds flow to confirm multi-step navigation.
- Open the gallery to ensure all iframes load without console warnings.

Accessibility checks:

- Navigate forms using the keyboard (Tab/Shift+Tab/Enter/Escape).
- Inspect focus rings and colour contrast (WCAG AA or better).
- Toggle `prefers-reduced-motion` in dev tools to ensure animations respect the setting.

With these patterns the prototype stays maintainable while still feeling true to the native iOS experience.
