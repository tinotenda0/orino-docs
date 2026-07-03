---
title: Configuration
description: Persist settings and suppress false positives with an orino.config.json file.
---

A config file lets you persist audit settings and silence false positives without passing flags on every run. It is optional — Orino works with zero configuration — but it is the right home for a project's URL, ignore rules, and CI thresholds.

## Creating a config file

Run `orino init` to write a fully commented template to the current directory:

```bash
npx orino-cli init
```

Every option is documented inline, commented out. Uncomment the ones you need. `orino init` refuses to overwrite an existing `orino.config.json`.

## Where Orino looks

Orino checks these locations in order and uses the first one it finds:

1. `orino.config.json` in the current directory
2. `.orino/config.json`
3. An `"orino"` key inside `package.json`

The dedicated `orino.config.json` and `.orino/config.json` files may contain `//` and `/* */` comments — the template `orino init` writes relies on this. The `package.json` variant must be strict JSON, since it shares a file with your package manifest.

## Priority order

Settings resolve from highest priority to lowest:

**CLI flag → environment variable → config file → built-in default**

A flag always overrides the config file, and the config file always overrides the defaults. For example, with `"pages": 10` in the config, `--pages 0` on the command line still wins and audits the homepage only.

## Schema

All fields are optional.

```json
{
  "url": "https://example.com",
  "psiKey": "YOUR_KEY",
  "psiStrategy": "mobile",
  "pages": 25,
  "framework": "nextjs-app-router",
  "ignore": [
    "thin-content",
    "schema-organization-missing",
    "app/studio/**"
  ],
  "severity": {
    "thin-content": "info",
    "lcp-too-slow": "critical"
  },
  "thresholds": {
    "lcp": 3000,
    "cls": 0.15,
    "inp": 300,
    "ttfb": 800
  },
  "failOn": "critical",
  "baseline": "./orino-baseline.json"
}
```

| Field | Type | Equivalent flag | Description |
|-------|------|-----------------|-------------|
| `url` | string | `--url` | Live URL to audit |
| `psiKey` | string | `--psi-key` | Google PageSpeed Insights API key |
| `psiStrategy` | string | none | PageSpeed strategy: `mobile` (default) or `desktop` |
| `pages` | number | `--pages` | Pages to audit beyond the homepage |
| `framework` | string | `--framework` | Force framework detection |
| `ignore` | string[] | none | Suppress checks by ID or location glob |
| `severity` | object | none | Override the severity of individual checks |
| `thresholds` | object | none | Override Core Web Vitals warning thresholds |
| `failOn` | string | `--fail-on` | Severity level that fails the run |
| `baseline` | string | `--baseline` | Path to a baseline file |

## Ignore rules

The `ignore` array suppresses checks. Each entry is matched two ways:

- **By check ID.** An exact ID such as `"thin-content"` suppresses that check everywhere. The ID is the same slug shown in the fix link at the end of each finding.
- **By location glob.** A pattern such as `"app/studio/**"` suppresses any finding whose location matches. Globs support `*` (one path segment), `**` (any number of segments), and `?` (a single character).

```json
{
  "ignore": [
    "thin-content",
    "app/studio/**",
    "app/(marketing)/legal/*"
  ]
}
```

A suppressed check reports as **skipped**, exactly like any other skipped check — it is excluded from both sides of the score calculation, so it neither helps nor hurts your number.

:::caution
Ignore rules hide real findings. Reach for them when a check is a confirmed false positive for your project — a deliberately noindexed staging route, a Sanity Studio mount at `/studio` — not to inflate the score. Every suppressed check is one you have taken responsibility for.
:::

## Severity overrides

The `severity` object promotes or demotes individual checks between `critical`, `warning`, and `info`.

```json
{
  "severity": {
    "thin-content": "info",
    "lcp-too-slow": "critical"
  }
}
```

- Promote a warning to **critical** when it matters more for your project than the default weighting.
- Demote a critical to **warning** when it is real but not release-blocking.
- Demote anything to **info** to keep it visible in the output without affecting the score. Info findings never move the number — the honest alternative to suppressing a check entirely.

See [Scoring](/docs/scoring) for how critical and warning checks are weighted.

## Thresholds

The `thresholds` object overrides the Core Web Vitals warning thresholds used by the performance checks. Values are `lcp`/`inp`/`ttfb` in milliseconds and `cls` as a decimal.

```json
{
  "thresholds": {
    "lcp": 3000,
    "cls": 0.15,
    "inp": 300,
    "ttfb": 800
  }
}
```

Overrides raise or lower the **warning** boundary. The stricter **critical** boundary for each metric is kept at its built-in level and is never lowered below your warning threshold, so a threshold change can never leave a metric with a warning tier above its critical tier.

## Errors

A malformed `orino.config.json` or `.orino/config.json` — a JSON syntax error, or a field with the wrong type — stops the run immediately with a clear message and exit code `1`. Orino never silently ignores a config file it could not parse. A malformed `package.json`, by contrast, is treated as "no config" rather than a fatal error, since it is not primarily an Orino file.
