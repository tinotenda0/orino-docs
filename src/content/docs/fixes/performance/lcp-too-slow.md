---
title: LCP too slow
description: Resolves a Largest Contentful Paint time above the 2.5s threshold, which harms Google ranking and increases mobile abandonment.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

LCP (Largest Contentful Paint) measures how long it takes for the largest visible element — usually a hero image or a large heading — to finish rendering. Google's threshold is ≤2.5s on mobile. Above 4s, roughly 35% of mobile visitors abandon the page before it finishes loading.

LCP is the primary Core Web Vital that Google uses to assess page experience. A slow LCP on a well-ranked page is an active drag on its position.

## How to fix it

LCP is the end result of several compounding delays. Work through them in this order:

**1. Fix the LCP image itself**

If the LCP element is an image, it should have `fetchpriority="high"` and no `loading="lazy"`. These two issues have their own fix pages:

- [Hero image lazy-loaded](./lcp-image-lazy-loaded)
- [Hero image missing fetchpriority](./lcp-image-no-fetchpriority)

**2. Reduce TTFB**

LCP cannot start until the HTML arrives. If TTFB is above 600ms, fix that first — it compresses every other metric. See [TTFB slow](./ttfb-slow).

**3. Serve modern image formats**

WebP and AVIF are typically 30-50% smaller than JPEG at equivalent quality. Using your framework's image component handles this automatically:

- Next.js: `<Image>` from `next/image`
- Astro: `<Image>` from `astro:assets`
- Nuxt: `<NuxtImg>` from `@nuxt/image`
- SvelteKit: `<enhanced:img>` from `@sveltejs/enhanced-img`

**4. Preload critical resources**

If the LCP element depends on a font or CSS that is not immediately available, add a `<link rel="preload">` for it in `<head>`.

```html
<link rel="preload" as="image" href="/hero.jpg" fetchpriority="high" />
```

**5. Move from client-side rendering to SSG or SSR**

A page that renders entirely in the browser cannot show its LCP element until JavaScript has downloaded, parsed, and executed. Switch to static generation or server-side rendering so the HTML already contains the LCP element.

:::danger
Running a single-page application with a blank `<div id="root">` as the HTML payload is the single fastest way to guarantee a slow LCP on mobile. No amount of image optimisation fixes this.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit --url https://yourdomain.com
```

Or run a Lighthouse report on mobile. The LCP element is identified in the report under "Diagnostics" so you can confirm you are optimising the right element.

## Related fixes

- [Hero image lazy-loaded](./lcp-image-lazy-loaded)
- [Hero image missing fetchpriority](./lcp-image-no-fetchpriority)
- [TTFB slow](./ttfb-slow)
- [CLS too high](./cls-too-high)
