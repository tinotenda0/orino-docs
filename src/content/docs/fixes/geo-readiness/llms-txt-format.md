---
title: llms.txt is malformed
description: Make your llms.txt follow the llms.txt format so AI systems can parse it.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your site serves an `llms.txt`, but it doesn't follow the [llms.txt format](https://llmstxt.org). Orino checks two things:

- **An H1 first.** The first non-empty line must be a Markdown heading naming the site, such as `# Acme`.
- **Markdown links.** The file should list your key pages as `[Title](https://…)` links. A file of plain prose gives AI systems nothing to follow.

## How to fix it

Restructure the file as Markdown:

```txt
# Acme

> Acme makes open-source widgets for frontend teams.

## Docs
- [Getting Started](https://acme.com/docs/start): Install and configure Acme
- [API Reference](https://acme.com/docs/api): Every endpoint and option

## Optional
- [Changelog](https://acme.com/changelog): Release history
```

The blockquote summary and the `## Optional` section are recommended but not required. Use absolute URLs so the links still work when the file is read on its own.

## Verify the fix

```sh
curl -s https://yourdomain.com/llms.txt | head -5
```

The first line should be your `# Site name` heading. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [llms-txt-missing](./llms-txt-missing)
- [faqpage-missing-geo-impact](./faqpage-missing-geo-impact)
