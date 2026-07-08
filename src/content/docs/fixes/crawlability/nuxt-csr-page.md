---
title: CSR-only Nuxt page
description: "Resolve a Nuxt page that disables SSR with definePageMeta({ ssr: false }), leaving crawlers an empty page."
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

This page calls `definePageMeta({ ssr: false })`, which turns off server-side rendering for the route. Nuxt renders it entirely in the browser instead.

Nuxt is a universal (SSR) framework by default: the server renders the full HTML on the first request, so crawlers and AI systems get real content. With `ssr: false`, the server sends an almost-empty shell and the page only fills in once JavaScript runs. Googlebot can execute JavaScript, but it does so on a delayed second pass and not reliably — and most AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not run JavaScript at all. To them the page looks blank.

## How to fix it

In almost all cases the fix is to remove the `ssr: false` flag so the page renders on the server like the rest of your site.

```vue
<!-- pages/dashboard.vue -->
<script setup>
// Remove this — it disables SSR for the whole route:
// definePageMeta({ ssr: false })
</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <!-- content -->
  </main>
</template>
```

If a specific piece of the page genuinely cannot run on the server (for example, it touches `window` or a browser-only library), keep the page server-rendered and isolate just that part in a `<ClientOnly>` wrapper instead of disabling SSR for the entire route.

```vue
<template>
  <main>
    <h1>Dashboard</h1>
    <p>This heading and copy are server-rendered and indexable.</p>

    <ClientOnly>
      <BrowserOnlyWidget />
      <template #fallback>
        <p>Loading…</p>
      </template>
    </ClientOnly>
  </main>
</template>
```

### Controlling rendering per route

If you need different rendering modes across your site, use `routeRules` in `nuxt.config.ts` rather than scattering `ssr: false` across pages. This keeps public, indexable routes server-rendered while allowing client-only or prerendered behaviour where it makes sense.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },        // static, fully rendered
    '/blog/**': { swr: 3600 },       // server-rendered, cached
    '/app/**': { ssr: false },       // private dashboard — fine to be client-only
  },
})
```

Only disable SSR for routes that are not meant to be indexed (authenticated dashboards, internal tools). Public marketing and content pages should always be server-rendered.

## Verify the fix

Fetch the page and confirm the real content is in the initial HTML, not just a loading shell:

```bash
curl -s https://yourdomain.com/your-page
```

You should see your actual headings and copy in the response body. Then re-run the audit:

```bash
npx orino-cli audit
```

The `nuxt-csr-page` check should now pass.

## Related fixes

- [CSR-only rendering](/fixes/geo-readiness/csr-only-rendering)
- [Nuxt page missing data fetch](/fixes/crawlability/nuxt-missing-page-data)
- [Nuxt page missing head/title](/fixes/metadata/nuxt-page-missing-title)
