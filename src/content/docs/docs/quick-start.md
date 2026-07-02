---
title: Quick Start
description: Run your first Orino audit in under two minutes.
---

## Requirements

Node.js 18 or higher. Check with:

```bash
node --version
```

No global install needed. npx handles it.

## Run your first audit

**From inside your project directory**

```bash
cd your-project
npx @bynaree/orino audit
```

Orino detects your framework automatically and runs a full analysis. If a live URL is found in your project config, codebase checks and URL checks run together. This is the most complete mode.

**Point at a specific directory**

```bash
npx @bynaree/orino audit --dir /path/to/project
```

Runs the same full analysis from any working directory. Useful for monorepos or when you want to audit a project without changing your shell's current location.

**URL only, no codebase**

```bash
npx @bynaree/orino audit --url https://yoursite.com
```

Runs in URL-only mode when no local project directory is present. Checks cover PageSpeed Insights, rendered metadata, crawlability, and GEO signals. No local files required.

## What happens next

After you run the command, Orino works through a short series of prompts before and after the audit.

**URL prompt:** If no URL is detected from your project config and `--url` was not passed, Orino asks for one. Enter a URL to enable live checks, or press Enter to run in codebase-only mode.

**PSI key prompt:** If `ORINO_PSI_KEY` is not set and `--psi-key` was not passed, Orino asks for your Google PageSpeed Insights API key. Press Enter to skip. The audit still runs but performance checks are omitted.

**Audit runs:** Orino prints your detected framework, URL, and analysis mode, then works through a data collection list. A status indicator appears next to each step as it resolves. Results follow once collection finishes.

**Report export prompt:** After the audit, Orino asks whether to export a report. If you select a format (PDF, Markdown, or plain text), it then asks for an output directory. Pass `--report-pdf`, `--report-md`, or `--report-txt` as flags to bypass this prompt entirely.

**Browser open prompt:** If your score is below 90, Orino asks whether to open your site in the browser. Only appears in interactive terminal sessions.

:::note
All interactive prompts are disabled when `CI` is set, when `--json` is passed, or when `--quiet` is passed. Supply `--url` and `--psi-key` as flags to provide values non-interactively.
:::

## Reading the output

Results are split into four sections.

**Critical issues** are flagged in red. Each one deducts 10 points from your score. A single failed critical also sets the process exit code to 1, which fails CI builds. Fix these before addressing anything else.

**Warnings** are flagged in yellow. Each failed warning deducts 3 points. They reduce ranking and GEO visibility but do not block crawlers or indexing.

**Info suggestions** are flagged in cyan and do not affect the score — things like a missing title template or PageSpeed improvement opportunities reported by Lighthouse.

**Passed checks** are listed in green. Orino shows the first five and summarises the rest with a count.

Below the three sections, Orino prints your SEO Score out of 100, the band label, and a breakdown of criticals, warnings, and passed checks.

| Score | Band | What to do |
|-------|------|------------|
| 90-100 | Excellent | Monitor for regressions. |
| 75-89 | Good | Fix remaining warnings when time allows. |
| 55-74 | Needs Work | Schedule a fix sprint. Multiple issues are affecting real-world ranking. |
| 35-54 | Poor | High priority. Significant crawlability or metadata problems are likely present. |
| 0-34 | Critical | Resolve all critical issues before shipping anything else. |

## Set up your PSI key

PageSpeed Insights checks require a Google API key. Without one, Orino skips all performance checks. Keys are free. Get one from the Google Cloud Console under APIs and Services, then enable the PageSpeed Insights API.

Set it as an environment variable so you never have to pass it manually:

```bash
export ORINO_PSI_KEY=your_key_here
```

Add that line to your shell profile (`~/.zshrc` or `~/.bashrc`) to persist it across sessions.

## Generate a report

Pass a report flag to export results after the scan. Each flag accepts an optional custom path.

```bash
npx @bynaree/orino audit --url https://yoursite.com --report-pdf
npx @bynaree/orino audit --url https://yoursite.com --report-md
npx @bynaree/orino audit --url https://yoursite.com --report-txt
```

Use PDF to share with non-technical stakeholders. Use Markdown to drop the report into a repo or issue tracker. Use plain text for piping into other tools or logging in CI.
