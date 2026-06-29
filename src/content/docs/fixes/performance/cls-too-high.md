---
title: CLS too high
description: Resolves a Cumulative Layout Shift score above the 0.1 threshold that causes visible content jumps and harms Core Web Vitals ranking.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

CLS (Cumulative Layout Shift) measures how much the page layout moves unexpectedly while loading. Google's passing threshold is 0.1. Above that, users see content jump — buttons shift away before they can tap them, text they were reading moves mid-sentence. Google uses CLS as a ranking signal and it directly affects user experience on mobile.

This score comes from PageSpeed Insights, measured on mobile conditions.

## How to fix it

The most common cause is images without explicit `width` and `height` attributes. Without them, the browser cannot reserve space before the image loads and surrounding content shifts down when the image arrives. Fix that first — see [images missing explicit dimensions](./image-missing-dimensions) for the steps.

Other causes, in order of frequency:

**Web fonts loading late**

Text rendered in a fallback font shifts when the custom font loads. Set `font-display: swap` or `font-display: optional` in your `@font-face` declarations so the browser commits to the fallback immediately rather than waiting.

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}
```

**Dynamically injected content**

Cookie banners, chat widgets, and notifications that appear after the initial render push content down. Reserve space for them with a container that has an explicit minimum height, so the layout does not change when they load.

**Animations targeting layout properties**

Animating `top`, `left`, `width`, or `height` triggers layout recalculation and contributes to CLS. Use `transform: translate()` or `opacity` instead — they run on the compositor and do not affect layout.

:::caution
Ad units are a common source of unexpected CLS. Ads often load with different heights on each request. Set a fixed `min-height` on the ad container to match your largest expected ad size.
:::

## Verify the fix

Re-run the audit to get a fresh PSI measurement:

```bash
npx orino audit https://yourdomain.com
```

A CLS score of ≤0.1 passes. If you want to diagnose which elements are shifting, open Chrome DevTools, go to Performance, record a page load, and look for the "Layout Shift" entries in the Experience lane.

## Related fixes

- [Images missing explicit dimensions](./image-missing-dimensions)
- [LCP too slow](./lcp-too-slow)
- [TTFB slow](./ttfb-slow)
