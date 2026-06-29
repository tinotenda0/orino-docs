---
title: Layout missing title element
description: An Astro layout has no title element. Pages using this layout will have no title tag.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

In Astro, layout files in `src/layouts/` define the `<head>` content shared across pages. The check found a layout file with no `<title>` element. Every page that uses this layout will be missing a title tag, which is the most important on-page SEO element.

## How to fix it

Add a `<title>` element to the layout's `<head>`. Accept the title as a prop so each page can provide a unique value.

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string
  description?: string
}
const { title, description } = Astro.props
---
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </head>
  <body>
    <slot />
  </body>
</html>
```

Pages then pass the title as a prop:

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro'
---
<Layout title="About | Acme" description="Learn about our studio and approach.">
  <main>
    <h1>About</h1>
  </main>
</Layout>
```

:::tip
If you have multiple layouts (for example, a blog layout and a landing page layout), each one needs its own `<title>` element. The check runs against all `.astro` files in the `src/layouts/` directory.
:::

If you want to avoid repeating the brand name on every page, format it inside the layout:

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string
  description?: string
}
const { title, description } = Astro.props
const pageTitle = `${title} | Acme`
---
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{pageTitle}</title>
    {description && <meta name="description" content={description} />}
  </head>
  <body>
    <slot />
  </body>
</html>
```

Pages then only need to pass the short title: `<Layout title="About">`.

## Verify the fix

```bash
curl -s https://example.com | grep -i '<title'
```

Re-run the audit:

```bash
npx orino audit .
```

## Related fixes

- [Layout missing meta description](/fixes/metadata/astro-layout-missing-description)
- [Layout missing og:image](/fixes/metadata/astro-layout-missing-og-image)
- [Page missing Layout and head](/fixes/metadata/astro-page-no-layout)
