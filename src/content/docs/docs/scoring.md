---
title: Scoring
description: How the Orino SEO score is calculated.
---

## The formula

Every active (non-skipped) check has a severity of either `critical` or `warning`. Orino assigns point values to each:

- **Critical check:** 10 points possible
- **Warning check:** 3 points possible

The total points possible is the sum across all active checks. Points are lost when checks fail. The score is the percentage of points retained, rounded to the nearest integer.

```
pointsPossible = (active criticals × 10) + (active warnings × 3)
pointsLost     = (failed criticals × 10) + (failed warnings × 3)
score          = round((1 - pointsLost / pointsPossible) × 100)
```

**Worked example**

An audit runs 14 active critical checks and 22 active warning checks. Two criticals fail and six warnings fail.

- pointsPossible = (14 × 10) + (22 × 3) = 140 + 66 = **206**
- pointsLost = (2 × 10) + (6 × 3) = 20 + 18 = **38**
- score = round((1 - 38 / 206) × 100) = round(81.6) = **82** → **Good**

:::note
Skipped checks are excluded from scoring entirely. They are removed from both `pointsPossible` and `pointsLost`. A skipped performance check (because no PSI key is set) neither helps nor hurts your score.
:::

## Score bands

| Score | Band | What to do |
|-------|------|------------|
| 90-100 | Excellent | Monitor for regressions with each deploy. |
| 75-89 | Good | Fix remaining warnings when you have capacity. |
| 55-74 | Needs Work | Schedule a fix sprint. Multiple issues are affecting real-world ranking. |
| 35-54 | Poor | High priority. Significant crawlability or metadata problems are likely present. |
| 0-34 | Critical | Stop shipping new features and resolve all critical issues first. |

## Severity weighting

Each critical check is worth 3.3 times as much as a warning check (10 points vs 3). One failed critical has the same score impact as approximately three failed warnings.

This weighting reflects what each type of issue actually does. Critical failures are things that are actively broken: crawlers blocked from the site, pages that cannot be indexed, structured data that cannot be parsed. Warnings are missed opportunities: schema types not implemented, thin content, generic anchor text. Both matter, but broken is worse than missing.

## What counts as critical vs warning

**Critical issues** are checks where failure means something is actively preventing indexation, blocking ranking signals, or hiding content from crawlers and AI search engines.

Examples from the check library:

- GPTBot, OAI-SearchBot, or PerplexityBot blocked in `robots.txt`
- Invalid JSON-LD syntax (structured data is silently ignored by search engines when malformed)
- CSR-only page component at the top level (`'use client'` in Next.js App Router, `ssr: false` in Nuxt or SvelteKit, `client:only` without static content in Astro)
- Missing H1 tag

**Warning issues** are checks where failure means a ranking or citation signal is absent or suboptimal, but nothing is actively broken.

Examples from the check library:

- Missing FAQPage schema on informational pages
- Thin content (below 300 words of visible text on the page)
- Generic anchor text such as "click here" or "read more"
- Images without explicit width and height attributes

## Score is not the whole picture

The Orino score measures technical SEO health, not search ranking. Two sites with identical scores can have very different rankings in practice, depending on content quality, backlinks, topical authority, and competition — none of which Orino measures.

Use the score to track technical health over time and to prioritise fix work. It is a reliable signal for what is broken or missing. It is not a predictor of where you will rank.
