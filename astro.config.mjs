// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.orino.app',
	base: '/',
	integrations: [
		starlight({
			title: 'Orino Docs',
			description: 'SEO and GEO audit documentation for developers',
			logo: {
				light: './src/assets/orino-logo-light.svg',
				dark: './src/assets/orino-logo-dark.svg',
				replacesTitle: true,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/tinotenda0/orino' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Overview', link: '/' },
						{ label: 'Quick Start', slug: 'docs/quick-start' },
						{ label: 'CLI Reference', slug: 'docs/cli-reference' },
						{ label: 'Configuration', slug: 'docs/configuration' },
						{ label: 'Frameworks', slug: 'docs/frameworks' },
						{ label: 'PSI Setup', slug: 'docs/psi-setup' },
						{ label: 'Scoring', slug: 'docs/scoring' },
					],
				},
				{
					label: 'Changelog',
					items: [{ autogenerate: { directory: 'changelog' } }],
				},
				{
					label: 'Fix Pages — Crawlability',
					items: [{ autogenerate: { directory: 'fixes/crawlability' } }],
				},
				{
					label: 'Fix Pages — Metadata',
					items: [{ autogenerate: { directory: 'fixes/metadata' } }],
				},
				{
					label: 'Fix Pages — Structured Data',
					items: [{ autogenerate: { directory: 'fixes/structured-data' } }],
				},
				{
					label: 'Fix Pages — Performance',
					items: [{ autogenerate: { directory: 'fixes/performance' } }],
				},
				{
					label: 'Fix Pages — On-Page',
					items: [{ autogenerate: { directory: 'fixes/on-page' } }],
				},
				{
					label: 'Fix Pages — Architecture',
					items: [{ autogenerate: { directory: 'fixes/architecture' } }],
				},
				{
					label: 'Fix Pages — GEO Readiness',
					items: [{ autogenerate: { directory: 'fixes/geo-readiness' } }],
				},
			],
		}),
	],
});
