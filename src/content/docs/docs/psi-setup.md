---
title: PageSpeed Insights Setup
description: Get a free API key to unlock performance checks.
---

## Why Orino needs your own key

Performance checks for LCP, CLS, INP, and TTFB come from Google's PageSpeed Insights API. Without a key, requests use Google's shared anonymous quota, which is tiny and often exhausted after a single audit.

Orino does not provide a shared key. Every user authenticates with their own free key. This is standard practice for CLI tools built on Google APIs, not a limitation specific to Orino.

:::note
A free Google Cloud key gives you 25,000 PSI requests per day. That is far more than any individual or small team will use.
:::

## Get your free key

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project, or select an existing one
3. Search for **PageSpeed Insights API** in the API library
4. Click **Enable**
5. Go to **APIs & Services**, then **Credentials**
6. Click **Create Credentials**, then **API Key**
7. Copy the key

**Optional: restrict the key to PSI only**

8. Click the key, go to **API restrictions**, click **Restrict key**, select **PageSpeed Insights API**, and click **Save**

Restricting the key limits what an attacker can do if it ever leaks. An unrestricted key can be used against any Google API billed to your account.

## Use the key

**Per command**

```bash
npx @bynaree/orino audit --url https://yoursite.com --psi-key YOUR_KEY
```

**Persistent (recommended)**

```bash
export ORINO_PSI_KEY=your_key_here
```

Add that line to `~/.zshrc` or `~/.bashrc`. Once set, every audit picks it up automatically with no flag needed.

## What happens without a key

The audit still runs and completes. The four live performance checks (LCP, CLS, INP, and TTFB) are skipped rather than failed. The terminal shows `PageSpeed API unavailable — performance checks skipped` next to each one.

Codebase performance checks (hero image lazy loading, missing `fetchpriority`, raw `<img>` tags, and images without explicit dimensions) still run regardless of whether a key is present. Only the PSI-dependent metrics are affected.

Skipped checks are excluded from both sides of the score calculation. They do not penalise your score.

:::caution
If you see a 429 rate limit error without a key, this is expected. The shared anonymous quota resets on Google's schedule, not yours. Get a free key rather than retrying.
:::

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| 429 without a key | Shared anonymous quota exhausted | Get a free API key |
| 429 with a key | Daily quota for that Google Cloud project exceeded | Wait 24 hours, or create a second project |
| 403 | API not enabled on the project, or key restricted to the wrong API | Enable PageSpeed Insights API in your Cloud project credentials |
| Redirect warnings in output | PSI followed a redirect (for example, non-www to www) | Informational only, not an error |
