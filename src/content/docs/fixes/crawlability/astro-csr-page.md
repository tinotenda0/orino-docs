---
title: CSR-only Astro page
description: Fix Astro pages that use client:only without any server-rendered content.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

An Astro page where all meaningful content is inside a `client:only` component sends an empty HTML body to crawlers. Googlebot and AI crawlers receive no headings, no paragraphs, and nothing to index. The page does not appear in search results.

## How to fix it

The correct fix is to add server-rendered content alongside the client component. Astro renders its own template on the server — the problem is when the template contains nothing but `client:only` components.

```astro
---
// src/pages/dashboard.astro — before
import Chart from '../components/Chart.jsx'
---

<html lang="en">
  <body>
    <Chart client:only="react" />
  </body>
</html>
```

```astro
---
// src/pages/dashboard.astro — after
import Chart from '../components/Chart.jsx'
---

<html lang="en">
  <head>
    <title>Analytics Dashboard</title>
  </head>
  <body>
    <h1>Analytics Dashboard</h1>
    <p>Your traffic overview for the last 30 days.</p>
    <Chart client:load />
  </body>
</html>
```

If the component genuinely needs `client:only`, provide a fallback slot that renders in the server HTML.

```astro
<Chart client:only="react">
  <p slot="fallback">Loading chart...</p>
</Chart>
```

:::danger
`client:only` sends zero HTML in the server response. Do not use it on content that needs to be indexed. Reserve it for authenticated or purely interactive widgets with no indexable content.
:::

## Verify the fix

```bash
curl https://yourdomain.com/your-page | grep '<h1'
```

Confirm the response body includes actual headings and content. Then re-run `orino audit`.

## Related fixes

- [/_astro/ blocked in robots.txt](/fixes/crawlability/astro-robots-blocking-static)
- [getStaticPaths missing on dynamic Astro route](/fixes/crawlability/astro-missing-get-static-paths)
- [sitemap missing](/fixes/crawlability/astro-sitemap-missing)
