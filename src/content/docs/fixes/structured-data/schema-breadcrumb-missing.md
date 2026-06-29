---
title: BreadcrumbList missing on deep pages
description: Adds BreadcrumbList structured data to pages more than one level deep so Google replaces raw URLs with readable breadcrumbs in search results.
sidebar:
  badge:
    text: Info
    variant: note
---

## What this means

Pages with a URL depth greater than one path segment (for example `/blog/my-post` or `/docs/getting-started/installation`) have no BreadcrumbList schema. When BreadcrumbList is present, Google shows readable breadcrumb labels beneath the page title in search results instead of the raw URL. This typically improves click-through rates on deep pages.

## How to fix it

Add a BreadcrumbList block to each page with depth greater than one. Each entry in `itemListElement` represents one level of the breadcrumb trail, starting from the homepage.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yoursite.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://yoursite.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Your Post Title",
      "item": "https://yoursite.com/blog/your-post-slug"
    }
  ]
}
```

:::note
The final item in the list does not require an `item` URL property, but including it is recommended for consistency and cross-tool compatibility.
:::

### Next.js App Router

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yoursite.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://yoursite.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://yoursite.com/blog/${params.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <article>
        <h1>{post.title}</h1>
      </article>
    </>
  )
}
```

The injection pattern is the same for all frameworks. Refer to [Article schema missing on blog posts](./schema-article-missing) for Astro, SvelteKit, Nuxt, and Pages Router examples.

## Verify the fix

Paste the deep page URL into [Google's Rich Results Test](https://search.google.com/test/rich-results) and confirm Breadcrumb is listed as a detected type. You can also re-run `orino audit` and check that `schema-breadcrumb-missing` passes.

## Related fixes

- [Article schema missing on blog posts](./schema-article-missing)
- [Organization schema missing](./schema-organization-missing)
- [Duplicate schema blocks found](./schema-duplicate-type)
