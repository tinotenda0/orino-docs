---
title: Layout missing og:image
description: An Astro layout has no og:image meta tag. Social shares using this layout will show no preview image.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The check found an Astro layout file in `src/layouts/` with no `<meta property="og:image">` tag. Pages using this layout will produce social share cards with no image on LinkedIn, Slack, Discord, Twitter/X, and iMessage.

## How to fix it

Add an `ogImage` prop to the layout and render it as an absolute HTTPS URL in `og:image`. Use `Astro.site` to resolve relative image paths to absolute URLs. This requires `site` to be set in `astro.config.mjs`.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://example.com',
})
```

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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={Astro.url.href} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

The default `ogImage = '/og.png'` means all pages get the global OG image unless they pass their own. Pages with a specific image can override it:

```astro
---
// src/pages/case-study/riverside-project.astro
import Layout from '../layouts/Layout.astro'
---
<Layout
  title="Riverside Project | Acme"
  description="A riverside residential project in Richmond, combining contemporary materials with Victorian proportions."
  ogImage="/images/og-riverside.png"
>
  <article>...</article>
</Layout>
```

:::tip
The standard OG image size is 1200x630 pixels. For a quick start, a single branded image with your logo and site name covers every page. Per-page images improve click-through on shared links but are not required for the check to pass.
:::

:::caution
If you hardcode a relative path like `/og.png` without `Astro.site` configured, the `new URL()` call will throw an error at build time. Set `site` in `astro.config.mjs` before using `Astro.site`.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -i 'og:image'
```

Confirm the `content` attribute starts with `https://`. Re-run the audit:

```bash
npx orino-cli audit
```

## Related fixes

- [Layout missing title](/fixes/metadata/astro-layout-missing-title)
- [Layout missing meta description](/fixes/metadata/astro-layout-missing-description)
- [og:image relative URL](/fixes/metadata/og-image-relative-url)
