---
title: Hero image missing fetchpriority
description: Resolves a hero or header image that lacks a priority hint, causing the browser to fetch it later than necessary and delaying LCP.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found an image in a hero or header component file that has no `fetchpriority="high"` attribute (or `priority` prop in Next.js). Without a priority hint, the browser treats the image as a normal-priority resource and may fetch stylesheets, fonts, or other images first. For the element that will become the LCP, that delay is unnecessary and costs real time.

## How to fix it

### Next.js

Add the `priority` prop to `<Image>`. This sets `fetchpriority="high"` and disables lazy loading.

```tsx
import Image from 'next/image'

// before
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} />

// after
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
```

### Astro

Add `fetchpriority="high"` to the `<Image>` component. Astro passes HTML attributes through.

```astro
---
import { Image } from 'astro:assets'
import heroImage from '../assets/hero.jpg'
---

<!-- before -->
<Image src={heroImage} alt="Hero" />

<!-- after -->
<Image src={heroImage} alt="Hero" fetchpriority="high" />
```

### SvelteKit

Add `fetchpriority="high"` to the `<img>` or `<enhanced:img>` tag.

```svelte
<!-- before -->
<img src="/hero.jpg" alt="Hero" width="1200" height="600" />

<!-- after -->
<img src="/hero.jpg" alt="Hero" fetchpriority="high" width="1200" height="600" />
```

### Nuxt

Add `fetchpriority="high"` to `<NuxtImg>`. You can also set `preload` to inject a `<link rel="preload">` in the document `<head>`.

```vue
<!-- before -->
<NuxtImg src="/hero.jpg" alt="Hero" width="1200" height="600" />

<!-- after -->
<NuxtImg src="/hero.jpg" alt="Hero" fetchpriority="high" width="1200" height="600" preload />
```

:::tip
If you have a `<link rel="preload">` for the hero image in your `<head>`, that also tells the browser to fetch it early. Using both `fetchpriority="high"` on the element and a preload link is the most aggressive approach, and appropriate for the LCP image.
:::

:::caution
Mark only one image per page as high priority. If you mark multiple images, the browser cannot distinguish which matters most and you get no benefit.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino audit https://yourdomain.com
```

In Chrome DevTools Network panel, find the hero image request. The Priority column should show "Highest".

## Related fixes

- [Hero image lazy-loaded](./lcp-image-lazy-loaded)
- [LCP too slow](./lcp-too-slow)
- [Raw `<img>` tags — Next.js](./nextjs-raw-img-tags)
