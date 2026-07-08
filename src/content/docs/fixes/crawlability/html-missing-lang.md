---
title: HTML lang attribute missing
description: Add a lang attribute to the html element on every page.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

The `<html>` element has no `lang` attribute. Search engines use it to determine the page language and serve the page to the right audience in the right region. Screen readers use it to apply correct pronunciation rules. Without it, your pages may appear in unintended language search results and fail accessibility audits.

## How to fix it

Add `lang` to the opening `<html>` tag on every page.

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

Use the appropriate BCP 47 language tag for the content on each specific page.

| Language | Tag |
|---|---|
| English | `en` |
| British English | `en-GB` |
| French | `fr` |
| Spanish | `es` |
| German | `de` |
| Portuguese (Brazil) | `pt-BR` |

For multi-language sites, the `lang` attribute on each page should reflect that page's language, not the site's default.

## Verify the fix

```bash
curl https://yourdomain.com/ | grep '<html'
```

Confirm the output includes `lang=`. Then re-run `orino audit`.

## Related fixes

- [Viewport meta tag missing](/fixes/crawlability/viewport-missing)
- [robots.txt missing](/fixes/crawlability/html-robots-missing)
- [sitemap.xml missing](/fixes/crawlability/html-sitemap-missing)
