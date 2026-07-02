---
title: TTFB slow
description: Resolves a Time to First Byte above 600ms that delays the start of every subsequent load metric including LCP.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

TTFB (Time to First Byte) measures the time from the browser sending a request to receiving the first byte of the HTML response. Google's threshold is ≤600ms. Above 1.8s, it is critical.

TTFB is the foundation of every other performance metric. LCP, CLS, and INP cannot improve beyond what TTFB allows because the browser is waiting for the server before it can do anything. A slow TTFB makes every other fix less effective.

Common causes: uncached dynamic server-side rendering, cold serverless function starts, and slow origin servers with no CDN in front.

## How to fix it

**Use SSG or ISR for pages that can be pre-rendered**

Serving pre-built HTML from a CDN edge node is the most effective TTFB fix. A CDN response is typically 10-50ms versus 200-2000ms for a server-rendered response.

### Next.js

Use `generateStaticParams` for static generation, or ISR with `revalidate` for pages that need periodic updates.

```tsx
// Static generation — best TTFB
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

// ISR — good TTFB after first visit
export const revalidate = 3600 // regenerate at most every hour
```

For the App Router, export `revalidate` from the page segment. For the Pages Router, use `getStaticProps` with `revalidate`.

### Nuxt

Use `routeRules` or per-page `defineRouteRules` to set caching behaviour.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/blog/**': { isr: 3600 }, // ISR: regenerate every hour
    '/':        { prerender: true }, // static
  }
})
```

### Astro

Astro builds to static HTML by default. If you are using SSR with an adapter, switch pages that do not need real-time data to static with `export const prerender = true`.

```astro
---
export const prerender = true
---
```

### SvelteKit

Set `prerender = true` in `+page.server.ts` for pages that can be static, or use `cache-control` headers from the server for SSR pages.

```ts
// +page.server.ts
export const prerender = true
```

**Add caching headers to SSR responses**

If a page must be server-rendered dynamically, CDN caching with short TTLs still helps. Return `Cache-Control: s-maxage=60, stale-while-revalidate=600` so the CDN serves cached HTML for 60 seconds and revalidates in the background.

**Use edge functions for dynamic content**

Running server logic at CDN edge nodes rather than a single origin region reduces network latency for global visitors. Vercel Edge Functions, Cloudflare Workers, and Netlify Edge Functions all run closer to users than a centralised server.

:::tip
The Vercel Speed Insights tab shows TTFB broken down by region. If one region is slow, you are likely routing requests to a distant origin.
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit --url https://yourdomain.com
```

You can also check TTFB from your browser: in DevTools Network panel, click on the HTML document request and look at the Timing tab. "Waiting (TTFB)" should be under 600ms.

## Related fixes

- [LCP too slow](./lcp-too-slow)
- [LCP image lazy-loaded](./lcp-image-lazy-loaded)
- [CLS too high](./cls-too-high)
