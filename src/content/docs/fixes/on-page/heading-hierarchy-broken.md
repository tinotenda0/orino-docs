---
title: Heading hierarchy broken
description: Heading levels on the page skip a level, breaking the document outline and weakening content structure signals.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your page's heading structure jumps a level — for example, H2 directly to H4 with no H3 between them. Google uses headings to build a model of how a page's topics relate to each other. Gaps in that sequence make sections harder to attribute to the right subtopic.

Broken heading hierarchies also fail WCAG 1.3.1. Screen reader users who navigate by headings will hit a gap in the outline and may miss content entirely.

## How to fix it

Work through your headings in order and ensure each level steps down by exactly one. The rule is: if the previous heading is H2, the next heading can be H2 or H3, but not H4.

**Broken — jumps from H2 to H4:**
```html
<h2>Our Services</h2>
<h4>Consulting</h4>
<h4>Development</h4>
```

**Fixed:**
```html
<h2>Our Services</h2>
<h3>Consulting</h3>
<h3>Development</h3>
```

The most common cause is using heading tags for their default browser styling rather than for document structure. If you are choosing an `<h4>` because it looks the right size visually, that is the wrong reason. Fix the markup and use CSS to control the appearance.

:::caution
Changing heading levels changes the visual appearance if your CSS targets element selectors like `h2 { ... }`. Check your styles before deploying.
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit --url https://yourdomain.com
```

You can also inspect the heading sequence directly in the browser console:

```js
[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => h.tagName + ': ' + h.textContent.trim())
```

Check that each level increases by at most one compared to the previous.

## Related fixes

- [H1 tag missing](/fixes/on-page/missing-h1)
- [Multiple H1 tags](/fixes/on-page/multiple-h1)
- [Thin content](/fixes/on-page/thin-content)
