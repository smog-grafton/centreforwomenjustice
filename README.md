# Centre for Women Justice Uganda (CWJU) — Website

Public website for [Centre for Women Justice Uganda](https://CWJU.org), built with **Next.js** (App Router) and powered by a **Laravel** backend API.

## Stack

- **Framework:** Next.js 15+ (React)
- **Backend API:** Laravel (separate repo; production at [portal.centreforwomenjustice.org](https://portal.centreforwomenjustice.org/))
- **Deployment:** Optimized for [Vercel](https://vercel.com)

## Setup

### Prerequisites

- Node.js 18+
- Access to the Laravel API (local or production)

### Install

```bash
npm install
```

### Environment

Copy the example env and set your API URL:

```bash
cp .env.example .env
```

Edit `.env` and set:

- **`NEXT_PUBLIC_API_URL`** — Base URL of the Laravel API (no trailing slash).
  - **Local:** `http://127.0.0.1:8000` (or your local backend URL)
  - **Production (Vercel):** `https://portal.centreforwomenjustice.org`

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Ensure the Laravel backend is running and reachable at the URL set in `NEXT_PUBLIC_API_URL`.

### Build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com).
2. In the project **Environment Variables**, add:
   - **`NEXT_PUBLIC_API_URL`** = `https://portal.centreforwomenjustice.org` (or your production API URL).
3. Deploy. The app uses the env var for all API requests; no hardcoded backend URL in production.

## Project structure

- `app/` — Next.js App Router pages and layouts
- `components/` — React components (layout, sections, cards, UI)
- `lib/` — API clients and shared utilities; `lib/env.ts` centralizes the API base URL from env
- `public/` — Static assets (images, logos, favicon)

## License

MIT (see [LICENSE](LICENSE) if present).
