---
title: Generic image filenames
description: Images in the project have auto-generated filenames that tell search engines nothing about what is in them.
sidebar:
  badge:
    text: Info
    variant: note
---

## What this means

One or more images have filenames like `IMG_4027.jpg`, `screenshot001.png`, `photo3.webp`, or `DSC_0045.jpg`. Google indexes image filenames as one signal it uses to understand image content. A filename like `london-office-team.jpg` carries more meaning than `IMG_4027.jpg`, both for Google Image search and for understanding the surrounding page.

This check runs at the codebase level — it scans your project files, not the live site — so it can catch assets before they reach production.

## How to fix it

Rename each flagged image to describe what it actually shows. Use hyphens as word separators and keep it all lowercase.

| Generic | Descriptive |
|---|---|
| `IMG_4027.jpg` | `london-office-team.jpg` |
| `screenshot001.png` | `dashboard-analytics-overview.png` |
| `photo3.webp` | `ceo-speaking-at-conference.webp` |
| `DSC_0045.jpg` | `product-close-up-ceramic-mug.jpg` |
| `untitled.png` | `pricing-table-comparison.png` |

After renaming, update every reference to the old filename in your codebase. A project-wide search for the old name is the safest way to find all of them — `import` statements, `src` attributes, CSS `url()` calls, and manifest files all count.

:::tip
Keep filenames to 4-6 words. Longer names do not help and risk looking like keyword stuffing.
:::

:::note
The flagged patterns are: `IMG_*`, `image*`, `photo*`, `DSC_*`, `screenshot*`, `untitled*`, and `copy*`. A filename like `company-logo.png` will not be flagged even though it contains the word "image" — the check matches from the start of the filename only.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit
```

The check scans all image files in the project directory for generic filename patterns. Once the flagged files are renamed, they drop out of the report.

## Related fixes

- [Images missing alt text](/fixes/on-page/img-missing-alt)
- [URL contains underscores or uppercase](/fixes/on-page/url-underscores)
- [Thin content](/fixes/on-page/thin-content)
