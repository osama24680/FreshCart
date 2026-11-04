# FreshCart

A grocery e-commerce storefront built with Next.js 16, React 19 and TypeScript.

**Live demo:** [fresh-cart-tau-liard.vercel.app](https://fresh-cart-tau-liard.vercel.app)

## Status

FreshCart is in active development. The home page, categories page and 404 page are finished. Login and signup are placeholders, and the shop and brands pages linked from the navbar aren't built yet.

## What's built

- **Home page:** hero carousel, promo cards, shop by category, deal banners with copyable codes, featured products and a newsletter section
- **Categories page:** every category with its product count
- **Responsive navigation:** a category menu and a mobile menu
- **Scroll animations:** a small `Reveal` component that respects the reduced-motion setting

## Technical highlights

- **Server-side caching:** product and category requests use `"use cache"` with `cacheLife("hours")`.
- **Failed requests stay out of the cache:** the cached function throws on an error, and a wrapper outside it returns the fallback.
- **Streaming:** data-dependent sections load inside `Suspense` with a loading state.
- **Slow networks:** `api/setupNetwork.ts` raises Node's connection attempt timeout, because the 250ms default made `fetch` fail with `ETIMEDOUT`.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, tw-animate-css |
| UI | Base UI, Embla Carousel, Lucide icons |
| Data | [Route e-commerce API](https://ecommerce.routemisr.com) |

## Getting started

No environment variables are needed.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
api/          Data fetching services and the API base URL
app/          Routes, layouts and page components (app/_components)
components/   shadcn/ui components
interfaces/   Shared TypeScript interfaces
types/        Shared TypeScript types
lib/          Utilities
```
