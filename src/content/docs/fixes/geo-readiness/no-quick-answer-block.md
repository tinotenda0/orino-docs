---
title: Page opens with generic content
description: Rewrite your homepage opening so AI systems can extract a direct, useful statement.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your homepage opens with generic marketing text — phrases like "welcome to", "we are", "our company", "founded in", or "we're proud to". AI Overviews and Perplexity cite from the first 30% of page content 55% of the time. Generic opening text produces no citation value because it says nothing specific enough to quote.

Orino checks the first 300 characters of your homepage's visible body text, after removing navigation, headers, footers, and scripts.

## How to fix it

Rewrite the opening content of your homepage to lead with a specific, direct statement. The first sentence should tell a first-time visitor — or an AI summarising your page — exactly what you do and for whom.

:::danger
Do not open with:

> "Welcome to Acme Corp. We are a team of passionate professionals dedicated to delivering innovative solutions for businesses of all sizes."

This will not be cited. It communicates nothing.
:::

:::tip
Open with something like:

> "Acme builds invoice automation software for UK accountancy firms. It connects to Xero, FreeAgent, and QuickBooks and handles VAT returns without manual data entry."

Specific product. Specific audience. Specific outcome. That is citable.
:::

There is no framework-specific code change required. This is a content edit. Find the component or template that renders the opening section of your homepage and update the copy.

The content Orino checks is what appears at the top of your `<body>` after `<nav>`, `<header>`, and `<footer>` elements are stripped out. Your first prominent `<h1>` or `<p>` sets the tone.

## Verify the fix

Deploy the change, then re-run the audit:

```sh
orino audit --url https://yourdomain.com
```

The `no-quick-answer-block` check should show as pass. You can also view the opening content Orino sees by fetching your homepage and inspecting the first visible paragraph:

```sh
curl -s https://yourdomain.com/ | grep -o '<p[^>]*>[^<]\{30,\}</p>' | head -3
```

That output is roughly what AI crawlers extract from the top of your page.

## Related fixes

- [csr-only-rendering](./csr-only-rendering)
- [faqpage-missing-geo-impact](./faqpage-missing-geo-impact)
- [llms-txt-missing](./llms-txt-missing)
