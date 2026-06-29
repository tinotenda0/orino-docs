---
title: www and apex both return 200
description: Resolves both https://domain.com and https://www.domain.com serving content independently, creating a duplicate content issue.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

When both `https://domain.com` and `https://www.domain.com` return 200 with the same content, search engines see two distinct origins serving the same pages. Link equity is split between them. Google may index both versions. A canonical tag helps, but it does not fully substitute for a proper redirect.

Choose one version as your primary domain and redirect the other to it with a 301.

## How to fix it

The fix depends on your hosting or CDN configuration.

### Vercel

In the Vercel dashboard, set your primary domain under "Domains" in your project settings. Vercel automatically issues a 301 redirect from the non-primary variant. No additional config is needed.

### Netlify

In `netlify.toml`, redirect the non-canonical variant:

```toml
# Redirect www to apex
[[redirects]]
  from = "https://www.yourdomain.com/*"
  to = "https://yourdomain.com/:splat"
  status = 301
  force = true
```

### nginx

```nginx
server {
  listen 80;
  listen 443 ssl;
  server_name www.yourdomain.com;
  return 301 https://yourdomain.com$request_uri;
}
```

### Apache

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.yourdomain\.com [NC]
RewriteRule ^(.*)$ https://yourdomain.com/$1 [R=301,L]
```

### Cloudflare

In "Rules" > "Redirect Rules", create a new rule:

- Match: hostname `www.yourdomain.com`
- Action: Dynamic redirect to `https://yourdomain.com${uri_path}`
- Status code: 301

:::tip
Apex (non-www) is generally the easier choice for modern hosting platforms that support CNAME flattening or ALIAS records at the root. If you are on an older DNS provider without those features, www may be simpler to route through a CDN correctly.
:::

## Verify the fix

Check that the non-canonical version redirects:

```bash
curl -I https://www.yourdomain.com/
```

You should see `301 Moved Permanently` with a `Location:` header pointing to your canonical domain. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [HTTPS not enforced](/fixes/crawlability/https-not-enforced)
- [Redirect chain](/fixes/crawlability/redirect-chain)
- [Canonical tag missing](/fixes/crawlability/canonical-missing)
