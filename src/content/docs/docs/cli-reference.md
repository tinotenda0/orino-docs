---
title: CLI Reference
description: Every flag and option available in the Orino CLI.
---

Complete reference for the `orino audit`, `orino baseline`, and `orino init` commands.

## Commands

### orino audit

Runs a full SEO and GEO audit against a project directory, a live URL, or both. Detects your framework automatically, collects data from codebase and live sources, runs all checks, and scores the result.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--dir <path>` | string | `.` | Project directory to audit |
| `--url <url>` | string | none | Live URL to run URL-based checks against |
| `--framework <name>` | string | none | Force framework detection instead of auto-detecting |
| `--psi-key <key>` | string | none | Google PageSpeed Insights API key |
| `--pages <number>` | number | `0` | Pages to audit beyond the homepage, sampled from the sitemap |
| `--fail-on <level>` | string | `critical` | Severity at or above which the run exits `1`: `critical`, `warning`, or `any` |
| `--baseline <path>` | string | none | Baseline file — only findings not in the baseline trigger `--fail-on` |
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

Every audit flag can also be set in a [config file](/docs/configuration). Flags always take priority over the config file, which takes priority over defaults.

### orino baseline

Runs the same audit pipeline and writes the current findings to a baseline file, so a later audit can fail only on regressions. Always exits `0` on success — a baseline records the status quo, it does not judge it.

```bash
npx orino-cli baseline --output ./orino-baseline.json
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--dir <path>` | string | `.` | Project directory to audit |
| `--url <url>` | string | none | Live URL to run URL-based checks against |
| `--framework <name>` | string | none | Force framework detection |
| `--psi-key <key>` | string | none | Google PageSpeed Insights API key |
| `--pages <number>` | number | `0` | Pages to audit beyond the homepage |
| `--no-url` | boolean | none | Skip all live URL checks |
| `--no-codebase` | boolean | none | Skip all codebase analysis |
| `--output <path>` | string | `./orino-baseline.json` | Baseline file to write |

The baseline file records the check IDs of every current finding:

```json
{
  "version": "0.3.0",
  "generatedAt": "2026-07-03T10:00:00Z",
  "url": "https://example.com",
  "findings": ["canonical-missing", "thin-content"]
}
```

See [Baselines](#baselines) for how the comparison works.

### orino init

Writes a fully commented `orino.config.json` template to the current directory, with every option documented inline. Refuses to overwrite an existing config (exits `1`).

```bash
npx orino-cli init
```

See the [Configuration reference](/docs/configuration) for the full schema.

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

## Multi-page auditing

By default Orino audits the homepage only. Pass `--pages <number>` to sample additional pages from your sitemap and run the full URL check suite on each — metadata, on-page, structured data, canonical, and internal-link checks.

```bash
npx orino-cli audit --url https://example.com --pages 25
```

- **Selection.** Pages linked from the homepage come first, then the remaining sitemap URLs in order. Non-HTML entries (`.xml`, `.pdf`, images) are excluded, and the homepage is always included regardless of the value.
- **Cross-page checks.** Duplicate titles and duplicate descriptions become real checks once more than one page is fetched. With a single page they skip rather than guess.
- **Politeness.** Pages are fetched in parallel in batches of five, with a two-second pause between batches and a sixty-second overall cap. Pages returning a non-200 status are logged as an info finding and skipped.
- **Scoring and output.** The score is calculated across every page combined. In `--quiet` mode a per-page summary table is printed, and every finding records which page it came from. The `pagesAudited` field in `--json` output reports the total.

Site-level checks — robots.txt, sitemap validity, PageSpeed Insights, codebase analysis, and GEO readiness — always run once, not per page.

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | Audit passed the threshold — no issues at or above the `--fail-on` level |
| `1` | Audit failed the threshold — issues found at or above the `--fail-on` level |
| `2` | Configuration error — invalid flags, a missing baseline file, a malformed config file, or no supported framework and no URL |

The `--fail-on <level>` flag controls what counts as a failure: `critical` (the default), `warning` (critical **or** warning), or `any`. Because the default is `critical`, the default behaviour matches previous releases — a run with critical issues exits `1`.

Exit codes apply in every output mode, including `--json` and `--quiet`, so a misconfigured CI job fails loudly with code `2` instead of reporting an empty perfect score.

## Baselines

A baseline lets CI fail only on *new* issues rather than pre-existing ones — useful when adopting Orino on a site that already has findings you cannot fix immediately.

1. Record the current state once and commit it:

   ```bash
   npx orino-cli baseline --output ./orino-baseline.json
   ```

2. Pass it to future audits:

   ```bash
   npx orino-cli audit --url https://example.com --fail-on critical --baseline ./orino-baseline.json
   ```

A finding is treated as **new** when its check ID does not appear in the baseline's `findings` array. Location is not compared — if the check ID was already known, it is not counted as a regression. Only new findings at or above the `--fail-on` level trigger exit code `1`. The `--json` output reports the new findings in `newFindings` and sets `baselineCompared` to `true`.

## CI/CD usage

Set `CI=true` (most providers do this automatically) and Orino disables all interactive prompts. Use `--no-codebase` with a deployed URL for post-deploy checks, or `--no-url` against your source during the build phase.

```yaml
- name: Orino SEO Audit
  run: |
    npx --yes orino-cli audit \
      --url ${{ vars.SITE_URL }} \
      --fail-on critical \
      --json \
      --output orino-results.json
  env:
    ORINO_PSI_KEY: ${{ secrets.ORINO_PSI_KEY }}
```

:::caution
Always pass `--yes` to `npx` in CI. GitHub Actions runners do not auto-confirm a first-time package install, so a bare `npx orino-cli` fails with `orino: not found` (exit 127). `npx --yes` installs non-interactively.
:::

A complete GitHub Actions workflow ships with the CLI at `.github/workflows/orino.yml`. It runs the audit, comments the score on pull requests, and fails the check when criticals are found. Copy it into your own repository to get PR score comments out of the box.

Two things that workflow needs in the target repository:

- A **`SITE_URL` repository variable** (Settings → Secrets and variables → Actions → Variables) pointing at the site to audit. The job is guarded with `if: vars.SITE_URL != ''`, so it skips cleanly until you set it rather than running against an empty URL.
- The **`pull-requests: write` permission**, declared at the top of the workflow, so the score comment can be posted. The default `GITHUB_TOKEN` is read-only.

Optionally add an `ORINO_PSI_KEY` secret to enable PageSpeed checks.

Interactive prompts are also disabled when stdout is piped, so you do not need to set `CI` explicitly when using `--json` or `--output`.

### JSON output fields

When `--json` is set, the output includes CI-oriented fields alongside the score and results:

| Field | Type | Description |
|-------|------|-------------|
| `exitCode` | number | The exit code the process will use (`0`, `1`, or `2`) |
| `pagesAudited` | number | Total pages audited — homepage plus any sampled with `--pages` |
| `baselineCompared` | boolean | Whether a baseline was supplied and compared |
| `newFindings` | string[] | Check IDs of findings not present in the baseline (empty when no baseline) |

## Help

```bash
npx orino-cli audit --help
```

Prints all available options to the terminal.
