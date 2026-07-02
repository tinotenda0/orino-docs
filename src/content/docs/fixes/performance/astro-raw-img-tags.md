---
title: Raw <img> tags (Astro)
description: Resolves raw <img> tags in Astro components that bypass automatic format optimisation and CLS prevention.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found raw `<img>` tags in `.astro` files. Astro's `<Image>` component from `astro:assets` automatically converts images to WebP or AVIF, generates correct `width` and `height` attributes to prevent CLS, and optimises file size at build time. Raw `<img>` tags skip all of that.

## How to fix it

Replace raw `<img>` tags with `<Image>` from `astro:assets`.

**For local images** (files in your `src/` directory), pass the imported image directly. Astro reads the dimensions automatically.

```astro
---
import { Image } from 'astro:assets'
import heroImage from '../assets/hero.jpg'
---

<!-- before -->
<img src="/images/hero.jpg" alt="Hero image" />

<!-- after -->
<Image src={heroImage} alt="Hero image" />
```

**For remote images**, you must provide `width` and `height` explicitly because Astro cannot inspect remote files at build time.

```astro
---
import { Image } from 'astro:assets'
---

<!-- before -->
<img src="https://cdn.example.com/hero.jpg" alt="Hero" />

<!-- after -->
<Image
  src="https://cdn.example.com/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
/>
```

**For images in `public/`**, use a raw `<img>` with explicit dimensions. The `<Image>` component does not process files from `public/` — move the file to `src/assets/` if you want optimisation.

```astro
<!-- public/ image — raw <img> is acceptable here, but add dimensions -->
<img src="/og-image.png" alt="Open Graph" width="1200" height="630" />
```

:::tip
For decorative images that do not need SEO value or optimisation — tiny icons, inline SVGs, tracking pixels — a raw `<img>` is acceptable. The `<Image>` component is most valuable for hero images, article thumbnails, and anything above the fold.
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit
```

The "Raw `<img>` tags" check should pass. You can also inspect the built HTML: optimised images will have `.webp` or `.avif` extensions and explicit `width`/`height` attributes.

## Related fixes

- [Astro images missing dimensions](./astro-image-missing-dimensions)
- [CLS too high](./cls-too-high)
- [LCP too slow](./lcp-too-slow)
