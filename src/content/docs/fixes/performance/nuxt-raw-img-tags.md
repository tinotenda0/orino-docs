---
title: Raw <img> tags (Nuxt)
description: Resolves raw <img> tags in Nuxt components that bypass automatic format optimisation, lazy loading, and CLS prevention.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found raw `<img>` tags in `.vue` files in your Nuxt project. Nuxt's `<NuxtImg>` component (from `@nuxt/image`) provides automatic WebP and AVIF conversion, responsive `srcset` generation, lazy loading, and enforced dimensions to prevent CLS. Raw `<img>` tags serve the original unoptimised file.

## How to fix it

Install `@nuxt/image` if you have not already, then register it in `nuxt.config.ts`.

```bash
npm install @nuxt/image
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
})
```

Replace raw `<img>` tags with `<NuxtImg>`. The component is globally available after registering the module — no import needed.

```vue
<!-- before -->
<img src="/images/hero.jpg" alt="Hero" />

<!-- after -->
<NuxtImg src="/images/hero.jpg" alt="Hero" width="1200" height="600" />
```

**For images that should be lazy-loaded** (below the fold), `<NuxtImg>` lazy-loads by default. For the hero or LCP image, disable this:

```vue
<NuxtImg
  src="/images/hero.jpg"
  alt="Hero"
  width="1200"
  height="600"
  fetchpriority="high"
  preload
/>
```

**For responsive images** that need different sizes on different screens, use `<NuxtPicture>` which generates a `<picture>` element with multiple sources:

```vue
<NuxtPicture
  src="/images/hero.jpg"
  alt="Hero"
  :width="1200"
  :height="600"
  sizes="sm:100vw md:50vw lg:1200px"
/>
```

:::tip
`@nuxt/image` can serve images from remote providers like Cloudinary, Imgix, or AWS S3 with no extra configuration. Set the `provider` option in `nuxt.config.ts` to route image optimisation through your existing CDN.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit --url https://yourdomain.com
```

The "Raw `<img>` tags" check should pass. In the rendered HTML, `<NuxtImg>` outputs a standard `<img>` with an optimised `/_ipx/` URL.

## Related fixes

- [Nuxt images missing dimensions](./nuxt-image-missing-dimensions)
- [CLS too high](./cls-too-high)
- [LCP too slow](./lcp-too-slow)
