---
title: Redirect chain
description: Resolves a multi-hop redirect chain that wastes crawl budget and dilutes link equity at each hop.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

A redirect chain is when one URL redirects to another URL that then redirects again: `A → B → C`. Each additional hop costs crawl budget, adds latency, and loses a portion of link equity. Orino flags any request path with more than one redirect hop.

Chains usually form when a page is moved twice and the intermediate redirect is never cleaned up.

## How to fix it

Identify the full chain, then update the source to point directly to the final destination.

First, trace the chain:

```bash
curl -IL --max-redirs 10 https://yourdomain.com/old-path
```

Take the final `Location:` URL and update your redirect rules to skip the middle steps.

### Vercel

In `vercel.json`, point the source directly to the final destination:

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/final-destination",
      "permanent": true
    }
  ]
}
```

Remove any intermediate redirect entry that was pointing to `/old-path`.

### Netlify

In `netlify.toml`:

```toml
[[redirects]]
  from = "/old-path"
  to = "/final-destination"
  status = 301
```

### Next.js

In `next.config.js`:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/final-destination',
        permanent: true,
      },
    ]
  },
}
```

Remove any previously-added redirect that pointed from `/old-path` to an intermediate URL.

### nginx

```nginx
location = /old-path {
  return 301 /final-destination;
}
```

:::tip
When you move a page, scan your existing redirect rules for anything pointing to the old URL and update those entries at the same time. This prevents chains from forming in the first place.
:::

## Verify the fix

Check that the path resolves in a single hop:

```bash
curl -IL --max-redirs 5 https://yourdomain.com/old-path
```

You should see one 301 response followed by a 200. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [HTTPS not enforced](/fixes/crawlability/https-not-enforced)
- [www and apex both return 200](/fixes/crawlability/www-apex-duplicate)
- [Sitemap URLs point to redirects](/fixes/crawlability/sitemap-redirects)
