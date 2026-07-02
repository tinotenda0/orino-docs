---
title: Page missing Layout and head
description: An Astro page has no Layout import and no head section. It likely has no metadata at all.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The check found an Astro page in `src/pages/` that neither imports a layout component nor contains its own `<head>` section. A page in this state has no title, no description, and no Open Graph tags. The browser tab shows a blank label, and search engines have nothing to work with.

## How to fix it

There are two valid options. Using a layout component is better for most sites because it keeps all metadata logic in one place.

### Option 1: Import and use a layout (recommended)

If your project already has a layout in `src/layouts/`, import it and wrap your page content with it.

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro'
---
<Layout
  title="About | Acme"
  description="Learn about our studio, our approach, and the team behind Acme."
>
  <main>
    <h1>About</h1>
    <p>Page content here.</p>
  </main>
</Layout>
```

If your project has no layout yet, create one. See [Layout missing title](/fixes/metadata/astro-layout-missing-title) for a complete layout template.

### Option 2: Add a head section directly to the page

For pages that intentionally do not use a shared layout (a standalone landing page, an API endpoint HTML shell, or a custom error page), add the full `<!doctype html>` structure directly.

```astro
---
// src/pages/landing.astro
---
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Special Offer | Acme</title>
    <meta name="description" content="Exclusive offer for new clients. Book a consultation this month." />
    <meta property="og:title" content="Special Offer | Acme" />
    <meta property="og:description" content="Exclusive offer for new clients. Book a consultation this month." />
    <meta property="og:image" content="https://example.com/og-offer.png" />
  </head>
  <body>
    <main>Page content</main>
  </body>
</html>
```

:::note
Pages in `src/pages/` that are meant to be API routes or non-HTML responses (like `.json.ts` or `.xml.ts`) will not be flagged by this check, as the check only runs on `.astro` page files.
:::

## Verify the fix

```bash
curl -s https://example.com/about | grep -i '<title'
```

Re-run the audit to confirm the page is no longer flagged:

```bash
npx orino-cli audit
```

## Related fixes

- [Layout missing title](/fixes/metadata/astro-layout-missing-title)
- [Layout missing meta description](/fixes/metadata/astro-layout-missing-description)
- [Title missing](/fixes/metadata/title-missing)
