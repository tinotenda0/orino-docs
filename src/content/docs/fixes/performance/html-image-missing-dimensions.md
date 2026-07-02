---
title: Images missing explicit dimensions (HTML)
description: Resolves <img> tags in plain HTML files that lack width and height attributes, causing layout shift when images load.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found `<img>` tags in your HTML files without explicit `width` and `height` attributes. Without them, the browser has no way to know how much vertical space to reserve before the image loads. When the image arrives, it pushes the surrounding content down — this is cumulative layout shift (CLS), which Google measures as a ranking signal.

## How to fix it

Add `width` and `height` attributes to every `<img>` tag. Use the image's intrinsic (actual) pixel dimensions, not the size you want it displayed at. CSS handles the display size separately.

```html
<!-- before -->
<img src="/images/hero.jpg" alt="Office building" />

<!-- after -->
<img src="/images/hero.jpg" alt="Office building" width="1200" height="630" />
```

Pair this with a CSS rule that allows the image to scale responsively while still using the aspect ratio you declared in HTML:

```css
img {
  max-width: 100%;
  height: auto;
}
```

With this combination, the browser reserves the correct space from the intrinsic dimensions, then scales the image to fit its container via CSS. No layout shift occurs.

**Finding the intrinsic dimensions**

If you do not know an image's dimensions:

- Open the file in any image editor or viewer — dimensions are shown in the metadata.
- In the terminal: `file images/hero.jpg` prints the dimensions on most systems.
- In Chrome DevTools: hover the image `src` in the Elements panel and it shows a preview with dimensions.

:::caution
Do not guess the dimensions. If the `width`/`height` values you set do not match the actual image, the browser still reserves space but at the wrong aspect ratio, causing a visible reflow when the image loads. Measure first.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit --url https://yourdomain.com
```

The "Images missing explicit dimensions" check should pass. To confirm CLS is resolved, run a PageSpeed Insights report and look for the CLS score under Core Web Vitals.

## Related fixes

- [CLS too high](./cls-too-high)
- [Images missing explicit dimensions](./image-missing-dimensions)
- [LCP too slow](./lcp-too-slow)
