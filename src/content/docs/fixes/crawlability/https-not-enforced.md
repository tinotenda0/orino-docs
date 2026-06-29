---
title: HTTPS not enforced
description: Resolves HTTP serving content without redirecting to HTTPS, or using a 302 instead of a permanent 301.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Every public site should redirect HTTP traffic to HTTPS with a 301. If HTTP serves content directly, users and crawlers can reach an unencrypted version of your site. If a redirect exists but uses 302 (temporary), crawlers do not treat it as permanent and do not transfer link signals to the HTTPS version. HTTPS is a confirmed Google ranking factor.

This check flags both cases: no HTTPS redirect at all, and a redirect that uses the wrong status code.

## How to fix it

The fix depends on your hosting platform.

### Vercel

Vercel enforces HTTPS automatically for all deployments. If HTTP is not redirecting, check that your custom domain is correctly configured in the Vercel dashboard under "Domains". Vercel issues a permanent redirect from HTTP to HTTPS by default.

### Netlify

Add a redirect rule in `netlify.toml`:

```toml
[[redirects]]
  from = "http://yourdomain.com/*"
  to = "https://yourdomain.com/:splat"
  status = 301
  force = true
```

### nginx

```nginx
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;
  return 301 https://$host$request_uri;
}
```

### Apache

In your `.htaccess` or virtual host config:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

### Cloudflare

In the Cloudflare dashboard, go to "SSL/TLS" > "Edge Certificates" and enable "Always Use HTTPS". Cloudflare issues a 301 from HTTP to HTTPS on all requests.

:::caution
If you currently have a 302 redirect in place, change it to a 301. A 302 tells Google the redirect is temporary and it will keep treating the HTTP URL as the primary version.
:::

## Verify the fix

Check the HTTP response:

```bash
curl -I http://yourdomain.com/
```

You should see `301 Moved Permanently` with a `Location: https://yourdomain.com/` header. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [www and apex both return 200](/fixes/crawlability/www-apex-duplicate)
- [Redirect chain](/fixes/crawlability/redirect-chain)
- [Canonical tag missing](/fixes/crawlability/canonical-missing)
