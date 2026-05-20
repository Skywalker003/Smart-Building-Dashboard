# Smart Building Admin Dashboard

A real-time admin dashboard for managing smart buildings — track asset health, monitor devices, view building locations on a map, and stay on top of product updates, all from one place.

Built as a Frontend Developer Intern assignment using React, plain CSS, and a few carefully chosen libraries. No UI framework, no shortcuts.

---

## What's inside

The dashboard is made up of five widgets, each fetching its own data independently:

**Organization Overview** — A grid of 14 stat cards showing the numbers that matter: buildings, floors, active devices, open work orders, alarms, and an overall health score. The health score card changes color (green / amber / red) based on the actual value, not just a fixed color.

**Building Locations** — An interactive map (Leaflet + OpenStreetMap) showing where each building is. Click a marker and you'll get a popup with the building's name, city, area, floor count, and health score.

**Product Updates** — A simple timeline feed of release notes. Each entry has a version badge and date. Items slide in one by one when the data loads.

**Asset Health Summary** — Building-by-building accordion. Click a building to expand it and see the floor-by-floor breakdown of healthy, warning, and critical assets, plus energy consumption. There's a small proportional bar on each floor row so you can see the ratio at a glance.

**Device Health Analytics** — A stacked bar chart showing how device health trends month over month. This widget intentionally fails on first load to show the error state — just click Retry and the chart loads normally.

---

## How the data works

There's no backend. All data lives in `public/data/` as JSON files and gets fetched at runtime using the native `fetch` API. A shared `useFetch` hook handles the fetch, adds a 1–2 second simulated delay (to show loading states as you'd see in a real app), and returns `{ data, loading, error, retry }` to each widget.

Every widget shows either a skeleton loader or a spinner while waiting. If something goes wrong, there's a proper error state with a Retry button. The Device Analytics widget demonstrates this on purpose.

---

## Getting started

```bash
# Clone the repo and install
npm install

# Start the dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build
```

Node 18+ required.

---

## Project structure

```
smart-building-dashboard/
├── public/
│   └── data/              ← mock API (JSON files served as static assets)
│       ├── overview.json
│       ├── updates.json
│       ├── assetHealth.json
│       ├── buildings.json
│       └── deviceHealth.json
└── src/
    ├── context/
    │   └── DashboardContext.jsx   ← global refresh state (Context API)
    ├── hooks/
    │   └── useFetch.js            ← shared fetch + latency simulation
    ├── components/
    │   ├── common/                ← StatCard, Spinner, SkeletonCard, ErrorState
    │   ├── Overview/
    │   ├── ProductUpdates/
    │   ├── AssetHealth/
    │   ├── BuildingMap/
    │   └── DeviceAnalytics/
    ├── App.jsx                    ← layout + dashboard grid
    └── index.css                  ← design system (CSS custom properties)
```

---

## Tech used

- **React 19 + Vite 8** — component structure and dev tooling
- **Plain CSS** — no Tailwind, no component library; CSS custom properties for theming
- **Recharts** — stacked bar chart for device health trends
- **React-Leaflet + Leaflet** — interactive map with OpenStreetMap tiles
- **React Context API** — global "Refresh All" state wired to the header button

---

## Bonus things that are in there

- Skeleton card loaders with shimmer animation while data loads
- Simulated API failure + Retry on the Device Analytics widget
- "Refresh All" button in the header re-fetches every widget at once via Context
- CSS-only accordion with smooth max-height transition (no library)
- Timeline items slide in with a staggered CSS animation
- ARIA attributes on buttons, alerts, and the map for accessibility
- Responsive down to 320px — header collapses, stat cards wrap, layout stacks to single column

---

## Deployment

The project is Vercel-ready out of the box. Push to GitHub, import in Vercel, and it deploys with zero configuration — Vite is auto-detected.

The build splits vendor libraries (React, Leaflet, Recharts) into separate chunks so returning visitors load only what's changed, not the whole bundle.
