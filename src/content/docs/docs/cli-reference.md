---
title: CLI Reference
description: Every flag and option available in the Orino CLI.
---

Complete reference for all flags and options in the `orino audit` command.

## Commands

### orino audit

Runs a full SEO and GEO audit against a project directory, a live URL, or both. Detects your framework automatically, collects data from codebase and live sources, runs all checks, and scores the result.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--dir <path>` | string | `.` | Project directory to audit |
| `--url <url>` | string | none | Live URL to run URL-based checks against |
| `--framework <name>` | string | none | Force framework detection instead of auto-detecting |
| `--psi-key <key>` | string | none | Google PageSpeed Insights API key |
| `--no-url` | boolean | none | Skip all live URL checks |
| `--no-codebase` | boolean | none | Skip all codebase analysis |
| `--quiet` | boolean | `false` | Print criticals and score summary only |
| `--json` | boolean | `false` | Output results as JSON to stdout |
| `--output <path>` | string | none | Write JSON output to a file (implies `--json`) |
| `--report-txt [path]` | string | `./orino-report.txt` | Export plain text report |
| `--report-md [path]` | string | `./orino-report.md` | Export Markdown report |
| `--report-pdf [path]` | string | `./orino-report.pdf` | Export PDF report |

Valid `--framework` values: `nextjs-app-router`, `nextjs-pages-router`, `astro`, `sveltekit`, `nuxt`, `html`.

:::note
For `--report-txt`, `--report-md`, and `--report-pdf`, the Default column shows the output path used when no path argument is provided. All three flags are inactive by default.
:::

## Environment variables

| Variable | Description |
|----------|-------------|
| `ORINO_PSI_KEY` | Google PageSpeed Insights API key. Equivalent to `--psi-key`. The flag takes priority when both are set. |
| `CI` | When set to any non-empty value, disables all interactive prompts. Set automatically by most CI providers. |

## Modes

**Full mode (codebase + URL)**

Requires a project directory (defaults to `.`) and a live URL passed via `--url` or detected from your project config. Runs every available check: framework-specific source analysis, live metadata, crawlability, structured data, PageSpeed Insights, and GEO readiness signals. Use this for the most thorough audit of a deployed site you have local access to.

**Codebase only (`--no-url`)**

Pass `--no-url` to skip all live URL checks. Orino analyses your source files, checking routing patterns, metadata exports, structured data definitions, internal link graph, and framework-specific conventions. PageSpeed Insights and live crawlability checks are skipped. Use this during local development before you have a deployed URL to test against.

**URL only (`--no-codebase` or no local project)**

Pass `--no-codebase` to skip all source file analysis, or run from a directory without a supported framework. Orino fetches the live URL and runs PageSpeed Insights, checks rendered metadata and Open Graph tags, validates robots.txt and sitemap, and checks GEO signals from the live page. Use this to audit sites where you do not have the source code.

:::note
Passing `--no-codebase` without `--url` will trigger the URL prompt in interactive mode or exit with an error in non-interactive mode.
:::

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | Audit completed with no critical issues |
| `1` | One or more critical issues found |
| `2` | Audit could not run — no supported framework detected and no URL provided |

Exit codes let you integrate Orino into CI/CD pipelines. A non-zero exit will fail the step, blocking a deploy when critical SEO issues are present. Exit code `2` applies in every output mode, including `--json` and `--quiet`, so a misconfigured CI job fails loudly instead of reporting an empty perfect score.

## CI/CD usage

Set `CI=true` (most providers do this automatically) and Orino disables all interactive prompts. Use `--no-codebase` with a deployed URL for post-deploy checks, or `--no-url` against your source during the build phase.

```yaml
- name: Orino SEO Audit
  run: |
    npx @bynaree/orino audit \
      --url ${{ vars.SITE_URL }} \
      --no-codebase
  env:
    ORINO_PSI_KEY: ${{ secrets.ORINO_PSI_KEY }}
```

Interactive prompts are also disabled when stdout is piped, so you do not need to set `CI` explicitly when using `--json` or `--output`.

## Help

```bash
npx @bynaree/orino audit --help
```

Prints all available options to the terminal.
