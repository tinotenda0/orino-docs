---
title: CSR-only page component (App Router)
description: Resolve pages that disable server-side rendering by placing 'use client' at the page component level.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

`page.tsx` has `'use client'` at the top level. That directive tells Next.js to render the entire route in the browser only. Googlebot and AI crawlers receive an empty HTML shell with no content to index.

## How to fix it

Move all client-only logic into a separate child component. Keep `page.tsx` as a Server Component.

```tsx
// app/blog/[slug]/Counter.tsx
'use client'
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

```tsx
// app/blog/[slug]/page.tsx  — no 'use client' here
import { Counter } from './Counter'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <Counter />
    </main>
  )
}
```

`'use client'` belongs on interactive leaf components, never on route files.

## Verify the fix

```bash
curl https://yourdomain.com/your-page
```

Confirm the response body includes actual heading and paragraph text. Then re-run `orino audit` to clear the flag.

## Related fixes

- [generateMetadata missing on dynamic route](/fixes/crawlability/nextjs-missing-generate-metadata)
- [generateStaticParams missing on dynamic route](/fixes/crawlability/nextjs-missing-generate-static-params)
- [robots.ts or robots.txt missing](/fixes/crawlability/nextjs-robots-missing)
- [sitemap.ts or sitemap.xml missing](/fixes/crawlability/nextjs-sitemap-missing)
