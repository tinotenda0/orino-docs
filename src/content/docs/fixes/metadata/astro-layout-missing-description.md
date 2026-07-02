---
title: Layout missing meta description
description: An Astro layout has no meta description. Pages using this layout will have no description tag.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The check found an Astro layout file in `src/layouts/` with no `<meta name="description">` tag. Every page that uses this layout will be missing a description, so Google will generate its own snippet from the page body with unpredictable results.

## How to fix it

Add a `description` prop to the layout and render it as a `<meta name="description">` tag in the `<head>`.

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string
  description: string
}
const { title, description } = Astro.props
---
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

Pass a unique description from each page:

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
  </main>
</Layout>
```

:::caution
Do not mark `description` as optional in the interface if you want Astro to enforce it at build time. Leaving it optional means pages can accidentally omit it without causing a type error.
:::

If you prefer a fallback for pages that do not provide a description:

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string
  description?: string
}
const {
  title,
  description = 'Acme - Architecture and interior design across London and the South East.',
} = Astro.props
---
<!doctype html>
<html lang="en-GB">
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

The default description covers pages that do not provide one, but per-page descriptions are always better for SEO.

## Verify the fix

```bash
curl -s https://example.com/about | grep -i 'meta name.*description'
```

Re-run the audit:

```bash
npx orino-cli audit
```

## Related fixes

- [Layout missing title](/fixes/metadata/astro-layout-missing-title)
- [Layout missing og:image](/fixes/metadata/astro-layout-missing-og-image)
- [Meta description missing](/fixes/metadata/description-missing)
