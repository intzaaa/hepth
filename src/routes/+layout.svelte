<script lang="ts">
	const { children } = $props();
	import { page } from '$app/stores';
	import '../app.pcss';
	import 'mdui/mdui.css';
	import '@fontsource-variable/material-symbols-outlined';
	import '@fontsource/material-icons';
	import '@fontsource-variable/roboto-flex/full.css';
	import '@fontsource-variable/noto-sans-sc';
	import { detect } from 'detect-browser';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';
	onMount(() => {
		{
			const browser = detect(navigator.userAgent);
			if (browser !== null) {
				const name = browser.name;
				const version = parseFloat(browser.version!.split('.').slice(0, 2).join('.'));
				switch (name) {
					case 'chrome':
						if (version < 86) goto('not-support');
						break;
					case 'firefox':
						if (version < 111) goto('not-support');
						break;
					case 'safari':
						if (version < 15.2) goto('not-support');
						break;
					case 'opera':
						if (version < 72) goto('not-support');
						break;
					case 'samsung':
						if (version < 14.0) goto('not-support');
						break;
					default:
						break;
				}
			}
		}

		import('mdui');
	});
</script>

<mdui-navigation-rail value={$page.url.pathname.split('/')[1]} divider>
	<mdui-navigation-rail-item icon="start" href="/" value="">Start</mdui-navigation-rail-item>
	<mdui-navigation-rail-item icon="image" href="/view" value="view">
		View
	</mdui-navigation-rail-item>
	{#if dev}
		<mdui-navigation-rail-item icon="developer_mode" href="/dev" value="dev"
			>Dev</mdui-navigation-rail-item
		>
	{/if}
</mdui-navigation-rail>

<div class="content">
	{@render children()}
</div>

<style lang="postcss">
	:global(body) {
		height: 100vh; /* For browsers that don't support CSS variables */
		height: calc(var(--1dvh, 1vh) * 100); /* This is the "polyfill" */
		height: 100dvh; /* This is for future browsers that support svh, dvh and lvh viewport units */

		font-family: 'Roboto Flex Variable', 'Noto Sans SC Variable',
			'Material Symbols Outlined Variable', 'Material Icons', sans-serif;
		@apply m-0 w-full p-0;
	}
	.content {
		@apply h-full w-full;
	}
</style>
