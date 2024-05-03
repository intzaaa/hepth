<script lang="ts">
	const { children } = $props();
	import type { BottomAppBar } from 'mdui';
	import { onMount } from 'svelte';
	let content: HTMLElement | undefined = $state();
	let bar: BottomAppBar | undefined = $state();
	onMount(() => {
		if (content !== undefined && bar !== undefined) {
			bar.scrollTarget = content;
		}
	});
</script>

<div class="content" bind:this={content}>
	<div class="sub-content">
		{@render children()}
	</div>
	<mdui-bottom-app-bar bind:this={bar}>
		<mdui-button-icon></mdui-button-icon>
	</mdui-bottom-app-bar>
</div>

<style lang="postcss">
	.content {
		@apply relative flex h-full w-full flex-col;
	}
	.sub-content {
		@apply h-full w-full;
	}
	mdui-bottom-app-bar {
		@apply absolute bottom-0 w-full;
	}
</style>
