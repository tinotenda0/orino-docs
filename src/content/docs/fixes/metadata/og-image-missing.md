---
title: og:image missing
description: No og:image meta tag was found. Social shares will show no preview image.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

An `og:image` tells social platforms which image to use when someone shares your URL. Without it, shares on LinkedIn, Slack, Discord, Twitter/X, and iMessage display a blank card with no image. Posts with images get significantly more engagement than text-only links, so a missing `og:image` has a measurable impact on the reach of any shared link.

## How to fix it

Create a social preview image (1200x630px is the standard size) and add it to your site. Then add `<meta property="og:image" content="https://your-domain.com/og.png" />` to every page `<head>`.

The URL in `og:image` must be absolute, starting with `https://`. A relative path like `/og.png` will not work on social platforms.

:::tip
You only need one OG image to start. A single branded image with your site name and logo covers most cases. Per-page dynamic OG images are useful later, but not required to pass this check.
:::

### Plain HTML

```html
<head>
  <meta property="og:image" content="https://example.com/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Acme - Architecture and Interior Design" />
</head>
```

For framework-specific implementations, see the relevant fix pages below. All frameworks require the same absolute URL pattern.

:::caution
If you are using a framework like Next.js, Nuxt, or Astro, ensure your site's base URL is configured so that relative image paths get resolved to absolute URLs. See [og:image relative URL](/fixes/metadata/og-image-relative-url) for details on that specific problem.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -i 'og:image'
```

The output should contain a `content` attribute with a full `https://` URL. You can also test the preview using the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or paste the URL into a Slack message to see the card.

Re-run the audit:

```bash
npx @bynaree/orino audit --url https://example.com
```

## Related fixes

- [og:image relative URL](/fixes/metadata/og-image-relative-url)
- [og:title missing](/fixes/metadata/og-title-missing)
- [og:description missing](/fixes/metadata/og-description-missing)
- [metadataBase not configured](/fixes/metadata/nextjs-metadata-base-missing)
