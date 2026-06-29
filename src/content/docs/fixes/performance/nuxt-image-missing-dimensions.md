---
title: Images missing explicit dimensions (Nuxt)
description: Resolves raw <img> tags in Nuxt Vue files missing width and height attributes, which causes layout shift when images load.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found raw `<img>` tags in `.vue` files in your Nuxt project that are missing `width` and `height` attributes. Without them, the browser cannot reserve the correct space before the image loads, causing layout shift (CLS). CLS is a Core Web Vitals metric that affects Google ranking.

## How to fix it

**Option 1: Migrate to `<NuxtImg>` (recommended)**

`<NuxtImg>` from `@nuxt/image` requires `width` and `height` and applies them correctly in the output. Install the module if you have not already:

```bash
npm install @nuxt/image
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
})
```

Then replace raw `<img>` tags:

```vue
<!-- before -->
<img src="/images/product.jpg" alt="Product shot" />

<!-- after -->
<NuxtImg src="/images/product.jpg" alt="Product shot" width="800" height="600" />
```

`<NuxtImg>` is globally available after registering the module. No `import` needed in `<script setup>`.

**Option 2: Add explicit dimensions to the raw `<img>` tag**

If `@nuxt/image` is not an option, add `width` and `height` directly to the `<img>` tag:

```vue
<img src="/images/product.jpg" alt="Product shot" width="800" height="600" />
```

Add a global CSS rule to allow responsive scaling without losing the reserved space:

```css
img {
  max-width: 100%;
  height: auto;
}
```

:::tip
`<NuxtPicture>` is an alternative to `<NuxtImg>` that outputs a `<picture>` element with multiple format sources (WebP, AVIF, original). Use it for hero images or any image where format optimisation matters most.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino audit https://yourdomain.com
```

The "Images missing explicit dimensions" check should pass. In the rendered HTML, `<NuxtImg>` outputs a standard `<img>` with explicit `width` and `height` attributes.

## Related fixes

- [Raw `<img>` tags — Nuxt](./nuxt-raw-img-tags)
- [CLS too high](./cls-too-high)
- [LCP too slow](./lcp-too-slow)
