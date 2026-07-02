---
title: Images missing explicit dimensions (SvelteKit)
description: Resolves raw <img> tags in SvelteKit Svelte files missing width and height attributes, which causes layout shift when images load.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found `<img>` tags in `.svelte` files in your SvelteKit project that are missing `width` and `height` attributes. Without them, the browser cannot reserve space in the layout before the image loads, causing content to shift down when the image arrives. This raises your CLS score, which Google uses as a ranking signal.

## How to fix it

**Option 1: Migrate to `<enhanced:img>` (recommended)**

`@sveltejs/enhanced-img` provides a `<enhanced:img>` element that reads image dimensions at build time and sets them automatically. It also generates WebP/AVIF variants and a responsive `srcset`.

Install the package and add the Vite plugin:

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

Then replace raw `<img>` tags. No import is required in the Svelte component:

```svelte
<!-- before -->
<img src="/images/hero.jpg" alt="Hero" />

<!-- after -->
<enhanced:img src="/images/hero.jpg" alt="Hero" />
```

The plugin sets `width` and `height` automatically from the source file.

**Option 2: Add explicit dimensions to the raw `<img>` tag**

If `<enhanced:img>` is not suitable — for example, with dynamic or remote image sources — add `width` and `height` directly:

```svelte
<img
  src="/images/hero.jpg"
  alt="Hero"
  width="1200"
  height="600"
/>
```

Add a global CSS rule so the image still scales responsively:

```css
/* app.css or global styles */
img {
  max-width: 100%;
  height: auto;
}
```

:::note
`<enhanced:img>` only processes static local file paths known at build time. For component props that accept a dynamic image path, add `width` and `height` as required props and pass them through to the underlying `<img>` tag.
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit
```

The "Images missing explicit dimensions" check should pass. In the built HTML, `<enhanced:img>` outputs a `<picture>` element wrapping an `<img>` with explicit `width` and `height` set.

## Related fixes

- [Raw `<img>` tags — SvelteKit](./sveltekit-raw-img-tags)
- [CLS too high](./cls-too-high)
- [LCP too slow](./lcp-too-slow)
