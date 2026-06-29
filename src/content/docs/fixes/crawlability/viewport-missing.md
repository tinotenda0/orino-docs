---
title: Viewport meta tag missing
description: Add a viewport meta tag to every HTML page to enable correct mobile rendering.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Without a viewport meta tag, mobile browsers render the page at full desktop width and scale it down. The result is a tiny, unreadable page that users have to zoom into. Google uses mobile-first indexing — it crawls and ranks the mobile version of your site. A page with no viewport meta tag is treated as having a broken mobile experience.

## How to fix it

Add the viewport meta tag inside `<head>` on every page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page title</title>
  </head>
  <body>
    <!-- content -->
  </body>
</html>
```

The value `width=device-width, initial-scale=1` is correct for almost all cases.

:::caution
Do not set `user-scalable=no` or `maximum-scale=1`. These prevent users from zooming and cause automatic failures in WCAG 2.1 Success Criterion 1.4.4 (Resize Text). Leave zoom controls unrestricted.
:::

## Verify the fix

```bash
curl https://yourdomain.com/ | grep 'viewport'
```

Confirm the output includes `<meta name="viewport"`. Then re-run `orino audit`.

## Related fixes

- [HTML lang attribute missing](/fixes/crawlability/html-lang-missing)
- [robots.txt missing](/fixes/crawlability/html-robots-missing)
- [sitemap.xml missing](/fixes/crawlability/html-sitemap-missing)
