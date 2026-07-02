---
title: Images missing explicit dimensions (Next.js)
description: Resolves Next.js <Image> or <img> tags missing width and height, which causes layout shift and CLS score degradation.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found images in your Next.js project — either `<Image>` from `next/image` or raw `<img>` tags — missing `width` or `height` attributes. Without dimensions, the browser cannot reserve space before the image loads, so the layout shifts when the image arrives. This raises your CLS score and harms Core Web Vitals ranking.

## How to fix it

### `<Image>` from next/image

Next.js requires `width` and `height` on `<Image>` unless you use the `fill` prop. If you see a runtime error or this check fires, you are likely missing one or both.

**For local images, use a static import.** Next.js reads the dimensions from the file at build time — you do not need to provide them manually.

```tsx
import Image from 'next/image'
import heroImage from '@/assets/hero.jpg'

// next/image infers width and height from the import
<Image src={heroImage} alt="Hero" />
```

**For remote images**, provide explicit dimensions:

```tsx
import Image from 'next/image'

<Image
  src="https://cdn.example.com/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
/>
```

**For images that fill their container**, use `fill` with a positioned parent instead of fixed dimensions:

```tsx
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src={heroImage}
    alt="Hero"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>
```

### Raw `<img>` tags

If you have raw `<img>` tags in your Next.js project, the better fix is to migrate to `<Image>`. If you must keep a raw `<img>`, add explicit `width` and `height` attributes.

```tsx
<!-- before -->
<img src="/images/team.jpg" alt="Team photo" />

<!-- after -->
<img src="/images/team.jpg" alt="Team photo" width={800} height={500} />
```

See [raw `<img>` tags in Next.js](./nextjs-raw-img-tags) for the full migration guide.

:::note
When using a static import with `<Image>`, the TypeScript types and runtime both validate that dimensions are available. This is the safest approach because it fails at build time if the image file is missing rather than silently shipping broken markup.
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit
```

The "Images missing explicit dimensions" check should pass. In the browser, inspect the rendered `<img>` element — it should have explicit `width` and `height` attributes set by Next.js.

## Related fixes

- [Raw `<img>` tags — Next.js](./nextjs-raw-img-tags)
- [Hero image lazy-loaded](./lcp-image-lazy-loaded)
- [CLS too high](./cls-too-high)
