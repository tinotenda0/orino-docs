---
title: Hero image lazy-loaded
description: Resolves a hero or header image marked loading="lazy", which delays the browser from fetching the LCP element.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Orino found an image in a hero or header component file with `loading="lazy"`. Lazy loading is correct for images below the fold, but the opposite of what you want for the largest element on the page. It tells the browser to deprioritise fetching the image until it is near the viewport — which for a hero image is immediately, so the browser wastes time discovering this late. This directly delays LCP.

## How to fix it

### Next.js

Next.js `<Image>` is lazy by default. To make it eager and hint that it is the LCP element, use the `priority` prop. Remove any `loading` prop entirely.

```tsx
import Image from 'next/image'

// before — wrong for a hero image
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} loading="lazy" />

// after
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
```

### Astro

Remove `loading="lazy"` from the `<Image>` component or raw `<img>` tag and add `fetchpriority="high"`.

```astro
---
import { Image } from 'astro:assets'
import heroImage from '../assets/hero.jpg'
---

<!-- before -->
<Image src={heroImage} alt="Hero" loading="lazy" />

<!-- after -->
<Image src={heroImage} alt="Hero" fetchpriority="high" />
```

### SvelteKit

Remove `loading="lazy"` from the `<img>` or `<enhanced:img>` tag and add `fetchpriority="high"`.

```svelte
<!-- before -->
<img src="/hero.jpg" alt="Hero" loading="lazy" width="1200" height="600" />

<!-- after -->
<img src="/hero.jpg" alt="Hero" fetchpriority="high" width="1200" height="600" />
```

### Nuxt

Remove `loading="lazy"` from `<NuxtImg>` and add `fetchpriority="high"` or use the `preload` prop.

```vue
<!-- before -->
<NuxtImg src="/hero.jpg" alt="Hero" loading="lazy" width="1200" height="600" />

<!-- after -->
<NuxtImg src="/hero.jpg" alt="Hero" fetchpriority="high" width="1200" height="600" preload />
```

:::caution
Only apply `priority` or `fetchpriority="high"` to the single LCP image. Marking multiple images as high priority defeats the purpose — the browser can only prioritise one thing at a time.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit --url https://yourdomain.com
```

You can also confirm in Chrome DevTools. In the Network panel, the LCP image should show `Priority: Highest`. In a Lighthouse report, the "Largest Contentful Paint element" entry should no longer show a lazy-load warning.

## Related fixes

- [Hero image missing fetchpriority](./lcp-image-no-fetchpriority)
- [LCP too slow](./lcp-too-slow)
- [Raw `<img>` tags — Next.js](./nextjs-raw-img-tags)
