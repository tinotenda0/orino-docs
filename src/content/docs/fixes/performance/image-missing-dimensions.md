---
title: Images missing explicit dimensions
description: Resolves images without width and height attributes that cause the browser to shift layout when they load, increasing CLS.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found images without explicit `width` and `height` attributes. The browser needs these values to calculate the image's aspect ratio and reserve space in the layout before the image loads. Without them, the surrounding content shifts down when the image arrives — this is cumulative layout shift (CLS), a Core Web Vitals metric and Google ranking signal.

This is a generic version of the check. For framework-specific instructions, see the related fixes below.

## How to fix it

The fix is the same regardless of framework: every `<img>` tag needs both `width` and `height` attributes that match the image's intrinsic dimensions.

```html
<!-- before -->
<img src="/hero.jpg" alt="Hero" />

<!-- after -->
<img src="/hero.jpg" alt="Hero" width="1200" height="600" />
```

You do not need to display the image at those exact dimensions — CSS controls the rendered size. The browser only needs the ratio.

```css
/* Scale the image responsively while preserving the reserved space */
img {
  max-width: 100%;
  height: auto;
}
```

With `height: auto` in CSS and explicit `width`/`height` in HTML, the browser calculates the aspect ratio from the HTML attributes and reserves the correct space before the image loads, then scales the image with CSS.

:::tip
The framework image components (next/image, astro:assets, @nuxt/image, @sveltejs/enhanced-img) set correct dimensions automatically. Migrating from raw `<img>` to the framework component is the most robust fix because dimensions are enforced at compile time.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit --url https://yourdomain.com
```

The "Images missing explicit dimensions" check should pass. You can confirm in Chrome DevTools: in the Performance panel, record a page load and look for "Layout Shift" events. If images are the cause, they will appear highlighted on the page.

## Related fixes

- [CLS too high](./cls-too-high)
- [Next.js images missing dimensions](./nextjs-image-missing-dimensions)
- [Astro images missing dimensions](./astro-image-missing-dimensions)
- [Nuxt images missing dimensions](./nuxt-image-missing-dimensions)
