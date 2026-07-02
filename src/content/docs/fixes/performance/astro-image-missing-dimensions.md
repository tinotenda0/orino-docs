---
title: Images missing explicit dimensions (Astro)
description: Resolves raw <img> tags in Astro files missing width and height attributes, which causes layout shift when images load.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found raw `<img>` tags in `.astro` files missing `width` and `height` attributes. Without dimensions, the browser cannot reserve space before the image loads and the surrounding layout shifts when the image arrives. This increases your CLS score, which Google measures as a ranking signal.

Astro's `<Image>` component from `astro:assets` sets correct dimensions automatically for local images. The presence of raw `<img>` tags usually means either the component migration has not been completed, or remote images have been added without dimension attributes.

## How to fix it

**Option 1: Migrate to `<Image>` from `astro:assets` (recommended)**

For local images (files in `src/`), `<Image>` reads dimensions from the file at build time.

```astro
---
import { Image } from 'astro:assets'
import teamPhoto from '../assets/team.jpg'
---

<!-- before -->
<img src="/images/team.jpg" alt="Our team" />

<!-- after -->
<Image src={teamPhoto} alt="Our team" />
```

For remote images, provide `width` and `height` explicitly:

```astro
---
import { Image } from 'astro:assets'
---

<Image
  src="https://cdn.example.com/team.jpg"
  alt="Our team"
  width={800}
  height={500}
/>
```

**Option 2: Add explicit dimensions to the raw `<img>` tag**

If you cannot migrate to `<Image>` — for example, images in `public/` or generated at runtime — add `width` and `height` directly:

```astro
<!-- acceptable when <Image> is not an option -->
<img src="/og-image.png" alt="Open Graph image" width="1200" height="630" />
```

Pair with CSS to allow responsive scaling:

```css
img {
  max-width: 100%;
  height: auto;
}
```

:::caution
Images from the `public/` directory are not processed by `<Image>`. You must add dimensions manually to any `<img>` pointing to a `public/` file.
:::

## Verify the fix

Re-run the audit from your project root:

```bash
npx orino-cli audit
```

The "Images missing explicit dimensions" check should pass. To confirm, inspect the built HTML — `<Image>` outputs `width` and `height` attributes matching the source image dimensions.

## Related fixes

- [Raw `<img>` tags — Astro](./astro-raw-img-tags)
- [CLS too high](./cls-too-high)
- [LCP too slow](./lcp-too-slow)
