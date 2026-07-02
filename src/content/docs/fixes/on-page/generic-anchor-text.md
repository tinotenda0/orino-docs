---
title: Generic anchor text
description: Links on the page use vague text like "click here" or "read more", giving search engines no information about the linked destination.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your page has links whose visible text is generic: "click here", "read more", "learn more", "here", "more", "continue", "this page", or "this link". Search engines read anchor text to understand what the destination page covers. Generic text passes no signal, which weakens the ranking context for every page those links point to.

AI search engines use link context when deciding how to attribute and cite content. A link labelled "read more" tells them nothing about what they would find on the other side.

## How to fix it

Replace each generic phrase with a short description of what the linked page contains. The fix is the same regardless of framework — it is about the text inside the link element, not the component used to render it.

**Before:**
```html
<a href="/features">Read more</a>
<a href="/pricing">Click here</a>
<a href="/blog/our-story">Learn more</a>
```

**After:**
```html
<a href="/features">See all features</a>
<a href="/pricing">View pricing plans</a>
<a href="/blog/our-story">How Orino started</a>
```

The test: if you read the anchor text alone, with no surrounding context, you should know where the link goes and roughly what you will find there.

:::tip
Descriptive anchor text also improves accessibility. Screen readers can navigate a page by listing all links — "Click here, click here, click here" is useless. "View pricing plans, See all features, Read case study" is not.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit --url https://yourdomain.com
```

The check scans every `<a href>` element on the homepage for these exact strings (case-insensitive): "click here", "read more", "learn more", "here", "this page", "this link", "continue", "more". Once none match, the check passes.

## Related fixes

- [H1 tag missing](/fixes/on-page/missing-h1)
- [Images missing alt text](/fixes/on-page/img-missing-alt)
- [Thin content](/fixes/on-page/thin-content)
- [Heading hierarchy broken](/fixes/on-page/heading-hierarchy-broken)
