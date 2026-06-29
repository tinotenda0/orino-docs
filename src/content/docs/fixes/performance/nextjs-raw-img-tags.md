---
title: Raw <img> tags (Next.js)
description: Resolves raw <img> tags in Next.js components that bypass automatic WebP conversion, lazy loading, and CLS prevention.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found raw `<img>` tags in `.tsx` or `.jsx` files in your Next.js project. The `next/image` component provides automatic WebP and AVIF conversion, lazy loading with a blur placeholder, and enforced `width`/`height` to prevent layout shift. Raw `<img>` tags skip all of this and serve unoptimised images at their original file size and format.

## How to fix it

Replace raw `<img>` tags with `<Image>` from `next/image`.

**For local images**, import the file directly. Next.js reads the dimensions at build time so you do not need to specify them.

```tsx
import Image from 'next/image'
import heroImage from '@/assets/hero.jpg'

// before
<img src="/images/hero.jpg" alt="Hero" />

// after
<Image src={heroImage} alt="Hero" />
```

**For remote images**, provide explicit `width` and `height`. You must also add the remote hostname to `remotePatterns` in `next.config.ts`.

```tsx
import Image from 'next/image'

// before
<img src="https://cdn.example.com/hero.jpg" alt="Hero" />

// after
<Image
  src="https://cdn.example.com/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
/>
```

```ts
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
  },
}
export default nextConfig
```

**For images that fill a container**, use the `fill` prop instead of fixed dimensions. The parent element must have `position: relative` and an explicit height.

```tsx
<div style={{ position: 'relative', height: '400px' }}>
  <Image src={heroImage} alt="Hero" fill style={{ objectFit: 'cover' }} />
</div>
```

:::caution
Next.js will warn in development if you use a raw `<img>` tag and suggest switching to `<Image>`. If the warning is being suppressed with an ESLint disable comment, that is the correct signal to do the migration properly.
:::

## Verify the fix

Re-run the audit from your project directory:

```bash
npx orino audit
```

The "Raw `<img>` tags" check should pass. In the browser, inspect the rendered image — it should have a `/_next/image?url=...` src, confirming Next.js is serving an optimised version.

## Related fixes

- [Next.js images missing dimensions](./nextjs-image-missing-dimensions)
- [Hero image lazy-loaded](./lcp-image-lazy-loaded)
- [CLS too high](./cls-too-high)
