---
title: Raw <img> tags (SvelteKit)
description: Resolves raw <img> tags in SvelteKit components that bypass automatic format optimisation and CLS prevention.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found raw `<img>` tags in `.svelte` files in your SvelteKit project. SvelteKit does not ship a built-in image component, but `@sveltejs/enhanced-img` provides `<enhanced:img>` — a build-time image processor that generates WebP/AVIF variants, creates responsive `srcset`, and adds correct `width`/`height` to prevent CLS.

## How to fix it

Install `@sveltejs/enhanced-img` and add the Vite plugin:

```bash
npm install --save-dev @sveltejs/enhanced-img
```

```ts
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()]
})
```

Replace raw `<img>` tags with `<enhanced:img>`. You do not import anything — the custom element is processed by the plugin at build time. Images must be local files (not remote URLs).

```svelte
<!-- before -->
<img src="/images/hero.jpg" alt="Hero" />

<!-- after -->
<enhanced:img src="/images/hero.jpg" alt="Hero" />
```

The plugin reads the source image dimensions automatically, so you do not need to specify `width` and `height` for local files.

**For the LCP hero image**, add `fetchpriority="high"` and remove any `loading="lazy"`:

```svelte
<enhanced:img
  src="/images/hero.jpg"
  alt="Hero"
  fetchpriority="high"
/>
```

**For remote images** that `<enhanced:img>` cannot process at build time, use a raw `<img>` with explicit dimensions. There is no SvelteKit-native solution for remote image optimisation — route requests through an image CDN or proxy if you need it.

```svelte
<!-- acceptable for remote images — always add explicit dimensions -->
<img
  src="https://cdn.example.com/hero.jpg"
  alt="Hero"
  width="1200"
  height="600"
  loading="lazy"
/>
```

:::note
`<enhanced:img>` only works with static imports or string literals in the `src` attribute. If you are building an image component that accepts a dynamic `src` prop, you will need to pre-process images differently or use an image CDN.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino audit
```

The "Raw `<img>` tags" check should pass. In the built output, `<enhanced:img>` generates a `<picture>` element with WebP and AVIF sources and a fallback `<img>`.

## Related fixes

- [SvelteKit images missing dimensions](./sveltekit-image-missing-dimensions)
- [CLS too high](./cls-too-high)
- [LCP too slow](./lcp-too-slow)
