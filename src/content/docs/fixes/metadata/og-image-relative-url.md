---
title: og:image relative URL
description: The og:image value is a relative URL. Social platforms require an absolute URL starting with https://.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

The check detected one of three problems with `og:image`:

1. The value is a relative path like `/og.png` instead of `https://example.com/og.png`
2. The value uses `http://` instead of `https://`
3. No `og:image` tag is present at all

LinkedIn, Slack, Discord, Twitter/X, and all other social platforms fetch OG images from the URL in the `content` attribute. A relative path has no meaning to an external server. An HTTP URL may be blocked. In either case, the social card renders with no image.

## How to fix it

The `og:image` value must be a full, absolute HTTPS URL.

```html
<!-- Wrong -->
<meta property="og:image" content="/og.png" />
<meta property="og:image" content="http://example.com/og.png" />

<!-- Correct -->
<meta property="og:image" content="https://example.com/og.png" />
```

### Next.js App Router

The most common cause in App Router is a missing `metadataBase`. Without it, Next.js resolves image paths relative to nothing, and `og:image` ends up as a relative URL in the rendered HTML.

```tsx
// app/layout.tsx
export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'My Site',
  openGraph: {
    images: [{ url: '/og.png' }],
    // With metadataBase set, /og.png resolves to https://example.com/og.png
  },
}
```

See [metadataBase not configured](/fixes/metadata/nextjs-metadata-base-missing) for more detail.

### Next.js Pages Router

Hardcode the full URL in your `<Head>`, or construct it from an environment variable.

```tsx
import Head from 'next/head'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:image" content={`${BASE_URL}/og.png`} />
      </Head>
      <main>Content</main>
    </>
  )
}
```

### SvelteKit

```svelte
<script>
  const baseUrl = 'https://example.com'
</script>

<svelte:head>
  <meta property="og:image" content="{baseUrl}/og.png" />
</svelte:head>
```

Or use the `$env` module for public environment variables:

```svelte
<script>
  import { PUBLIC_BASE_URL } from '$env/static/public'
</script>

<svelte:head>
  <meta property="og:image" content="{PUBLIC_BASE_URL}/og.png" />
</svelte:head>
```

### Nuxt

```vue
<script setup>
const config = useRuntimeConfig()

useSeoMeta({
  ogImage: `${config.public.siteUrl}/og.png`,
})
</script>
```

Configure `siteUrl` in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://example.com',
    },
  },
})
```

### Astro

Use `Astro.site` to build an absolute URL from a relative path.

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string
  description: string
  ogImage?: string
}
const { title, description, ogImage = '/og.png' } = Astro.props
const ogImageUrl = new URL(ogImage, Astro.site).toString()
---
<!doctype html>
<html lang="en-GB">
  <head>
    <title>{title}</title>
    <meta property="og:image" content={ogImageUrl} />
  </head>
  <body><slot /></body>
</html>
```

Set `site` in `astro.config.mjs` for `Astro.site` to work:

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://example.com',
})
```

## Verify the fix

```bash
curl -s https://example.com | grep -i 'og:image'
```

Confirm the `content` attribute starts with `https://`. Re-run the audit:

```bash
npx @bynaree/orino audit --url https://example.com
```

## Related fixes

- [og:image missing](/fixes/metadata/og-image-missing)
- [metadataBase not configured](/fixes/metadata/nextjs-metadata-base-missing)
- [og:title missing](/fixes/metadata/og-title-missing)
