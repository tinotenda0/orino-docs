---
title: Client component used as page (App Router)
description: Resolve pages that place 'use client' at the page component level, losing metadata exports and server-fetched content.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

`page.tsx` has `'use client'` at the top level. Client components are still server-rendered on the initial request, but using one as a route file costs you two things that matter for SEO:

1. **No metadata.** Client components cannot export `metadata` or `generateMetadata` — Next.js throws if they try. The page falls back to whatever the nearest layout provides, so every route under it shares the same generic title and description.
2. **Content fetched in effects is invisible.** Any data loaded with `useEffect`/`useSWR`/client-side fetching is not in the initial HTML. Crawlers and AI systems that read the raw response never see it.

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
